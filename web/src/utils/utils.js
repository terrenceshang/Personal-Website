// Work Experience
import syftAnalyticsLogo from '../assets/SyftAnalyticsLogo.jpg';
import moharaLogo from '../assets/MoharaLogo.jpg';
import uctLogo from '../assets/uctLogo.jpg';
import gitHubLogo from '../assets/GitHubLogo.png';
import linkedInLogo from '../assets/LinkedInLogo.png';
import whatsAppLogo from '../assets/WhatsAppLogo.png';

// Expertise
import problemSolvingLogo from '../assets/ProblemSolvingLogo.jpg';
import agileDevelopmentLogo from '../assets/AgileDevelopmentLogo.jpg';
import gameDevelopmentLogo from '../assets/GameDevelopmentLogo.png';
import softwareEngineerLogo from '../assets/SoftwareEngineerLogo.jpg';
import cv from '../assets/CV.pdf';

export const workExperience = {
  syftAnalytics: {
    image: syftAnalyticsLogo,
    name: 'Syft Analytics',
    title: 'Software Engineer',
    time: 'Jan 2024 - March 2024',
    description: `I was responsible for multiple parts of the Syft Analytics code including the backend permissions to reports, integrating the database to show reports, building new upgrade pages for reports, and styling/bug fixes for the website. My efforts in building new features and optimizing syft directly contributed to an increase to overall number of paid users for the software`,
    location: 'Bryanston, Gauteng, South Africa',
    type: 'Contract)',
    skills: 'React, Javascript, Typescript, CSS, Postgres',
  },

  moharaVentureSA: {
    image: moharaLogo,
    name: 'MOHARA Venture SA',
    title: 'Software Engineer Intern',
    time: 'Jun 2023 - Jul 2023',
    description: `During my Software Engineering Internship, I have learnt many essential skills that is beneficial for my future career. I honored my coding skills in Flutter and Dart, learnt effective version control with Git, and explored various API designs like SoccerAPI and GraphQL. My exposure to Agile Methodology highlighted the important of adaptability in a fast-paced development environment. This valuable experience has equipped me to contribute more effectively in any software development projects.`,
    location: 'Waterfront, Cape Town, South Africa',
    type: 'Contract',
    skills: 'Flutter, Dart, Integration, Git',
  },

  uctTutor: {
    image: uctLogo,
    name: 'University of Cape Town',
    title: 'Tutor',
    time: 'Jan 2021- Nov 2023',
    description: `This is my first official job. I was responsible for multiple courses including computer science, information systems, finance, and tax. The role includes tutoring and preparing tests and exams for the students, maintaining the students' overall well-being, and monitoring the students' performance.`,
    location: 'Cape Town, South Africa',
    type: 'Contract',
    skills: 'Python, Java, Algorithms',
  },
};

export const contactInfoUtils = {
  zeroToOneQuote: "EVERY ONE OF TODAY'S most famous and familiar ideas was once unknown and unsuspected",
  zeroToOneReference: 'Zero to One (Peter Thiel)',
  gitHubURL: 'https://github.com/terrenceshang',
  linkedInURL: 'https://www.linkedin.com/in/zenan-shang-b99ab0237/',
  phoneNumber: '+27 65 939 7280',
  email: 'zenanshang2@gmail.com',
  whatsappLogo: whatsAppLogo,
  gitHubLogo: gitHubLogo,
  linkedInLogo: linkedInLogo,
};

export const whoAmI = {
  subHeaderLine: `Bridging Technology and Creativity: From Code to Keyboards`,
  descriptionLine1: `Hi, I am Zenan, a recently graduated from the University of Cape Town with a Bachelor's in Business Science Specializing in Computer Science. My passion for software engineering has led me to diverse experiences in both frontend and backend development, contributing to projects across various platforms and organizations. I look forward to challenges and collaboration, and I bring forth a positive and dedicated attitude to every task I am working on`,
  descriptionLine2: `I have accomplished multiple awards/accomplishments in and outside of the work/school environment: These include coming second place in SDG Challenge SA, honorary mention in Prescient Coding Challenge, ABRSM grade 2 piano with distinction, and performed in 2 concerts in retirement homes.`,
  descriptionLine3: `My interests and hobbies involve technology, business, reading books, game development, cardio, and piano.`,
  cv: cv,
};

