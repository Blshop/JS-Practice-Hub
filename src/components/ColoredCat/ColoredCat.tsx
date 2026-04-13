import React, { useEffect, useRef } from 'react';
import styles from './ColoredCat.module.css';

export type CatColorScheme = 'blue' | 'orange' | 'purple' | 'green' | 'pink';

interface ColoredCatProps {
  color?: CatColorScheme;
  floatDelay?: number;
  bow?: boolean;
}

const SCHEMES: Record<
  CatColorScheme,
  {
    head: string;
    headBorder: string;
    ear: string;
    earBorder: string;
    facePlate: string;
    facePlateBorder: string;
    eyeBorder: string;
    nose: string;
    mouth: string;
    whisker: string;
    antenna: string;
    antennaTip: string;
    antennaTipGlow: string;
    earInner: string;
  }
> = {
  blue: {
    head: 'linear-gradient(160deg, #b0c4de 0%, #8aaac8 100%)',
    headBorder: '#6a8faf',
    ear: 'linear-gradient(160deg, #b0c4de 0%, #8aaac8 100%)',
    earBorder: '#6a8faf',
    facePlate: '#d6e8f5',
    facePlateBorder: '#9ab8d0',
    eyeBorder: '#4a7fa0',
    nose: '#4a7fa0',
    mouth: '#2e5f80',
    whisker: '#6a8faf',
    antenna: '#6a8faf',
    antennaTip: '#4fc3f7',
    antennaTipGlow: 'rgba(79,195,247,0.7)',
    earInner: '#e8a0b0',
  },
  orange: {
    head: 'linear-gradient(160deg, #f5c98a 0%, #e8a84a 100%)',
    headBorder: '#c47f20',
    ear: 'linear-gradient(160deg, #f5c98a 0%, #e8a84a 100%)',
    earBorder: '#c47f20',
    facePlate: '#fde8c0',
    facePlateBorder: '#d4a050',
    eyeBorder: '#8b5e10',
    nose: '#8b5e10',
    mouth: '#6b3e08',
    whisker: '#c47f20',
    antenna: '#c47f20',
    antennaTip: '#ff9800',
    antennaTipGlow: 'rgba(255,152,0,0.7)',
    earInner: '#f48fb1',
  },
  purple: {
    head: 'linear-gradient(160deg, #d4b8e8 0%, #b090d0 100%)',
    headBorder: '#8060a8',
    ear: 'linear-gradient(160deg, #d4b8e8 0%, #b090d0 100%)',
    earBorder: '#8060a8',
    facePlate: '#ecddf5',
    facePlateBorder: '#b090d0',
    eyeBorder: '#5a3080',
    nose: '#5a3080',
    mouth: '#3d1a60',
    whisker: '#8060a8',
    antenna: '#8060a8',
    antennaTip: '#ce93d8',
    antennaTipGlow: 'rgba(206,147,216,0.7)',
    earInner: '#f8bbd0',
  },
  green: {
    head: 'linear-gradient(160deg, #a8d8b0 0%, #70b880 100%)',
    headBorder: '#3a8050',
    ear: 'linear-gradient(160deg, #a8d8b0 0%, #70b880 100%)',
    earBorder: '#3a8050',
    facePlate: '#d0f0d8',
    facePlateBorder: '#70b880',
    eyeBorder: '#1a5030',
    nose: '#1a5030',
    mouth: '#0d3020',
    whisker: '#3a8050',
    antenna: '#3a8050',
    antennaTip: '#66bb6a',
    antennaTipGlow: 'rgba(102,187,106,0.7)',
    earInner: '#f48fb1',
  },
  pink: {
    head: 'linear-gradient(160deg, #f8bbd0 0%, #f48fb1 100%)',
    headBorder: '#c2185b',
    ear: 'linear-gradient(160deg, #f8bbd0 0%, #f48fb1 100%)',
    earBorder: '#c2185b',
    facePlate: '#fce4ec',
    facePlateBorder: '#f48fb1',
    eyeBorder: '#880e4f',
    nose: '#880e4f',
    mouth: '#560027',
    whisker: '#c2185b',
    antenna: '#c2185b',
    antennaTip: '#f06292',
    antennaTipGlow: 'rgba(240,98,146,0.7)',
    earInner: '#ffe0b2',
  },
};

