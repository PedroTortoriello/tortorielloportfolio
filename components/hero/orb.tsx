"use client";

import { useEffect, useRef, useState } from "react";
import { HERO, START, opening, orbStatus } from "@/lib/intro";

// The hero orb: one fragment shader on a full-screen triangle, no 3D library.
// A ray hits a unit sphere; the front surface carries a soap film (a
// domain-warped noise field) coloured by a thin-film palette that stays
// between cyan, blue, violet and magenta; the back surface is seen through a
// refraction; a blue Fresnel rim, studio reflections and a halo frame it.
// Lighting and rotation follow the cursor; the film drains slowly over time.
//
// The same canvas also plays the opening (components/hero/opening.tsx): a
// seed of light, a particle swarm drawn as GL points in this context, the
// sphere's light coming up rim first, an energy wave. lib/intro.ts carries
// those values; at rest they equal the hero, so there is one object, never two.
//
// After the stage the same canvas narrates the page: it moves into a small
// fixed box in the bottom-right corner, level with the dock (stage.tsx), so the
// shader runs on a few thousand pixels, and it takes on each act's look: violet
// over Skills, calm in Experience, lime at the finale. Over the light work wall
// it waits out of sight; back at the top it is the hero's orb again.
const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

const FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uFocal;
uniform float uReveal; // opening: the sphere's own light (1 = hero)
uniform float uPoint;  // opening: the seed of light
uniform float uWave;   // opening and narrator: energy wave 0..1, below 0 = none
uniform float uScale;  // opening: apparent size (1 = hero)
uniform vec4 uTint;    // narrator: the act's colour premultiplied by its amount (a); 0 = the orb's own palette
uniform float uEnergy; // narrator: the film's light (1 = hero)
uniform float uEdge;   // narrator: 1 in the small box, whose halo must fade out before its edge

