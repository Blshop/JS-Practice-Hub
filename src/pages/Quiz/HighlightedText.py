import React from 'react';
import Text, { type TextProps } from 'components/Text';
import styles from './HighlightedText.module.scss';

type HighlightedTextProps = TextProps & {
    text: string;
};

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, ...props }) => {
    // **italic** OR JS tokens
    const regex =
        /\*\*(.*?)\*\*|[]|{}|===|==|!=|!==|true|false|null|undefined|\d+|".*?"|'.*?'/g;

    const result: React.ReactNode[] = [];
    let lastIndex = 0;

    text.replace(regex, (match, italicText, offset) => {
        if (offset > lastIndex) {
            result.push(text.slice(lastIndex, offset));
        }

        if (italicText) {
            result.push(
                <span key={offset} className={styles.emphasis}>
                    {italicText}
                </span>
            );
        } else {
            result.push(
                <code key={offset} className={styles.code}>
                    {match}
                </code>
            );
        }

        lastIndex = offset + match.length;
        return match;
    });

    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }

    return (
        <Text {...props} className={styles.container}>
            {result}
        </Text>
    );
};

export default HighlightedText;