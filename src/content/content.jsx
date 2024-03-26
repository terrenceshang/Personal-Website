import styles from './content.module.css';
import { Greeting } from './greeting';
import { MyJourney } from './myJourney';

export default function Content() {
  return (
    <div>
      <Greeting />
      <MyJourney />
    </div>
  );
}
