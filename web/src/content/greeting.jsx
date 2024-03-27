import styles from './greeting.module.css';
import greetingImg from '../assets/LandscapeGraduation.jpg';

const greetingHeader = "Hey, I'm";
const nameHeader = 'ZENAN SHANG';

export const Greeting = () => {
  const backgroundStyle = {
    backgroundImage: `url(${greetingImg})`,
  };

  return (
    <div className={styles.centreView} style={backgroundStyle}>
      <div className={styles.greetingHeader}>{greetingHeader}</div>
      <div className={styles.nameHeader}>{nameHeader}</div>
    </div>
  );
};
