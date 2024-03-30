import { header, subHeader } from '../components/contentContainer';
import '../primaryStyling.css';
import { whoAmI } from '../utils/utils';
import styles from './whoAmI.module.css';
const { subHeaderLine, descriptionLine1 } = whoAmI;

const Description = () => {
  return <div className={styles.descriptionLine}>{descriptionLine1}</div>;
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
