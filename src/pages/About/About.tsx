import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Text from 'components/Text';
import Button from 'components/Button';
import ColoredCat from 'components/ColoredCat/ColoredCat';
import type { CatColorScheme } from 'components/ColoredCat/ColoredCat';
import { routes } from 'config/routes';
import styles from './About.module.scss';

const FEATURES = ['quiz', 'levels', 'progress', 'topics'] as const;

const STACK = [
  { label: 'React', color: '#61dafb' },
  { label: 'TypeScript', color: '#3178c6' },
  { label: 'MobX', color: '#ff7043' },
  { label: 'SCSS', color: '#cc6699' },
  { label: 'Node.js', color: '#68a063' },
  { label: 'Express', color: '#8fb5f0' },
  { label: 'MongoDB', color: '#4db33d' },
  { label: 'i18next', color: '#d8c6eb' },
];

interface TeamMember {
  key: 'nikita' | 'roman' | 'dmitry' | 'alina';
  github: string;
  color: CatColorScheme;
  floatDelay: number;
  isMentor?: boolean;
  isLead?: boolean;
}

const TEAM: TeamMember[] = [
  {
    key: 'nikita',
    github: 'https://github.com/Blshop',
    color: 'blue',
    floatDelay: 0,
    isLead: true,
  },
  { key: 'roman', github: 'https://github.com/GorodeN', color: 'green', floatDelay: 0.6 },
  { key: 'dmitry', github: 'https://github.com/DmitryAstapenko', color: 'orange', floatDelay: 1.2 },
  {
    key: 'alina',
    github: 'https://github.com/spadarynjaALINA',
    color: 'purple',
    floatDelay: 0.3,
    isMentor: true,
  },
];

const About: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.about}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <Text tag="h1" className={styles.heroTitle}>
            {t('about.hero.title')}
          </Text>
          <Text tag="p" muted className={styles.heroSubtitle}>
            {t('about.hero.subtitle')}
          </Text>
        </div>
      </section>

      <section className={styles.section}>
        <Text tag="h2" className={styles.sectionTitle}>
          {t('about.features.title')}
        </Text>
        <div className={styles.featuresGrid}>
          {FEATURES.map((key) => (
            <div key={key} className={styles.featureCard}>
              <Text tag="h3" bold className={styles.featureTitle}>
                {t(`about.features.${key}.title`)}
              </Text>
              <Text tag="p" muted className={styles.featureDesc}>
                {t(`about.features.${key}.desc`)}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <Text tag="h2" className={styles.sectionTitle}>
          {t('about.stack.title')}
        </Text>
        <div className={styles.stackList}>
          {STACK.map(({ label, color }) => (
            <span key={label} className={styles.stackBadge} style={{ borderColor: color, color }}>
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <Text tag="h2" className={styles.sectionTitle}>
          {t('about.team.title')}
        </Text>
        <div className={styles.teamGrid}>
          {TEAM.map((member) => (
            <a
              key={member.key}
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.teamCard} ${member.isMentor ? styles.mentorCard : ''} ${member.isLead ? styles.leadCard : ''}`}
            >
              <div className={styles.teamCatWrap}>
                <ColoredCat
                  color={member.color}
                  floatDelay={member.floatDelay}
                  bow={member.isMentor}
                />
              </div>
              <Text tag="h3" bold className={styles.teamName}>
                {t(`about.team.${member.key}.name`)}
              </Text>
              <Text tag="p" uppercase className={styles.teamRole}>
                {member.isMentor
                  ? t('about.team.mentor')
                  : member.isLead
                    ? t('about.team.teamLead')
                    : t('about.team.developer')}
              </Text>
              <Text tag="p" muted className={styles.teamDesc}>
                {t(`about.team.${member.key}.desc`)}
              </Text>
              <span className={styles.githubLink}>GitHub →</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.orgSection}>
        <Text tag="h2" className={styles.sectionTitle}>
          {t('about.org.title')}
        </Text>
        <Text tag="p" muted className={styles.orgDesc}>
          {t('about.org.desc')}
        </Text>
        <a
          href="https://github.com/rollingscopes"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.orgLink}
        >
          @rollingscopes
        </a>
      </section>

      <section className={styles.ctaSection}>
        <Text tag="h2" className={styles.ctaTitle}>
          {t('about.cta.title')}
        </Text>
        <Button variant="primary" size="large" onClick={() => navigate(routes.main.create())}>
          {t('about.cta.button')}
        </Button>
      </section>
    </div>
  );
};

export default About;
