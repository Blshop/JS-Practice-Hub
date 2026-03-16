import { useState, useEffect } from 'react';
import type { Question } from 'types/Questions';

type Category = 'JavaScript' | 'typescript' | 'css';

type QuestionModule = {
  default: Question[];
};

const questionModules = import.meta.glob<QuestionModule>('/src/data/**/predict-output.json');

export function useQuestions(category: Category | null = null) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;

    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      const loaded: Question[] = [];
      const prefix = `/src/data/${category}/`;

      for (const [path, importer] of Object.entries(questionModules)) {
        if (!path.startsWith(prefix)) continue;

        try {
          const module = await importer();
          const data = module.default;

          if (Array.isArray(data)) {
            loaded.push(...data);
          } else {
            console.warn(`Invalid data in ${path}: expected array`);
          }
        } catch (err) {
          console.warn(`Failed to load ${path}:`, err);
          if (isMounted) {
            setError(`Failed to load ${path}`);
          }
        }
      }

      if (isMounted) {
        setQuestions(loaded);
        setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { questions, loading, error };
}
