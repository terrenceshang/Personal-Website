import styles from './greeting.module.css';

const greetingHeader = "Hey, I'm";
const nameHeader = 'ZENAN SHANG';

export const Greeting = () => {
  return (
    <div className={styles.centreView}>
      <div className={styles.greetingHeader}>{greetingHeader}</div>
      <div className={styles.nameHeader}>{nameHeader}</div>
    </div>
  );
};
