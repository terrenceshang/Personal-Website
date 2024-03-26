import { contactInfoUtils } from '../utils/utils';
import styles from './contactInfo.module.css';
const { zeroToOneQuote, zeroToOneReference } = contactInfoUtils;

export const ContactInfo = () => {
  return (
    <div className={styles.centerContainer}>
      <div className={styles.contactInfoContainer}>
        <div className={styles.quote}>{zeroToOneQuote}</div>
        <div className={styles.reference}>{zeroToOneReference}</div>
      </div>
    </div>
  );
};
