import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from './Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

// Styles
const styles = {
  sectionContentContainer: {
    padding: '20px',
  },
  chronoCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align content at the top
  },
  chronoCardLeft: {
    flex: 1,
    paddingRight: '20px',
    textAlign: 'left', // Align content to the left
  },
  chronoCardRight: {
    flex: 3,
    paddingLeft: '20px',
    textAlign: 'left', // Align content to the left
  },
  experienceHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  experienceHeaderTitle: {
    fontSize: '1.5em',
    margin: 0,
    textAlign: 'left', // Align title to the left
  },
  experienceUrlButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  experienceUrlButtonImage: {
    maxWidth: '50%', // Ensure image fits within the container
    maxHeight: '50%', // Ensure image fits within the container
    objectFit: 'contain', // Maintain the aspect ratio
  },
  experienceContentWorkType: {
    fontSize: '1.2em',
    marginTop: '10px',
    textAlign: 'left', // Align work type to the left
  },
  experienceContentUl: {
    marginTop: '10px',
    paddingLeft: '20px',
    textAlign: 'left', // Align list to the left
  },
  experienceContentLi: {
    marginBottom: '5px',
    textAlign: 'left', // Align list items to the left
  },
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .then(() => setFadeIn(true))
      .catch((err) => err);
  }, []);

  const renderExperienceContent = (experience) => (
    <div className="experience-content">
      <div style={styles.experienceHeader}>
        <h3 style={styles.experienceHeaderTitle}>{experience.position}</h3>
        <a href={experience.url} target="_blank" rel="noopener noreferrer">
          <button type="button" style={styles.experienceUrlButton}>
            <img
              src={experience.imageUrl}
              alt={experience.subtitle}
              style={styles.experienceUrlButtonImage}
            />
          </button>
        </a>
      </div>
      <h4 style={styles.experienceContentWorkType}>
        <span style={{ fontWeight: 'bold' }}>
          <a href={experience.url} target="_blank" rel="noopener noreferrer">
            {experience.subtitle}
          </a>
          &nbsp;&middot;&nbsp;
        </span>
        {experience.workType}
      </h4>
      <ul style={styles.experienceContentUl}>
        {experience.workDescription.map((desc) => (
          <li key={desc} style={styles.experienceContentLi}>
            {desc}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade in={fadeIn}>
          <div style={styles.sectionContentContainer}>
            <Container>
              <Chrono
                hideControls
                allowDynamicUpdate
                useReadMore={false}
                items={data}
                mode="VERTICAL"
                theme={{
                  primary: theme.accentColor,
                  secondary: theme.accentColor,
                  cardBgColor: theme.chronoTheme.cardBgColor,
                  cardForeColor: theme.chronoTheme.cardForeColor,
                  titleColor: theme.titleColor,
                }}
                cardHeight={200}
              >
                {data.map((experience) => (
                  <div key={experience.dateText} style={styles.chronoCard}>
                    <div style={styles.chronoCardRight}>
                      {renderExperienceContent(experience)}
                    </div>
                  </div>
                ))}
              </Chrono>
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
