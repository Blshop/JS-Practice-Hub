import React from 'react';
import Text from 'components/Text';
import Badge from 'components/Badge';
import styles from './UserCard.module.scss';

interface UserCardProps {
  username: string;
  email: string;
  earnedXP: number;
  totalXP: number;
  completedLessons: number;
  totalLessons: number;
  completedModules: number;
  totalModules: number;
}

const UserCard: React.FC<UserCardProps> = ({
  username,
  email,
  earnedXP,
  totalXP,
  completedLessons,
  totalLessons,
  completedModules,
  totalModules,
}) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.avatar}>
        <Text tag="span" className={styles.avatarText}>
          {username.charAt(0).toUpperCase()}
        </Text>
      </div>
      <div className={styles.userInfo}>
        <Text tag="h1" className={styles.username}>
          {username}
        </Text>
        <Text tag="p" muted className={styles.email}>
          {email}
        </Text>
        <div className={styles.stats}>
          <Badge variant="info" size="large">
            ⚡ {earnedXP} / {totalXP} XP
          </Badge>
          <Badge variant="secondary" size="large">
            📚 {completedLessons} / {totalLessons} lessons
          </Badge>
          <Badge variant="primary" size="large">
            📦 {completedModules} / {totalModules} modules
          </Badge>
        </div>
      </div>
    </div>
  );
};

UserCard.displayName = 'UserCard';

export default UserCard;