vec3 h33(vec3 p){p=fract(p*vec3(.1031,.1030,.0973));p+=dot(p,p.yxz+33.33);return -1.+2.*fract((p.xxy+p.yxx)*p.zyx);}
float h12(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float gn(vec3 p){
  vec3 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(mix(dot(h33(i),f),dot(h33(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
                 mix(dot(h33(i+vec3(0,1,0)),f-vec3(0,1,0)),dot(h33(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
             mix(mix(dot(h33(i+vec3(0,0,1)),f-vec3(0,0,1)),dot(h33(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
                 mix(dot(h33(i+vec3(0,1,1)),f-vec3(0,1,1)),dot(h33(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);
}
float fbm3(vec3 p){float s=0.,a=.5;for(int i=0;i<3;i++){s+=a*gn(p);p=p*2.03+vec3(1.7,9.2,3.1);a*=.5;}return s;}

// Film thickness: soap drains downward, so the bands follow a tilted latitude,
// bent by a slow warp. The sine of the thickness gives a few thin ribbons.
const vec3 UP=vec3(.5463,.7947,.2649);
const vec3 SIDE=vec3(.8,-.55,.24);
float thick(vec3 q,float t){
  vec3 w=q+.95*vec3(fbm3(q*.75+vec3(0.,0.,t*.06)),fbm3(q*.75+vec3(5.2,1.3,-t*.05)),fbm3(q*.75+vec3(2.1,7.7,t*.045)));
  return dot(w,UP)*1.1+.3*fbm3(w*1.5+vec3(0.,t*.05,0.));
}
float thickBack(vec3 q,float t){return dot(q,UP)*1.1+.6*fbm3(q*.75+vec3(0.,0.,t*.05));}
// Cyan <-> magenta through lavender and blue; never green or yellow.
vec3 pal(float x){return vec3(.5,.5,.84)+vec3(.5,.5,.2)*cos(6.28318*(vec3(x)+vec3(0.,.5,.25)));}
// A dark studio for the glass to reflect: a soft top light, a key softbox, a thin strip from the right.
vec3 envRef(vec3 r){
  vec3 c=vec3(.01,.012,.03)+vec3(.09,.11,.24)*smoothstep(.1,.95,r.y);
  c+=vec3(.85,.9,1.)*smoothstep(.94,.99,dot(r,normalize(vec3(-.5,.7,.5))));
  c+=vec3(.45,.55,1.)*smoothstep(.975,.996,dot(r,normalize(vec3(.95,.12,.3))));
  return c;
}

mat3 rotY(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}
mat3 rotX(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}

void main(){
  vec2 uv0=(gl_FragCoord.xy-.5*uRes)/uRes.y;
  vec2 uv=uv0;
  // the energy wave bends the image as it passes: a ripple running outward from the centre
  float wv=uWave<0.?0.:sin(clamp(uWave,0.,1.)*3.14159);
  if(wv>0.){float l=length(uv)+1e-4;uv+=uv/l*sin(l*48.-uWave*30.)*.0045*wv*smoothstep(.62,0.,l);}
  uv/=uScale;
  float t=uTime;
  vec3 ro=vec3(uMouse.x*.06,uMouse.y*.05,3.2);
  vec3 rd=normalize(vec3(uv-ro.xy*.12,-uFocal));
  mat3 R=rotY(t*.06+uMouse.x*.5+uScroll*1.6)*rotX(.35+uMouse.y*.32+sin(t*.05)*.15);
  vec3 L=normalize(vec3(.55+uMouse.x*.35,.6+uMouse.y*.3,.55));
  // the opening brings the light up in order: halo and rim first, then the film
  float rHalo=smoothstep(.05,.75,uReveal),rRim=smoothstep(0.,.55,uReveal),rFilm=smoothstep(.35,1.,uReveal);

  float b=dot(ro,rd);
  float c=dot(ro,ro)-1.;
  float h=b*b-c;
  float m=sqrt(max(dot(ro,ro)-b*b,0.))-1.;
  vec3 col=vec3(0.);

  if(h<0.){
    // the halo just outside the silhouette, and a faint wide bloom (not in the small box, where it reads as fog)
    col+=(vec3(.16,.2,.9)*exp(-m*10.)*.6+vec3(.3,.18,.8)*exp(-m*2.4)*.07*(1.-uEdge))*rHalo;
  }else{
    float sq=sqrt(h);
    vec3 p0=ro+rd*(-b-sq);
    vec3 n0=p0;
    float cv=clamp(dot(n0,-rd),0.,1.);
    float F=pow(1.-cv,3.);

    // front film: a few thin ribbons over a faint wash, lit from the upper right
    vec3 q0=R*n0;
    float th0=thick(q0,t);
    float rib=pow(.5+.5*sin(th0*5.5+t*.15),11.);
    float lit=.04+.96*smoothstep(0.,1.,dot(n0,L));
    vec3 c0=pal(th0*.45+dot(q0,SIDE)*.55+t*.02);
    col+=c0*(rib*1.9+.04)*lit*(.2+1.6*F)*rFilm*(.55+.45*uEnergy);

    // back film, seen through the glass: the ray bends on the way in, so the
    // far ribbons lens and slide against the near ones
    vec3 rdIn=refract(rd,n0,.75);
    vec3 n1=p0+rdIn*(-2.*dot(p0,rdIn));
    vec3 q1=R*n1;
    float th1=thickBack(q1,t);
    float rib1=pow(.5+.5*sin(th1*5.5+t*.15+1.7),16.);
    col+=pal(th1*.45+dot(q1,SIDE)*.55+.35)*(rib1*.75+.02)*(.1+.9*smoothstep(-.2,1.,dot(-n1,L)))*.5*rFilm;

    // the blue Fresnel rim, brighter where the light sits
    col+=mix(vec3(.14,.18,.95),vec3(.5,.76,1.),F)*F*1.3*(.5+.5*smoothstep(-.4,.8,dot(n0,L)))*rRim;

    // studio reflections on the glass, and highlights
    vec3 rf=reflect(rd,n0);
    col+=envRef(rf)*F*.55*rFilm;
    col+=vec3(.85,.9,1.)*pow(max(dot(rf,normalize(vec3(-.45,.62,.64))),0.),160.)*.16*rFilm;
    col+=vec3(.75,.82,1.)*pow(max(dot(rf,L),0.),16.)*.1*rFilm;

    // dust suspended inside, and the depth of the glass
    vec3 pm=ro+rd*(-b);
    col+=vec3(.6,.72,1.)*smoothstep(.84,.98,gn(R*pm*24.+vec3(0.,t*.04,0.)))*.32*(1.-F)*rFilm;
    col+=vec3(.015,.02,.07)*sq*2.*rFilm;

    // the energy wave: a band of light sweeping across the surface
    if(wv>0.){
      float band=exp(-pow((dot(n0,normalize(vec3(.35,1.,.25)))-mix(-1.25,1.25,uWave))*7.,2.));
      col+=vec3(.5,.85,1.)*band*wv*(.35+1.2*F);
    }
  }

  // the seed: a pinpoint of light, a soft atmosphere and a thin anamorphic streak
  if(uPoint>0.){
    float d=length(uv0);
    col+=vec3(.62,.8,1.)*uPoint*(exp(-d*260.)*2.2+exp(-d*28.)*.32+exp(-d*6.)*.05);
    col+=vec3(.45,.6,1.)*uPoint*exp(-abs(uv0.y)*520.)*exp(-abs(uv0.x)*5.)*.5;
  }

  col=1.-exp(-col*1.35);
  // the narrator's tint, on the light only: the brighter a point, the more it takes the act's
  // colour at its own strength; the dark glass keeps its own
  float v=max(col.r,max(col.g,col.b)),s=smoothstep(.05,.55,v);
  col=col*(1.-uTint.a*s)+v*s*uTint.rgb*1.15;
  col*=1.-uEdge*smoothstep(.44,.5,length(uv0));
  col+=(h12(gl_FragCoord.xy+fract(t*7.)*97.)-.5)*(2./255.);
  gl_FragColor=vec4(col,1.);
}
`;

// The swarm: each particle leaves the seed on its own tilted orbit and spirals
// out to an even spot on the shell (a Fibonacci sphere), projected with the
// orb's own camera so it lands exactly on the sphere's silhouette.
const VERT_DUST = /* glsl */ `
attribute float aId;
uniform float uTime,uForm,uScale,uFocal,uAspect,uPx,uN,uDust,uBig;
varying vec3 vCol;
varying float vA;
float hh(float n){return fract(sin(n*12.9898+1.7)*43758.5453);}
vec3 fib(float i,float n){float y=1.-2.*(i+.5)/n;float r=sqrt(max(0.,1.-y*y));float a=i*2.39996323;return vec3(cos(a)*r,y,sin(a)*r);}
mat3 axisRot(vec3 a,float t){a=normalize(a);float s=sin(t),c=cos(t),o=1.-c;
  return mat3(o*a.x*a.x+c,o*a.x*a.y+a.z*s,o*a.z*a.x-a.y*s,
              o*a.x*a.y-a.z*s,o*a.y*a.y+c,o*a.y*a.z+a.x*s,
              o*a.z*a.x+a.y*s,o*a.y*a.z-a.x*s,o*a.z*a.z+c);}
void main(){
  float i=aId;
  vec3 target=fib(i,uN);
  vec3 axis=vec3(hh(i)-.5,1.,hh(i+7.)-.5);
  float delay=hh(i+3.)*.4;
  float p=clamp((uForm-delay)/(1.-delay),0.,1.);
  float e=1.-pow(1.-p,3.);
  float r=e*(1.+.06*sin(p*3.14159));
  float swirl=(1.-e)*6.2831*(1.2+hh(i+5.)*1.6)+uTime*(.18+hh(i+9.)*.22);
  vec3 pos=axisRot(axis,swirl)*target*r;
  vec2 uv=pos.xy*uFocal/(3.2-pos.z)*uScale;
  gl_Position=vec4(uv.x*2./uAspect,uv.y*2.,0.,1.);
  float depth=clamp(pos.z*.5+.5,0.,1.);
  gl_PointSize=(1.1+2.4*hh(i+11.))*uPx*(.55+.7*depth)*uBig;
  vA=(.22+.78*depth)*smoothstep(0.,.06,p)*uDust;
  vCol=mix(mix(vec3(.42,.88,1.),vec3(.7,.48,1.),hh(i+13.)),vec3(1.),.3*hh(i+17.));
}
`;
const FRAG_DUST = /* glsl */ `
precision mediump float;
varying vec3 vCol;
varying float vA;
void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,0.,d);gl_FragColor=vec4(vCol*a*a*vA,1.);}
`;

const QUALITY = [1, 0.72, 0.5];

// The narrator's looks, [r, g, b, amount, energy]: the act's colour premultiplied by its
// amount, so a change of act eases the light linearly from one look to the next; energy is
// the film's speed and light (1 = the hero).
const look = (rgb: readonly number[], amount: number, energy: number) => [...rgb.map((c) => c * amount), amount, energy];
const HERO_LOOK = look([0, 0, 0], 0, 1);
const LOOKS: Partial<Record<string, number[]>> = {
  skills: look([0.43, 0.11, 1], 0.72, 1.3), // violet #6e1bff, the technical wall's colour, a little livelier
  experience: look([0, 0, 0], 0, 0.45), // calm: its own palette, slow and low
  contact: look([0.76, 0.96, 0.36], 0.86, 1.1), // lime #c2f55c, the finale's colour
};
// The acts it reads, in page order. Work has no look: over its light fog wall a dark
// glass ball reads as a smudge, so the orb waits out of sight there.
const ACTS = ["work", "skills", "experience", "contact"];
// The companion's line, in % of the viewport height (about the dock's middle): the act under it is the one the orb takes on.
const LINE = 94;

// The canvas and the companion's box are made by the effect, not in JSX: the canvas
// moves between the stage and the box, and a node React rendered must stay where
// React put it. The box hangs off <body>: inside <main> it would share the route
// template's stacking context, and the footer, painted after it, would cover it.
function make<K extends keyof HTMLElementTagNameMap>(tag: K, attr: string, className = "") {
  const el = document.createElement(tag);
  el.className = className;
  el.setAttribute(attr, "");
  el.setAttribute("aria-hidden", "true");
  return el;
}

export function Orb({ className, boxClassName }: { className?: string; boxClassName?: string }) {
  const slotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // A restored WebGL context comes back empty: bumping this re-runs the effect,
  // which rebuilds programs, buffers and uniforms on the same canvas.
  const [gen, setGen] = useState(0);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const canvas = canvasRef.current ?? (canvasRef.current = make("canvas", "data-orb-canvas", className));
    if (!canvas.isConnected) slot.appendChild(canvas);
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
    });
    if (!gl || gl.isContextLost()) {
      orbStatus.failed = true; // the CSS poster stays; the opening hands straight over
      return;
    }
    orbStatus.failed = false;

    // Where the browser can (KHR_parallel_shader_compile), the shaders compile
    // off the main thread while the page hydrates; settle() polls for the result
    // instead of blocking on it. Without the extension it reads it at once.
    const par = gl.getExtension("KHR_parallel_shader_compile");
    const build = (vert: string, frag: string, attr: string) => {
      const p = gl.createProgram()!;
      for (const [type, src] of [
        [gl.VERTEX_SHADER, vert],
        [gl.FRAGMENT_SHADER, frag],
      ] as const) {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        gl.attachShader(p, s);
      }
      // both programs read their one attribute from slot 0, so switching only re-points it
      gl.bindAttribLocation(p, 0, attr);
      gl.linkProgram(p);
      return p;
    };
    const linked = (p: WebGLProgram) => {
      if (gl.getProgramParameter(p, gl.LINK_STATUS)) return true;
      if (process.env.NODE_ENV !== "production") gl.getAttachedShaders(p)?.forEach((s) => console.warn(gl.getShaderInfoLog(s)));
      return false;
    };

    // The swarm only exists when the opening is about to play; then the orb
    // starts in the dark, so the hero's sphere never shows before the opening.
    const root = document.documentElement;
    const small = matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const N = small ? 520 : 1400;
    const due = root.classList.contains("intro");
    if (due && !opening.active) Object.assign(opening, START, { active: true });
    const prog = build(VERT, FRAG, "a");
    let dust = due ? build(VERT_DUST, FRAG_DUST, "aId") : null;
    let tri: WebGLBuffer | null = null;
    let ids: WebGLBuffer | null = null;
    const U: Record<string, WebGLUniformLocation | null> = {};
    const D: Record<string, WebGLUniformLocation | null> = {};

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // html.still: the header's "Pause motion" (it fires "pt:still" when it changes)
    const still = () => reduced || root.classList.contains("still");
    const fine = matchMedia("(pointer: fine)").matches;
    // where the companion lives (stage.module.css): phones have no free corner, so they keep the stage's orb only
    const wide = matchMedia("(min-width: 768px)");
    const stage = slot.closest<HTMLElement>("[data-stage]");
    const companion = document.body.appendChild(make("div", "data-orb-companion", boxClassName));
    const acts = ACTS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const boxed = () => canvas.parentElement === companion;
    let live = false; // programs linked, buffers and uniforms in place
    let level = 0;
    let raf = 0;
    let visible = true;
    let ready = false;
    let clock = 52; // the film's own time: the frame a still orb shows at first, then wherever it paused
    let prev = 0;
    let stageOn = true; // the stage still shows its orb
    let act = ""; // the section under the companion's line
    let goal = HERO_LOOK;
    const cur = [...HERO_LOOK];
    let pulse = 1; // the narrator's wave on a change of act, 0..1 (1 = none)
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const view = { focal: 1, aspect: 1, px: 1 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      // The stage orb is soft: render below the screen's density and let the browser scale up.
      // The companion is a few thousand pixels: full density keeps its ribbons crisp.
      const scale = boxed() ? Math.min(dpr, 2) : Math.min(Math.max(dpr * 0.72, 0.75), 1.15) * QUALITY[level];
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      // Apparent radius in units of the canvas height: ~0.36 on landscape screens, ~43% of the width
      // on phones; 0.38 in the companion's square box, where the halo fades out just inside the edge.
      const radius = boxed() ? 0.38 : Math.min(0.36, 0.43 * (w / h));
      view.focal = radius * Math.sqrt(3.2 * 3.2 - 1);
      view.aspect = w / h;
      view.px = w / Math.max(canvas.clientWidth, 1);
      gl.useProgram(prog);
      gl.uniform2f(U.uRes, w, h);
      gl.uniform1f(U.uFocal, view.focal);
      gl.uniform1f(U.uEdge, boxed() ? 1 : 0);
    };

    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      // the stage turns the orb as it scrolls; the companion keeps turning with the page, slowly
      let scroll = 1 + (scrollY / innerHeight) * 0.12;
      if (stage && !boxed()) {
        const r = stage.getBoundingClientRect();
        scroll = Math.min(Math.max(-r.top / Math.max(r.height - innerHeight, 1), 0), 1);
      }
      // The opening's values count only while html.intro is set: if anything ends it
      // early (the <head> guard, a failed script), the orb is the hero's at once.
      const playing = opening.active && root.classList.contains("intro");
      const o = playing ? opening : HERO;

      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, tri);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(U.uTime, clock);
      gl.uniform2f(U.uMouse, mouse.x, mouse.y);
      gl.uniform1f(U.uScroll, scroll);
      gl.uniform1f(U.uReveal, o.reveal);
      gl.uniform1f(U.uPoint, o.point);
      gl.uniform1f(U.uWave, playing ? o.wave : pulse < 1 ? pulse : -1);
      gl.uniform1f(U.uScale, o.scale);
      gl.uniform4f(U.uTint, cur[0], cur[1], cur[2], cur[3]);
      gl.uniform1f(U.uEnergy, cur[4]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (dust && ids && playing && opening.dust > 0.001) {
        gl.useProgram(dust);
        gl.bindBuffer(gl.ARRAY_BUFFER, ids);
        gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
        gl.uniform1f(D.uTime, clock);
        gl.uniform1f(D.uForm, opening.form);
        gl.uniform1f(D.uScale, opening.scale);
        gl.uniform1f(D.uFocal, view.focal);
        gl.uniform1f(D.uAspect, view.aspect);
        gl.uniform1f(D.uPx, view.px);
        gl.uniform1f(D.uN, N);
        gl.uniform1f(D.uDust, opening.dust);
        gl.uniform1f(D.uBig, small ? 1.3 : 1);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE); // light adds up
        gl.drawArrays(gl.POINTS, 0, N);
        gl.disable(gl.BLEND);
      }

      if (!ready) {
        ready = true;
        orbStatus.ready = true;
        canvas.dataset.ready = "";
        slot.dataset.ready = ""; // the poster steps back for good (stage.module.css)
        queueMicrotask(update); // the companion may show now
      }
    };

    // Adaptive quality: if the first frames are slow, render fewer pixels.
    let frames = 0;
    let since = 0;
    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = prev ? Math.min((now - prev) / 1000, 0.1) : 0;
      prev = now;
      // one act's look eases into the next in about 0.6s; the film runs at the act's energy
      const k = 1 - Math.exp(-dt / 0.2);
      for (let i = 0; i < cur.length; i++) cur[i] += (goal[i] - cur[i]) * k;
      if (pulse < 1) pulse = Math.min(pulse + dt / 1.3, 1);
      clock += dt * cur[4];
      if (!fine) {
        // no cursor on touch screens: a slow drift instead
        mouse.tx = Math.sin(clock * 0.21) * 0.35;
        mouse.ty = Math.cos(clock * 0.17) * 0.25;
      }
      draw();
      // ponytail: only the full-screen stage adapts; in the small box a slow frame is never the orb's pixels
      if (!boxed()) {
        if (frames === 0) since = now;
        if (++frames === 90) {
          const avg = (now - since) / 89;
          if (avg > 22 && level < QUALITY.length - 1) {
            level++;
            resize();
          }
          frames = 0;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!live) return;
      if (still()) return draw();
      // Outside the raf guard: a hidden tab holds the pending frame, and the
      // pause (off screen, hidden tab) must not count as slow frames.
      frames = 0;
      prev = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    // Where the orb is and what it carries. The stage's orb while the stage shows it (and
    // always during the opening, and on phones); after it, the companion, in the look of
    // the act under its line, out of sight over the work wall.
    const update = () => {
      const intro = opening.active && root.classList.contains("intro");
      const inStage = intro || stageOn || !wide.matches;
      const home = inStage ? slot : companion;
      if (canvas.parentElement !== home) home.appendChild(canvas); // the ResizeObserver resizes and redraws it
      const next = home === slot ? HERO_LOOK : LOOKS[act];
      if (next && next !== goal) {
        goal = next;
        // Back in the stage, unseen at the switch, the hero's orb returns as itself;
        // a new act runs a wave through the companion as its colour turns.
        if (home === slot) cur.splice(0, cur.length, ...next);
        else pulse = 0;
      }
      visible = home === slot ? stageOn : !!next;
      companion.toggleAttribute("data-on", home !== slot && !!next && live && ready);
      if (still()) {
        cur.splice(0, cur.length, ...goal);
        pulse = 1;
      }
      if (visible) start();
    };

    // Waits for the compile, then builds the rest; on failure the poster stays.
    const settle = () => {
      raf = 0;
      if (par && ![prog, dust].every((p) => !p || gl.getProgramParameter(p, par.COMPLETION_STATUS_KHR))) {
        raf = requestAnimationFrame(settle);
        return;
      }
      if (!linked(prog)) {
        orbStatus.failed = true;
        return;
      }
      orbStatus.compiled = true;
      if (dust && !linked(dust)) dust = null; // no swarm; the opening still plays on the sphere

      // one triangle that covers the screen
      tri = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, tri);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      for (const n of ["uRes", "uTime", "uMouse", "uScroll", "uFocal", "uReveal", "uPoint", "uWave", "uScale", "uTint", "uEnergy", "uEdge"])
        U[n] = gl.getUniformLocation(prog, n);
      if (dust) {
        ids = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, ids);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          Float32Array.from({ length: N }, (_, i) => i),
          gl.STATIC_DRAW,
        );
        for (const n of ["uTime", "uForm", "uScale", "uFocal", "uAspect", "uPx", "uN", "uDust", "uBig"])
          D[n] = gl.getUniformLocation(dust, n);
      }
      live = true;
      resize();
      update();
    };

    const ro = new ResizeObserver(() => {
      if (!live) return;
      resize();
      draw(); // a new size clears the buffer (and the canvas may have just moved)
    });
    ro.observe(canvas);
    // The stage layer is sticky, so watch the stage. The top margin matches the end of
    // StageMotion's fade ("#intro" bottom at 45%, stage-motion.tsx): once the orb is at
    // opacity 0 it leaves the stage (or, on phones, stops), and it comes back on the way up.
    const stageIO = new IntersectionObserver(
      ([e]) => {
        stageOn = e.isIntersecting;
        update();
      },
      { rootMargin: stage ? "-45% 0px 0px 0px" : "0px" },
    );
    stageIO.observe(stage ?? slot);
    // The act under the companion: the last section whose top has passed its line. Sections
    // this list does not name (the footer, anything added later) keep the act before them.
    const actIO = new IntersectionObserver(
      () => {
        const line = (innerHeight * LINE) / 100;
        act = "";
        for (const el of acts) if (el.getBoundingClientRect().top <= line) act = el.id;
        update();
      },
      { rootMargin: `-${LINE}% 0px -${100 - LINE}% 0px` },
    );
    acts.forEach((el) => actIO.observe(el));
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.tx = (e.clientX / innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / innerHeight) * 2 - 1);
    };
    const onVisibility = () => !document.hidden && start();
    // "Pause motion" toggled: stop on the current frame, or carry on from it.
    const onStill = () => {
      if (!live) return;
      cancelAnimationFrame(raf);
      raf = 0;
      update();
    };
    const onLost = (e: Event) => {
      e.preventDefault(); // tells the browser we rebuild when it restores the context
      cancelAnimationFrame(raf);
      raf = 0;
      live = false;
      orbStatus.failed = true;
      delete canvas.dataset.ready;
      delete slot.dataset.ready;
      companion.removeAttribute("data-on");
    };
    const onRestored = () => setGen((g) => g + 1);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pt:still", onStill);
    document.addEventListener("visibilitychange", onVisibility);
    wide.addEventListener("change", update);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    settle();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      stageIO.disconnect();
      actIO.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pt:still", onStill);
      document.removeEventListener("visibilitychange", onVisibility);
      wide.removeEventListener("change", update);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      canvas.remove(); // a re-run (a restored context, React's dev remount) puts it back
      companion.remove();
    };
  }, [gen, className, boxClassName]);

  return <div ref={slotRef} data-orb-slot className="absolute inset-0" />;
}
