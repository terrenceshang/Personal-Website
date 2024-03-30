import styles from './contentContainer.module.css';

export function header(header) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <span className={styles.line}></span>
        <span>{header}</span>
        <span className={styles.line}></span>
      </div>
    </header>
  );
}

export function subHeader(subHeader) {
  return (
    <header className={styles.subHeader}>
      <div className={styles.subHeaderContent}>
        <span>{subHeader}</span>
      </div>
    </header>
  );
}

export function contentContainer(input, key) {
  const { image, name, title, time, description, location, type } = input;
  return (
    <div className={styles.contentContainer} key={key}>
      <img src={image} alt="Company Logo" className={styles.image} />

      <div className={styles.textContainer}>
        {name && <h3 className={styles.name}>{name}</h3>}
        {title && <p className={styles.title}>{title}</p>}
        {time && <p className={styles.time}>{time}</p>}
        {location && (
          <p className={styles.locationTime}>
            {location} ({type})
          </p>
        )}
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}