const ColoredCat: React.FC<ColoredCatProps> = ({ color = 'blue', floatDelay = 0, bow = false }) => {
  const s = SCHEMES[color];
  const eyeLeftRef = useRef<HTMLDivElement>(null);
  const eyeRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const blink = (el: HTMLDivElement) => {
      el.style.transition = 'transform 70ms ease-in';
      el.style.transform = 'scaleY(0.07)';
    };
    const open = (el: HTMLDivElement) => {
      el.style.transition = 'transform 100ms ease-out';
      el.style.transform = 'scaleY(1)';
    };

    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 4500;
      timeoutId = setTimeout(() => {
        const l = eyeLeftRef.current;
        const r = eyeRightRef.current;
        if (l && r) {
          blink(l);
          blink(r);
          setTimeout(() => {
            open(l);
            open(r);
          }, 100);
        }
        scheduleBlink();
      }, delay);
    };

    const initDelay = Math.random() * 3000;
    timeoutId = setTimeout(scheduleBlink, initDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.cat} aria-hidden="true" style={{ animationDelay: `${floatDelay}s` }}>
      <div
        className={styles.head}
        style={{
          background: s.head,
          border: `2px solid ${s.headBorder}`,
        }}
      >
        <div className={styles.antenna} style={{ background: s.antenna }}>
          <div
            className={styles.antennaTip}
            style={{
              background: s.antennaTip,
              boxShadow: `0 0 6px 2px ${s.antennaTipGlow}`,
            }}
          />
        </div>

        <div
          className={`${styles.ear} ${styles.earLeft}`}
          style={{ background: s.ear, border: `2px solid ${s.earBorder}` }}
        >
          <div className={styles.earInner} style={{ background: s.earInner }} />
        </div>
        <div
          className={`${styles.ear} ${styles.earRight}`}
          style={{ background: s.ear, border: `2px solid ${s.earBorder}` }}
        >
          <div className={styles.earInner} style={{ background: s.earInner }} />
        </div>

        {bow && (
          <div className={styles.bow}>
            <svg viewBox="0 0 36 20" width="36" height="20" overflow="visible">
              <ellipse
                cx="8"
                cy="10"
                rx="8"
                ry="5"
                fill="#ff80ab"
                stroke="#c2185b"
                strokeWidth="1.2"
                transform="rotate(-15 8 10)"
              />
              <ellipse
                cx="28"
                cy="10"
                rx="8"
                ry="5"
                fill="#ff80ab"
                stroke="#c2185b"
                strokeWidth="1.2"
                transform="rotate(15 28 10)"
              />
              <circle cx="18" cy="10" r="4" fill="#f48fb1" stroke="#c2185b" strokeWidth="1.2" />
              <circle cx="18" cy="10" r="2" fill="#ff4081" />
              <circle cx="16" cy="8" r="1" fill="rgba(255,255,255,0.6)" />
            </svg>
          </div>
        )}

        <div
          className={styles.facePlate}
          style={{
            background: s.facePlate,
            border: `1.5px solid ${s.facePlateBorder}`,
          }}
        >
          <div className={styles.eyes}>
            <div
              ref={eyeLeftRef}
              className={styles.eye}
              style={{ boxShadow: `0 0 0 2px ${s.eyeBorder}` }}
            >
              <svg viewBox="0 0 12 12" width="12" height="12" overflow="visible">
                <circle cx="6" cy="6" r="5" fill={s.eyeBorder} />
                <circle cx="4" cy="4" r="2" fill="rgba(255,255,255,0.75)" />
              </svg>
            </div>
            <div
              ref={eyeRightRef}
              className={styles.eye}
              style={{ boxShadow: `0 0 0 2px ${s.eyeBorder}` }}
            >
              <svg viewBox="0 0 12 12" width="12" height="12" overflow="visible">
                <circle cx="6" cy="6" r="5" fill={s.eyeBorder} />
                <circle cx="4" cy="4" r="2" fill="rgba(255,255,255,0.75)" />
              </svg>
            </div>
          </div>

          <div className={styles.nose} style={{ background: s.nose }} />

          <div className={styles.mouth}>
            <svg viewBox="0 0 28 20" width="28" height="20" overflow="visible">
              <path
                fill="none"
                stroke={s.mouth}
                strokeWidth="2.5"
                strokeLinecap="round"
                d="M 2 7 Q 14 5 26 7"
              />
              <path
                fill="none"
                stroke={s.mouth}
                strokeWidth="2.5"
                strokeLinecap="round"
                d="M 2 9 Q 14 11 26 9"
              />
            </svg>
          </div>

          <div className={`${styles.cheek} ${styles.cheekLeft}`} />
          <div className={`${styles.cheek} ${styles.cheekRight}`} />
        </div>

        <div className={styles.whiskers}>
          <div className={styles.whiskerLine} style={{ background: s.whisker }} />
          <div className={styles.whiskerLine} style={{ background: s.whisker }} />
          <div className={styles.whiskerLine} style={{ background: s.whisker }} />
          <div className={styles.whiskerLine} style={{ background: s.whisker }} />
        </div>
      </div>
    </div>
  );
};

export default ColoredCat;
