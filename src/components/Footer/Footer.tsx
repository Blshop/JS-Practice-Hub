import React from 'react';
import Text from 'components/Text';
import styles from './Footer.module.scss';

const DEVELOPERS = [
  { name: 'Blshop', github: 'https://github.com/Blshop' },
  { name: 'DmitryAstapenko', github: 'https://github.com/DmitryAstapenko' },
  { name: 'GorodeN', github: 'https://github.com/GorodeN' },
  { name: 'spadarynjaALINA', github: 'https://github.com/spadarynjaALINA' },
] as const;

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__info}>
        <Text tag="span" bold>
          RS School CodePain 2026
        </Text>
        {DEVELOPERS.map((dev) => (
          <a
            key={dev.name}
            className={styles.footer__link}
            href={dev.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text className={styles.footer__linkText} tag="span" bold>
              {dev.name}
            </Text>
          </a>
        ))}
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
