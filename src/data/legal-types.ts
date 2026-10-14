// Общие типы для юридических страниц (Regulamin, Polityka prywatności).
// Пункт списка: либо просто текст, либо текст + вложенный маркированный список.
export type LegalItem = string | { t: string; ul: string[] };

export type LegalBlock =
  | { p: string } // обычный абзац
  | { ol: LegalItem[] } // нумерованные пункты 1., 2., 3. …
  | { ul: string[] } // маркированный список
  | { box: string[] }; // рамка (например, образец формуляра)

export interface LegalSection {
  h: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  // Пометка для переводов: «юридическую силу имеет польская версия»
  note?: string;
  effectiveLabel: string;
  effective: string;
  sections: LegalSection[];
}
