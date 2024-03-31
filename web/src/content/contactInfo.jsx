import { contactInfoUtils } from '../utils/utils';
import styles from './contactInfo.module.css';
import '../primaryStyling.css';
import { Button, FormGroup, InputGroup, TextArea, Icon, Intent } from '@blueprintjs/core';
import { header, subHeader } from '../components/contentContainer';
import syftProfileImage from '../assets/SyftProfile2.jpg';
import { IconNames, IconSize } from '@blueprintjs/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { localConfig } from '../configs';
import React, { useState } from 'react';
import classNames from 'classnames';

const { zeroToOneQuote, zeroToOneReference, gitHubURL, linkedInURL, phoneNumber, gitHubLogo, linkedInLogo } =
  contactInfoUtils;

const profileIcon = <Icon icon={IconNames.USER} size={12} className={styles.icon} />;
const emailIcon = <Icon icon={IconNames.ENVELOPE} size={12} className={styles.icon} />;
const phoneIcon = <Icon icon={IconNames.PHONE} size={12} className={styles.icon} />;

const ContactMeForm = () => {
  const [fullNameValid, setFullNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [messageValid, setMessageValid] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    setFullNameValid(!!data.fullName);
    setEmailValid(!!data.email);
    setPhoneValid(!!data.phone);
    setMessageValid(!!data.message);

    const isFormValid = data.fullName && data.email && data.phone && data.message;

    if (!isFormValid) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(`${localConfig.API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Email sent successfully');
      } else {
        toast.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Error sending email');
    }
  };

  const adjustTextAreaHeight = textAreaElement => {
    const formContainer = document.querySelector(`.${styles.formContainer}`);

    if (!formContainer) {
      console.error('Form container not found');
      return;
    }

    const maxHeight = formContainer.offsetHeight * 0.3;
    textAreaElement.style.height = 'auto';
    textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
    textAreaElement.style.maxHeight = `${maxHeight}px`;
  };

  return (
    <div className={classNames(styles.contactMeForm, styles.contactMeTheme)}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Full name"
            labelFor="text"
            className={styles.formGroup}
            labelInfo={!fullNameValid && <span className={styles.requiredText}>*required</span>}
          >
            <div className={styles.inputBox}>
              <InputGroup
                name="fullName"
                id="text"
                placeholder="Jane Doe"
                type="text"
                leftIcon={profileIcon}
                className={styles.inputGroup}
              />
            </div>
          </FormGroup>

          <FormGroup
            label="Email"
            labelFor="email"
            className={styles.formGroup}
            labelInfo={!emailValid && <span className={styles.requiredText}>*required</span>}
          >
            <div className={styles.inputBox}>
              <InputGroup
                name="email"
                id="email"
                placeholder="example@domain.com"
                type="email"
                leftIcon={emailIcon}
                className={styles.inputGroup}
              />
            </div>
          </FormGroup>

          <FormGroup
            label="Mobile Number"
            labelFor="phone"
            className={styles.formGroup}
            labelInfo={!phoneValid && <span className={styles.requiredText}>*required</span>}
          >
            <div className={styles.inputBox}>
              <InputGroup
                name="phone"
                id="phone"
                placeholder="+1 (555) 123-4567"
                type="tel"
                leftIcon={phoneIcon}
                className={styles.inputGroup}
              />
            </div>
          </FormGroup>

          <FormGroup
            label="Message"
            labelFor="message-textarea"
            className={styles.formGroup}
            labelInfo={!messageValid && <span className={styles.requiredText}>*required</span>}
          >
            <div className={styles.inputBox}>
              <TextArea
                name="message"
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
        <>{phoneNumber}</>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  );
};

const ContactMeIcons = () => {
  return (
    <>
      <span className={classNames(styles.moreLinks, styles.centerContainer)}>
        you can also find more info about me here:
      </span>
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
  return (
    <div className={classNames('contentWrapper', styles.backgroundTheme)}>
      {header('CONTACT ME')}
      {subHeader('I am available for freelance work.')}
      <ContactMeForm />
      <ContactMeIcons />
    </div>
  );
};
