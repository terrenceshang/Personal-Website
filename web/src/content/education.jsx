import { header } from '../components/contentContainer';
import { contentContainer } from '../components/contentContainer';
import { educations } from '../utils/utils';
import '../primaryStyling.css';

export const Education = () => {
  const educationList = Object.values(educations).map(education => {
    const key = `${education.title}`;
    return contentContainer(education, key);
  });
  return (
    <div className="contentWrapper">
      {header('EDUCATION')}
      {educationList}
    </div>
  );
};
