import { useState, useEffect } from 'react';
import type { Question } from 'types/Questions';

type Category = 'JavaScript' | 'typescript' | 'css';

const questionModules = import.meta.glob(
    '/src/data/**/multiple-correct.json',
    { eager: false }
);

export function useQuestions(category: Category | null = null) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!category) {
            setQuestions([]);
            setLoading(false);
            setError(null);
            return;
        }

        let isMounted = true;
        setLoading(true);
        setError(null);

        const load = async () => {
            const loaded: Question[] = [];

            const prefix = `/src/data/${category}/`;

            for (const [path, importer] of Object.entries(questionModules)) {
                if (!path.startsWith(prefix)) continue;

                try {
                    const module = await importer();
                    const data = (module as any).default;

                    if (Array.isArray(data)) {
                        loaded.push(...(data as Question[]));
                    } else {
                        console.warn(`Invalid data in ${path}: expected array`);
                    }
                } catch (err) {
                    console.warn(`Failed to load ${path}:`, err);
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
    console.log(questions)
    return { questions, loading, error };
}