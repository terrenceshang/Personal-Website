import { header } from '../components/contentContainer';
import '../primaryStyling.css';
import styles from './interestingProjects.module.css';

const projectList = () => {
  return (
    <div>
      <div>Hello world</div>
    </div>
  );
};

export const InterestingProjects = () => {
  return (
    <div className="contentWrapper">
      {header('INTERESTING PROJECTS')}
      {projectList()}
    </div>
  );
};
