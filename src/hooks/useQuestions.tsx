import { useState, useEffect } from 'react';
import type { Question } from 'types/Questions';

// TODO Correct for actual categories
type Category = 'JavaScript' | 'typescript' | 'css';

type QuestionModule = {
  default: Question[];
};

const questionModules = import.meta.glob<QuestionModule>('/src/data/**/*.json');

export function useQuestions(category: Category | null, fileId: string | null) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category || !fileId) return;

    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      const targetPath = `/src/data/${category}/${fileId}.json`;

      const importer = questionModules[targetPath];

      if (!importer) {
        setError(`File not found: ${targetPath}`);
        setLoading(false);
        return;
      }

      try {
        const module = await importer();
        const data = module.default;

        if (isMounted) {
          if (Array.isArray(data)) {
            setQuestions(data);
          } else {
            setError(`Invalid data format in ${targetPath}`);
          }
        }
      } catch {
        if (isMounted) {
          setError(`Failed to load ${targetPath}`);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [category, fileId]);

  return { questions, loading, error };
}
