import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from './Fade';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [mode, setMode] = useState('VERTICAL');

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .then(() => setFadeIn(true))
      .catch((err) => err);

    const handleResize = () => {
      if (window?.innerWidth < 576) {
        setMode('VERTICAL_ALTERNATING');
      } else {
        setMode('VERTICAL_ALTERNATING');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade in={fadeIn}>
          <div className="section-content-container" style={{ width: '100%' }}>
            <Container fluid style={{ padding: 0 }}>
              <Chrono
                hideControls
                allowDynamicUpdate
                useReadMore={false}
                timelinePointDimension={window.innerWidth < 576 ? 50 : 150}
                timelinePointShape="circle"
                items={data.education}
                mediaSettings={{ align: 'left', fit: 'contain' }}
                cardHeight={100}
                mediaHeight={100}
                itemWidth={200}
                mode={mode}
                fontSizes={{
                  cardSubtitle: '0.85rem',
                  cardText: '0.8rem',
                  cardTitle: '1rem',
                  title: '1.5rem',
                  cardDetailedText: '0.5rem',
                }}
                enableBreakPoint
                verticalBreakPoint={400}
                theme={{
                  primary: theme.accentColor,
                  secondary: theme.accentColor,
                  cardBgColor: theme.chronoTheme.cardBgColor,
                  cardForeColor: theme.chronoTheme.cardForeColor,
                  titleColor: theme.titleColor,
                }}
                style={{ width: '100%', textAlign: 'left', marginLeft: 0 }} // Ensure it takes full width
              >
                <div className="chrono-icons" style={{ justifyContent: 'flex-start' }}>
                  {data.education.map((education) => (
                    education.icon ? (
                      <img
                        key={education.icon.src}
                        src={education.icon.src}
                        alt={education.icon.alt}
                        style={{ width: window.innerWidth < 576 ? '80px' : '150px', height: window.innerWidth < 576 ? '80px' : '150px' }} // Adjust icon size based on screen width
                      />
                    ) : null
                  ))}
                </div>
              </Chrono>
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner /> }
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
