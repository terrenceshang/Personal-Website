import { header } from '../components/contentContainer';
import '../primaryStyling.css';
import styles from './myExpertise.module.css';
import { contentContainer } from '../components/contentContainer';
import { expertise } from '../utils/utils';

const { softwareDevelopment, webDevelopment, gameDevelopment, agileWorkingEnvironment } = expertise;

const ExpertiseList = () => {
  return <div>Hello World</div>;
};

export const MyExpertise = () => {
  return (
    <div className="contentWrapper">
      {header('My Expertise')}
      <ExpertiseList />
    </div>
  );
};
