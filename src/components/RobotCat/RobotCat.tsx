import React from 'react';
import styles from './RobotCat.module.css';

export type RobotCatMood = 'idle' | 'talking' | 'happy' | 'sad';

interface RobotCatProps {
  mood?: RobotCatMood;
}

/* Upper lip path per mood (stays mostly fixed) */
const UPPER_LIP: Record<RobotCatMood, string> = {
  idle: 'M 2 7 Q 14 5 26 7',
  talking: 'M 2 5 Q 14 3 26 5',
  happy: 'M 2 6 Q 14 4 26 6',
  sad: 'M 2 8 Q 14 6 26 8',
};

/* Lower lip path per mood — moves down when talking */
const LOWER_LIP: Record<RobotCatMood, string> = {
  idle: 'M 2 9  Q 14 11 26 9',
  talking: 'M 3 13 Q 14 17 25 13', // wide open
  happy: 'M 2 12 Q 14 16 26 12', // big smile lower
  sad: 'M 2 7  Q 14 3  26 7', // frown lower
};

/* Eye shapes: normal circle vs happy squint vs sad droopy */
const EyeNormal = () => (
  <>
    <circle cx="6" cy="6" r="5" fill="#1a2a3a" />
    <circle cx="4" cy="4" r="2" fill="rgba(255,255,255,0.75)" />
  </>
);

const EyeHappy = () => (
  /* squint — arc */
  <path d="M 1 7 Q 6 1 11 7" fill="none" stroke="#1a2a3a" strokeWidth="2.5" strokeLinecap="round" />
);

const EyeSad = () => (
  /* droopy — tilted oval */
  <>
    <ellipse cx="6" cy="6" rx="4" ry="5" fill="#1a2a3a" transform="rotate(-15 6 6)" />
    <circle cx="4" cy="4" r="1.5" fill="rgba(255,255,255,0.6)" />
  </>
);

const EyeTalking = () => (
  /* slightly wide */
  <>
    <circle cx="6" cy="6" r="5.5" fill="#1a2a3a" />
    <circle cx="3.5" cy="3.5" r="2" fill="rgba(255,255,255,0.8)" />
  </>
);

const Eye: React.FC<{ mood: RobotCatMood }> = ({ mood }) => (
  <svg viewBox="0 0 12 12" width="12" height="12" overflow="visible" className={styles.eyeSvg}>
    {mood === 'happy' && <EyeHappy />}
    {mood === 'sad' && <EyeSad />}
    {mood === 'talking' && <EyeTalking />}
    {mood === 'idle' && <EyeNormal />}
  </svg>
);

const RobotCat: React.FC<RobotCatProps> = ({ mood = 'idle' }) => (
  <div className={`${styles.robotCat} ${styles[mood] ?? ''}`} aria-hidden="true">
    <div className={styles.head}>
      {/* Antenna */}
      <div className={styles.antenna}>
        <div className={styles.antennaTip} />
      </div>

      {/* Ears */}
      <div className={`${styles.ear} ${styles.earLeft}`}>
        <div className={styles.earInner} />
      </div>
      <div className={`${styles.ear} ${styles.earRight}`}>
        <div className={styles.earInner} />
      </div>

      {/* Face plate */}
      <div className={styles.facePlate}>
        {/* Eyes */}
        <div className={styles.eyes}>
          <div className={`${styles.eye} ${styles[`eye_${mood}`] ?? ''}`}>
            <Eye mood={mood} />
          </div>
          <div className={`${styles.eye} ${styles[`eye_${mood}`] ?? ''}`}>
            <Eye mood={mood} />
          </div>
        </div>

        {/* Nose */}
        <div className={styles.nose} />

        {/* Mouth — two-lip SVG */}
        <div className={styles.mouth}>
          <svg
            viewBox="0 0 28 20"
            width="28"
            height="20"
            overflow="visible"
            className={styles.mouthSvg}
          >
            {/* mouth fill between lips when talking/happy */}
            {(mood === 'talking' || mood === 'happy') && (
              <path
                className={styles.mouthFill}
                d={`${UPPER_LIP[mood]} L 26 ${mood === 'happy' ? '12' : '13'} Q 14 ${mood === 'happy' ? '17' : '18'} 2 ${mood === 'happy' ? '12' : '13'} Z`}
              />
            )}
            {/* upper lip */}
            <path className={`${styles.mouthPath} ${styles.upperLip}`} d={UPPER_LIP[mood]} />
            {/* lower lip */}
            <path
              className={`${styles.mouthPath} ${styles.lowerLip} ${mood === 'talking' ? styles.lowerLipTalking : ''}`}
              d={LOWER_LIP[mood]}
            />
          </svg>
        </div>

        {/* Cheeks */}
        <div className={`${styles.cheek} ${styles.cheekLeft}`} />
        <div className={`${styles.cheek} ${styles.cheekRight}`} />
      </div>

      {/* Whiskers */}
      <div className={styles.whiskers}>
        <div className={styles.whiskerLine} />
        <div className={styles.whiskerLine} />
        <div className={styles.whiskerLine} />
        <div className={styles.whiskerLine} />
      </div>

      {/* Happy sparkles */}
      {mood === 'happy' && (
        <div className={styles.sparkles}>
          <span className={`${styles.sparkle} ${styles.s1}`}>✦</span>
          <span className={`${styles.sparkle} ${styles.s2}`}>✦</span>
          <span className={`${styles.sparkle} ${styles.s3}`}>✦</span>
        </div>
      )}

      {/* Sad tears */}
      {mood === 'sad' && (
        <div className={styles.tears}>
          <div className={`${styles.tear} ${styles.tearLeft}`} />
          <div className={`${styles.tear} ${styles.tearRight}`} />
        </div>
      )}
    </div>
  </div>
);

export default RobotCat;
