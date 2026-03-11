import React, { useEffect } from 'react';
import styles from './Achievement.module.scss';

interface AchievementProps {
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const Achievement: React.FC<AchievementProps> = ({
  title,
  description,
  icon,
  xpReward,
  onClose,
  autoClose = true,
  autoCloseDelay = 3000,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleOverlayClick} />
      <div className={styles.achievement}>
        <button className={styles.achievement__close} onClick={onClose}>
          ×
        </button>

        <span className={styles.achievement__icon}>{icon}</span>
        <h3 className={styles.achievement__title}>{title}</h3>
        <p className={styles.achievement__description}>{description}</p>

        <div className={styles.achievement__xp}>
          <span>⚡</span>
          <span>+{xpReward} XP</span>
        </div>
      </div>
    </>
  );
};

export default Achievement;
