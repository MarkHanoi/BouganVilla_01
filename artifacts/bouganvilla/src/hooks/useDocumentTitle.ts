import { useEffect } from "react";

const SITE = "Bougan Villa";

export function useDocumentTitle(title?: string | null) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : SITE;
    return () => { document.title = SITE; };
  }, [title]);
}
