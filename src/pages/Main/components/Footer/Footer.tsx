import React from 'react';
import Text from '../../../../components/Text';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__info}>
        <Text tag="span" bold>
          CodePain 2026
        </Text>
        <a className={styles.footer__link} href="https://github.com/Blshop">
          <Text className={styles.footer__linkText} tag="span" bold>
            Blshop
          </Text>
        </a>
        <a className={styles.footer__link} href="https://github.com/GorodeN">
          <Text className={styles.footer__linkText} tag="span" bold>
            DmitryAstapenko
          </Text>
        </a>
        <a className={styles.footer__link} href="https://github.com/DmitryAstapenko">
          <Text className={styles.footer__linkText} tag="span" bold>
            GorodeN
          </Text>
        </a>
      </div>
    </footer>
  );
};
