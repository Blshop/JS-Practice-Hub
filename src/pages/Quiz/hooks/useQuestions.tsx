import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Question, LocalizedString } from 'types/Questions';
import { localize } from 'utils/localize';
// TODO Correct for actual categories
type Category = 'JavaScript' | 'typescript' | 'css';

type LocalizedOption = { id: string; text: LocalizedString };

type RawQuestion = Omit<Question, 'question' | 'explanation' | 'options'> & {
  question: LocalizedString;
  explanation: LocalizedString;
  options?: LocalizedOption[];
};

type QuestionModule = { default: RawQuestion[] };

const questionModules = import.meta.glob<QuestionModule>('/src/data/**/**/*.json');

function localizeQuestion(q: RawQuestion, lang: string): Question {
  return {
    ...q,
    question: localize(q.question, lang),
    explanation: localize(q.explanation, lang),
    ...(q.options && {
      options: q.options.map((opt) => ({ ...opt, text: localize(opt.text, lang) })),
    }),
  } as unknown as Question;
}

export function useQuestions(category: Category | null, fileId: string | null) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [rawQuestions, setRawQuestions] = useState<RawQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const lang = i18n.language;

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
            setRawQuestions(data);
          } else {
            setError(`Invalid data format in ${targetPath}`);
          }
        }
      } catch {
        if (isMounted) setError(`Failed to load ${targetPath}`);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [category, fileId]);

  useEffect(() => {
    setQuestions(rawQuestions.map((q) => localizeQuestion(q, lang)));
  }, [rawQuestions, lang]);

  return { questions, loading, error };
}
