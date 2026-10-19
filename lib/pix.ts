// Same TLV + CRC16-CCITT approach as Noivar's BR Code generator, used here to
// build a real (fictional-data) payload for the case-study anatomy.

const field = (id: string, value: string) => `${id}${String(value.length).padStart(2, "0")}${value}`;

export function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export type PixSegment = { id: string; name: string; value: string; raw: string; hint: string };

export function pixAnatomy(input: { key: string; name: string; city: string; amount: number; txid: string }) {
  const merchant = field("00", "br.gov.bcb.pix") + field("01", input.key);
  const parts: Omit<PixSegment, "raw">[] = [
    { id: "00", name: "Formato", value: "01", hint: "Versão do payload EMV" },
    { id: "26", name: "Conta Pix", value: merchant, hint: "GUI br.gov.bcb.pix + chave do casal" },
    { id: "52", name: "MCC", value: "0000", hint: "Categoria do recebedor" },
    { id: "53", name: "Moeda", value: "986", hint: "986 = real (ISO 4217)" },
    { id: "54", name: "Valor", value: input.amount.toFixed(2), hint: "Valor do presente" },
    { id: "58", name: "País", value: "BR", hint: "Código do país" },
    { id: "59", name: "Recebedor", value: input.name, hint: "Nome normalizado, até 25 caracteres" },
    { id: "60", name: "Cidade", value: input.city, hint: "Cidade normalizada, até 15 caracteres" },
    { id: "62", name: "txid", value: field("05", input.txid), hint: "Identificador da cobrança" },
  ];
  const segments: PixSegment[] = parts.map((p) => ({ ...p, raw: field(p.id, p.value) }));
  const base = segments.map((s) => s.raw).join("") + "6304";
  const crc = crc16(base);
  segments.push({ id: "63", name: "CRC16", value: crc, raw: `6304${crc}`, hint: "Checksum CRC16-CCITT do payload" });
  return { payload: base + crc, segments };
}