export const expertise = {
  problemSolving: {
    title: 'Finding Algorithmic Solutions',
    description: 'I have been programming since 2017, tech stack includes Python, Java, SQL, C#, Delphi',
    image: problemSolvingLogo,
  },
  softwareDevelopment: {
    title: 'Website/App Development',
    description:
      'Contributed and development many website and mobile applications, tech stack include: HTML, React, Javascript, Typescript, Flutter, Dart',
    image: softwareEngineerLogo,
  },
  gameDevelopment: {
    title: 'Game Development',
    description:
      'I have built multiple games of my own, including terminal-based, 2D, 3D computer and VR games. I find deep satisfaction in developing games as a side project',
    image: gameDevelopmentLogo,
  },
  agileWorkingEnvironment: {
    title: 'Agile Working Environment',
    description:
      'I work more effectively in a collaborative and adaptive work environments, where team embraces open communication, flexibility and iterative methodologies',
    image: agileDevelopmentLogo,
  },
};

export const interestingProject = {
  vrAwe: {
    name: 'VRAwe',
    time: 'Duration: 10 months',
    description:
      'This was my final year project during my studies at UCT, I received a model and needed to create a virtual environment to study the relationship between awe and VR by immersing users in it. For this project, I touched both Blender and Unity. Blender for modeling and Unity for virtual reality. The outcome of this project was very successful, and the reports are public and can be viewed by anyone when visiting the UCT Computer Science Honor Projects website',
    link: `https://github.com/terrenceshang/VRAwe`,
    skills: 'Unity, Blender, C#, 3D Modeling',
  },
  PTJP: {
    name: 'Public Transport Journey Planner',
    time: 'Duration: 3 months',
    description:
      'This is a project involves in developing a website to getting best possible route for users to take from point A to B. This project involved, DB integration, finding shortest path, normalization, software engineering. I was responsible for 90% of the backend of this project.',
    link: 'https://github.com/terrenceshang/CS-Capestone-Project',
    skills: 'Python, tensorflow, Software Engineering, Dijkstra Algorithm',
  },
  dataSciencePrediction: {
    name: 'Top data science jobs prediction',
    time: 'Duration: 1 month',
    description:
      'A neural network-based AI system aims to predict the highest job title of an individual. A linear regression model was used as a baseline, thereafter a feedforward neural network used. I was responsible of building both models and tuning the hyperparameter.',
    link: 'https://github.com/terrenceshang/Top-data-science-jobs-prediction',
    skills: 'Jupyter Notebook, Tensorflow, Neural Network, Data Analyst',
  },
  JamSlam: {
    name: 'Jam Slam',
    time: 'Duration: 1 months',
    description:
      'A 2d adventurous puzzle game made for players to play collaboratively with each other. 90% of the game are made from scratch from the drawing to animation. This was made with inspiration from Fireboy & Watergirl game',
    link: 'https://github.com/terrenceshang/Jam-Slam',
    skills: 'Unity, Piskel, C#, 2D Animation',
  },
  vrCamp: {
    name: 'VRCamp',
    time: 'Duration: 1 months',
    description:
      'A VR game made to simulate the process of drilling wood to make fire in the wild. I was involved in designing and implementing the environment, vr movement, fire interaction and other field in the project',
    link: 'https://github.com/terrenceshang/VRCamp',
    skills: 'Unity, C#',
  },
};

export const educations = {
  bachelors: {
    name: 'University of Cape Town',
    title: 'Bachelor of Business Science Specializes in Computer Science',
    image: uctLogo,
    time: 'January 2020 - March 2024',
    description:
      'During my study, I was exposed to multiple fields of computer science including software engineering, game development, AI, VR, Networking, databases, and more. For my final year project, I focused on understanding the awe response in VR through different triggers. And for my third year, I developed a website for the metro system in Cape Town. There are many other cool projects I made such as games, a communication app similar to WhatsApp, AI models, openGL, Blender, and more. ',
    skills: 'Python, Java, AI, VR, Networks, Database, Operating System, Game Design, Software Engineering',
  },
};
