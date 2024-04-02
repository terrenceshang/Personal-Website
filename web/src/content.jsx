import { Greeting } from './content/greeting';
import { MyJourney } from './content/myJourney';
import { ContactInfo } from './content/contactInfo';
import { WhoAmI } from './content/whoAmI';
import { MyExpertise } from './content/myExpertise';
import { InterestingProjects } from './content/interestingProjects';
import { Education } from './content/education';

export default function Content() {
  return (
    <div>
      <Greeting />
      <WhoAmI />
      <MyJourney />
      <Education />
      <MyExpertise />
      <InterestingProjects />
      <ContactInfo />
    </div>
  );
}
