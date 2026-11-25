import { AskDialog } from "@/components/fx/ask-dialog";
import { askEnabled } from "@/lib/knowledge";

// "Ask the portfolio" ships only where ANTHROPIC_API_KEY is set. Decided on the server,
// at render (build time for these static pages: set the key, then deploy), so a site
// without a key renders no dialog and no launcher (components/sections/contact.tsx).
export function Ask() {
  return askEnabled() ? <AskDialog /> : null;
}
