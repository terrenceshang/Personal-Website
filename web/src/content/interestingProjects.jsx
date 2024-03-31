import { header } from '../components/contentContainer';
import '../primaryStyling.css';
import styles from './interestingProjects.module.css';
import { contentContainer } from '../components/contentContainer';
import { interestingProject } from '../utils/utils';

export const InterestingProjects = () => {
  const interestingProjectsList = Object.entries(interestingProject).map(([key, project]) => {
    return contentContainer(project, key);
  });
  return (
    <div className="contentWrapper">
      {header('INTERESTING PROJECTS')}
      <div className={styles.interestingProjectContainer}>{interestingProjectsList}</div>
    </div>
  );
};
