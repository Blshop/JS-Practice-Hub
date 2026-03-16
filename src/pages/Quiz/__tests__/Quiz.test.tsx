import { describe, it, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizPage from '../Quiz';
import * as useQuestionsModule from 'hooks/useQuestions';
import type { Question } from 'types/Questions';

const mockQuestions: Question[] = [
    {
        id: 'q1',
        type: 'single-correct',
        question: 'What is 2+2?',
        options: [
            { id: 'o1', text: '3' },
            { id: 'o2', text: '4' }
        ],
        correctId: 'o2',
        theme: 'math',
        explanation: '2 + 2 equals 4',
    },
    {
        id: 'q2',
        type: 'multiple-correct',
        question: 'Select even numbers',
        options: [
            { id: 'o1', text: '1' },
            { id: 'o2', text: '2' },
            { id: 'o3', text: '3' },
            { id: 'o4', text: '4' }
        ],
        correctIds: ['o2', 'o4'],
        theme: 'math',
        explanation: '2 and 4 are even numbers',
    },
    {
        id: 'q3',
        type: 'yes-no',
        question: 'Is JS typed?',
        correct: 'no',
        theme: 'javascript',
        explanation: 'JavaScript is dynamically typed',
    },
    {
        id: 'q4',
        type: 'predict-output',
        question: 'Console output of 5 + "5"?',
        code: 'console.log(5 + "5");',
        answer: '55',
        explanation: 'String concatenation',
        theme: 'javascript',
    }
];

vi.mock('hooks/useQuestions');

describe('QuizPage', () => {
    beforeEach(() => {
        (useQuestionsModule.useQuestions as any).mockReturnValue({
            questions: mockQuestions,
            loading: false,
            error: null,
        });
    });

    const startQuiz = async (category = 'JavaScript') => {
        render(<QuizPage />);
        fireEvent.click(screen.getByText(category));
    };

    it('renders first question', async () => {
        await startQuiz();
        expect(await screen.findByText('What is 2+2?')).toBeInTheDocument();
        expect(screen.getByLabelText('3')).toBeInTheDocument();
        expect(screen.getByLabelText('4')).toBeInTheDocument();
    });

    it('checks correct single-correct answer', async () => {
        await startQuiz();
        fireEvent.click(screen.getByLabelText('4'));
        fireEvent.click(screen.getByText('Check Answer'));
        expect(await screen.findByText('Correct!')).toBeInTheDocument();
    });

    it('marks incorrect single-correct answer', async () => {
        await startQuiz();
        fireEvent.click(screen.getByLabelText('3'));
        fireEvent.click(screen.getByText('Check Answer'));
        expect(await screen.findByText('Incorrect')).toBeInTheDocument();
    });

    it('handles multiple-correct question', async () => {
        await startQuiz();
        fireEvent.click(screen.getByLabelText('4'));
        fireEvent.click(screen.getByText('Check Answer'));
        fireEvent.click(screen.getByText('Next Question'));

        expect(await screen.findByText('Select even numbers')).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText('2'));
        fireEvent.click(screen.getByLabelText('4'));
        fireEvent.click(screen.getByText('Check Answer'));
        expect(await screen.findByText('Correct!')).toBeInTheDocument();
    });

    it('handles yes-no question', async () => {
        await startQuiz();

        fireEvent.click(screen.getByLabelText('4'));
        fireEvent.click(screen.getByText('Check Answer'));
        fireEvent.click(screen.getByText('Next Question'));

        fireEvent.click(screen.getByLabelText('2'));
        fireEvent.click(screen.getByLabelText('4'));
        fireEvent.click(screen.getByText('Check Answer'));
        fireEvent.click(screen.getByText('Next Question'));

        expect(await screen.findByText('Is JS typed?')).toBeInTheDocument();
        fireEvent.click(screen.getByText('No'));
        fireEvent.click(screen.getByText('Check Answer'));
        expect(await screen.findByText('Correct!')).toBeInTheDocument();
    });

    it('handles predict-output question', async () => {
        await startQuiz();
        fireEvent.click(screen.getByLabelText('4'));
        fireEvent.click(screen.getByText('Check Answer'));
        fireEvent.click(screen.getByText('Next Question'));

        fireEvent.click(screen.getByLabelText('2'));
        fireEvent.click(screen.getByLabelText('4'));
        fireEvent.click(screen.getByText('Check Answer'));
        fireEvent.click(screen.getByText('Next Question'));

        fireEvent.click(screen.getByText('No'));
        fireEvent.click(screen.getByText('Check Answer'));
        fireEvent.click(screen.getByText('Next Question'));

        const fourthQuestion = await screen.findByText(/Console output of 5 \+ "5"\?/i);
        expect(fourthQuestion).toBeInTheDocument();

        const input = screen.getByLabelText('Your answer') as HTMLInputElement;
        fireEvent.change(input, { target: { value: '55' } });
        fireEvent.click(screen.getByText('Check Answer'));

        expect(await screen.findByText('Correct!')).toBeInTheDocument();
        expect(await screen.findByText(/String concatenation/i)).toBeInTheDocument();
    });
});