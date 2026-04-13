import React from 'react';
import Text, { type TextProps } from 'components/Text';
import styles from './HighlightedText.module.scss';

type HighlightedTextProps = TextProps & {
  text?: string;
};

const HighlightedText: React.FC<HighlightedTextProps> = ({ text = '', tag = 'span', ...props }) => {
  const parts = text.split(/(`[^`]+`)/g);

  const result = parts.map((part, index) => {
    const isCode = part.startsWith('`') && part.endsWith('`');

    if (isCode) {
      const content = part.slice(1, -1);
      return (
        <code key={index} className={styles.code}>
          {content}
        </code>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });

  return (
    <Text {...props} tag={tag} className={styles.container}>
      {result}
    </Text>
  );
};

export default HighlightedText;
