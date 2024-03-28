import styles from './myJourney.module.css';
import { workExperience } from '../utils/utils';
import { header } from './content';
import '../primaryStyling.css';

function workExperienceContainer(input, key) {
  const { image, company, title, time, description, location, type } = input;
  return (
    <div className={styles.workExperienceContainer} key={key}>
      <img src={image} alt="Company Logo" className={styles.companyImage} />

      <div className={styles.textContainer}>
        <h3 className={styles.companyName}>{company}</h3>
        <p className={styles.title}>{title}</p>
        <p className={styles.time}>{time}</p>
        <p className={styles.locationTime}>
          {location} ({type})
        </p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export const MyJourney = () => {
  const workExperienceList = Object.values(workExperience).map(experience => {
    const key = `${experience.company}-${experience.time}`;
    return workExperienceContainer(experience, key);
  });
  return (
    <div className="contentWrapper">
      {header('My Journey')}
      {workExperienceList}
    </div>
  );
};
