import { header, subHeader } from '../components/contentContainer';
import '../primaryStyling.css';
import { whoAmI } from '../utils/utils';
import styles from './whoAmI.module.css';
const { subHeaderLine, descriptionLine1, cv } = whoAmI;

const Description = () => {
  const fileName = cv.split('/').pop();
  return (
    <div>
      <div className={styles.line}>{descriptionLine1}</div>
      <div className={styles.cvLine}>
        <span className={styles.cvContainer}>
          View my CV:{' '}
          <a href={cv} target="_blank" className={styles.cv}>
            {fileName}
          </a>
        </span>
      </div>
    </div>
  );
};

export const WhoAmI = () => {
  return (
    <div className="contentWrapper">
      {header('Who am I')}
      {subHeader(subHeaderLine)}
      <Description />
    </div>
  );
};
