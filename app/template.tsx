// Re-mounts on every navigation, so each route fades in from black.
// Opacity only: a transform here would trap the fixed and sticky layers inside.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-[fade_700ms_var(--ease-out)_both]">{children}</div>;
}
