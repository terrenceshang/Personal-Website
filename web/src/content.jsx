import { Greeting } from './content/greeting';
import { MyJourney } from './content/myJourney';
import { ContactInfo } from './content/contactInfo';
import { WhoAmI } from './content/whoAmI';
import { MyExpertise } from './content/myExpertise';

export default function Content() {
  return (
    <div>
      <Greeting />
      <WhoAmI />
      <MyJourney />
      <MyExpertise />
      <ContactInfo />
    </div>
  );
}
