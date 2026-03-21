import React from 'react';
import Text, { type TextProps } from 'components/Text';
import styles from './HighlightedText.module.scss';

type HighlightedTextProps = TextProps & {
  text?: string;
};

const HighlightedText: React.FC<HighlightedTextProps> = ({ text = '', tag = 'span', ...props }) => {
  const regex = /0/g;
  // /\*\*(.*?)\*\*|\b(const|let|var|if|else|return|function|class|new)\b|===|!==|==|!=|\b(true|false|null|undefined)\b|\d+|"[^"]*"|'[^']*'/g;
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(regex)) {
    const index = match.index ?? 0;
    const value = match[0];
    const emphasis = match[1];
    const keyword = match[2];

    if (index > lastIndex) {
      result.push(text.slice(lastIndex, index));
    }

    if (emphasis) {
      result.push(
        <span key={key++} className={styles.emphasis}>
          {emphasis}
        </span>,
      );
    } else if (keyword) {
      result.push(
        <span key={key++} className={styles.keyword}>
          {keyword}
        </span>,
      );
    } else {
      result.push(
        <code key={key++} className={styles.code}>
          {value}
        </code>,
      );
    }

    lastIndex = index + value.length;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return (
    <Text {...props} tag={tag} className={styles.container}>
      {result}
    </Text>
  );
};

export default HighlightedText;
