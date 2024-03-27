import { contactInfoUtils } from '../utils/utils';
import styles from './contactInfo.module.css';
import { useState } from 'react';
import { Button, FormGroup, InputGroup, TextArea, Icon, Intent } from '@blueprintjs/core';
import { header } from './content';
import whatsappLogo from '../assets/WhatsAppLogoRound.jpg';
import syftProfileImage from '../assets/SyftProfile2.jpg';
import { IconNames, IconSize } from '@blueprintjs/icons';

const { zeroToOneQuote, zeroToOneReference, gitHubURL, linkedInURL, phoneNumber, email, gitHubLogo, linkedInLogo } =
  contactInfoUtils;

const profileIcon = <Icon icon={IconNames.USER} size={12} className={styles.icon} />;
const emailIcon = <Icon icon={IconNames.ENVELOPE} size={12} className={styles.icon} />;
const phoneIcon = <Icon icon={IconNames.PHONE} size={12} className={styles.icon} />;

const adjustTextAreaHeight = textAreaElement => {
  textAreaElement.style.height = 'auto';
  textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
};

const ContactMeForm = () => {
  const handleSubmit = event => {
    event.preventDefault();
    // Handle the form submission
  };

  return (
    <div className={styles.contactMeForm}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <FormGroup label="Full name" labelFor="text" className={styles.formGroup}>
            <div className={styles.inputBox}>
              <InputGroup
                id="text"
                placeholder="Jane Doe"
                type="text"
                leftIcon={profileIcon}
                className={styles.inputGroup}
              />
            </div>
          </FormGroup>

          <FormGroup label="Email" labelFor="email" className={styles.formGroup}>
            <div className={styles.inputBox}>
              <InputGroup
                id="email"
                placeholder="example@domain.com"
                type="email"
                leftIcon={emailIcon}
                className={styles.inputGroup}
              />
            </div>
          </FormGroup>

          <FormGroup label="Mobile Number" labelFor="phone" className={styles.formGroup}>
            <div className={styles.inputBox}>
              <InputGroup
                id="phone"
                placeholder="+1 (555) 123-4567"
                type="tel"
                leftIcon={phoneIcon}
                className={styles.inputGroup}
              />
            </div>
          </FormGroup>

          <FormGroup label="Message" labelFor="Message" className={styles.formGroup}>
            <div className={styles.inputBox}>
              <TextArea
                id="message-textarea"
                placeholder="Type your message here"
                fill={true}
                className={styles.textArea}
                onChange={e => adjustTextAreaHeight(e.target)}
              />
            </div>
          </FormGroup>

          <div className={styles.button}>
            <Button type="submit" text="Send Message" fill={true} className={styles.message} />
          </div>
        </form>
      </div>
      <div className={styles.infoContainer}>
        <img src={syftProfileImage} alt="Zenan Shang" className={styles.profileImage} />
        <h4 className={styles.profileName}>Zenan Shang</h4>
        <span className={styles.profileName}>Contact or WhatsApp me:</span>
        <> +27 65 939 7280</>
      </div>
    </div>
  );
};

const ContactMeIcons = () => {
  return (
    <>
      {' '}
      <div className={styles.imageContainer}>
        <a href={gitHubURL} target="_blank" rel="noopener noreferrer">
          <img src={gitHubLogo} alt="GitHub" className={styles.image} />
        </a>
        <a href={linkedInURL} target="_blank" rel="noopener noreferrer">
          <img src={linkedInLogo} alt="LinkedIn" className={styles.image} />
        </a>
      </div>
      <div className={styles.centerContainer}>
        <div className={styles.contactInfoContainer}>
          <div className={styles.quote}>{zeroToOneQuote}</div>
          <div className={styles.reference}>{zeroToOneReference}</div>
        </div>
      </div>
    </>
  );
};

export const ContactInfo = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Sending', { email, message });
    setMessage('');
    setEmail('');
  };

  return (
    <div>
      {header('CONTACT ME')}
      <ContactMeForm />
      <ContactMeIcons />
    </div>
  );
};
