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
}

const UserCard: React.FC<UserCardProps> = ({
  username,
  email,
  earnedXP,
  totalXP,
  completedLessons,
  totalLessons,
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
        </div>
      </div>
    </div>
  );
};

export default UserCard;
