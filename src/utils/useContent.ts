"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useContent<T = Record<string, any>>(section: string): T {
  const { language } = useLanguage();
  const [content, setContent] = useState<T>({} as T);

  useEffect(() => {
    import(`../../content/${language}/${section}.json`)
      .then((mod) => setContent(mod.default as T))
      .catch((err) =>
        console.error(`Failed to load content/${language}/${section}.json`, err)
      );
  }, [language, section]);

  return content;
}
