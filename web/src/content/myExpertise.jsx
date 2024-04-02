import { header } from '../components/contentContainer';
import '../primaryStyling.css';
import { contentContainer } from '../components/contentContainer';
import { expertise } from '../utils/utils';

export const MyExpertise = () => {
  const ExpertiseList = Object.values(expertise).map(expertise => {
    const key = `${expertise.title}`;
    return contentContainer(expertise, key);
  });
  return (
    <div className="contentWrapper">
      {header('MY EXPERTISE')}
      {ExpertiseList}
    </div>
  );
};
