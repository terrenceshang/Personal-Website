import { workExperience } from '../utils/utils';
import { header } from '../components/contentContainer';
import '../primaryStyling.css';
import { contentContainer } from '../components/contentContainer';

export const MyJourney = () => {
  const workExperienceList = Object.entries(workExperience).map(([key, experience]) => {
    return contentContainer(experience, key);
  });
  return (
    <div className="contentWrapper">
      {header('My Journey')}
      {workExperienceList}
    </div>
  );
};
