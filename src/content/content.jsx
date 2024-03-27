import { Greeting } from './greeting';
import { MyJourney } from './myJourney';
import { ContactInfo } from './contactInfo';
import styles from './content.module.css';

export function header(header) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <span className={styles.line}></span>
        <span>{header}</span>
        <span className={styles.line}></span>
      </div>
    </header>
  );
}

export default function Content() {
  return (
    <div>
      <Greeting />
      <MyJourney />
      <ContactInfo />
    </div>
  );
}
