// // src/components/quiz/QuestionRenderer.tsx
// import React from 'react';
// import Text from 'components/Text';
// import Button from 'components/Button';
// import Checkbox from 'components/Checkbox';
// import Radio from 'components/Radio';
// import type { Question } from 'types/Questions';

// interface Props {
//     question: Question;
//     userAnswer?: any;
//     onAnswer: (answer: any) => void;
//     isAnswered: boolean;
// }

// const QuestionRenderer: React.FC<Props> = ({
//     question,
//     userAnswer,
//     onAnswer,
//     isAnswered,
// }) => {
//     const { type, options, correctId, correctIds, correct } = question as any;

//     switch (type) {
//         case 'single-correct':
//             return (
//                 <div className="space-y-3">
//                     {options.map((opt: { id: string; text: string }) => (
//                         <Radio
//                             key={opt.id}
//                             label={opt.text}
//                             name={question.id}
//                             elementSize="medium"
//                             checked={userAnswer === opt.id}
//                             onChange={() => onAnswer(opt.id)}
//                             disabled={isAnswered}
//                         />
//                     ))}
//                 </div>
//             );

//         case 'multiple-correct':
//             return (
//                 <div className="space-y-3">
//                     {options.map((opt: { id: string; text: string }) => (
//                         <Checkbox
//                             key={opt.id}
//                             label={opt.text}
//                             elementSize="medium"
//                             checked={(userAnswer || []).includes(opt.id)}
//                             onChange={checked => {
//                                 const prev = userAnswer || [];
//                                 const next = checked
//                                     ? [...prev, opt.id]
//                                     : prev.filter((id: string) => id !== opt.id);
//                                 onAnswer(next);
//                             }}
//                             disabled={isAnswered}
//                         />
//                     ))}
//                 </div>
//             );

//         case 'yes-no':
//             return (
//                 <div className="flex gap-6">
//                     <Button
//                         variant={userAnswer === 'yes' ? 'success' : 'light'}
//                         onClick={() => onAnswer('yes')}
//                         disabled={isAnswered}
//                     >
//                         Так
//                     </Button>
//                     <Button
//                         variant={userAnswer === 'no' ? 'danger' : 'light'}
//                         onClick={() => onAnswer('no')}
//                         disabled={isAnswered}
//                     >
//                         Ні
//                     </Button>
//                 </div>
//             );

//         case 'predict-output':
//             return (
//                 <textarea
//                     className="w-full p-4 border rounded resize-y min-h-[120px] font-mono"
//                     placeholder="Введіть, що, на вашу думку, буде виведено..."
//                     value={userAnswer || ''}
//                     onChange={e => onAnswer(e.target.value.trim())}
//                     disabled={isAnswered}
//                 />
//             );

//         case 'drag-and-drop':
//             return (
//                 <div className="border-2 border-dashed border-gray-400 p-8 min-h-[200px] flex items-center justify-center text-gray-500">
//                     Зона для перетягування (реалізуйте через @dnd-kit)
//                 </div>
//             );

//         default:
//             return <div>Непідтримуваний тип питання</div>;
//     }
// };

// export default QuestionRenderer;
