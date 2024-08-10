import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
    padding: '40px',
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  imagerounder: {
    borderRadius: '50%', // Makes the logo circular
    objectFit: 'cover',
    padding: '50px',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown children={text} />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return <FallbackSpinner />;
  }

  // Ensure `data.about2` is replaced correctly with data values
  const about2HTML = data.about2
    ? data.about2
      .replace(/{company}/g, data.company)
      .replace(/{companyURL}/g, data.companyURL)
    : '';

  return (
    <div className="section-content-container">
      <Container>
        <Fade>
          <Row>
            <Col style={styles.introImageContainer}>
              <img style={styles.imagerounder} src={data.imageSource} alt="profile" />
            </Col>
            <Col style={styles.introTextContainer}>
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
