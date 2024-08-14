import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from './Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: '10px 0', // Adjusted for better spacing on mobile
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1em', // Adjusted font size for better readability
    fontWeight: 500,
    padding: '20px', // Reduced padding for better fit on smaller screens
  },
  introImageContainer: {
    margin: '10px 0', // Adjusted for better spacing on mobile
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  imagerounder: {
    borderRadius: '50%', // Makes the logo circular
    objectFit: 'cover',
    width: '100%', // Make image responsive
    maxWidth: '300px', // Limit max width for larger screens
    padding: '10px', // Adjusted padding for consistency
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  const parseIntro = (text) => (
    <ReactMarkdown>{text}</ReactMarkdown>
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .then(() => setFadeIn(true));
  }, []);

  if (!data) {
    return <FallbackSpinner />;
  }

  const about2HTML = data.about2
    ? data.about2
      .replace(/{company}/g, data.company)
      .replace(/{companyURL}/g, data.companyURL)
    : '';

  return (
    <div className="section-content-container">
      <Container>
        <Fade in={fadeIn}>
          <Row className="align-items-center">
            <Col xs={12} md={4} style={styles.introImageContainer}>
              <img style={styles.imagerounder} src={data.imageSource} alt="profile" />
            </Col>
            <Col xs={12} md={8} style={styles.introTextContainer}>
              <Header title={header} />
              {parseIntro(data.about)}
              <div dangerouslySetInnerHTML={{ __html: about2HTML }} />
            </Col>
          </Row>
        </Fade>
      </Container>
    </div>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
