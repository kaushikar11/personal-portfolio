import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Fade from './Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '1.2em',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  skillSectionContainer: {
    margin: '20px 0',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'transparent',
  },
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
  },
  skillTitle: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  sectionTitle: {
    fontSize: '1.5em',
    fontWeight: '600',
    marginBottom: '20px',
  },
};

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  const renderSkillsIntro = (intro) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown children={intro} />
    </h4>
  );

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .then(() => setFadeIn(true))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade in={fadeIn}>
          <div className="section-content-container">
            <Container>
              {renderSkillsIntro(data.intro)}
              {data.skills?.map((rows) => (
                <div key={rows.title} className="skill-section" style={styles.skillSectionContainer}>
                  <h3 style={styles.sectionTitle}>{rows.title}</h3>
                  <Row>
                    {rows.items.map((item) => (
                      <Col key={item.title} xs={12} sm={6} md={4} lg={3}>
                        <div>
                          <img
                            src={item.icon}
                            alt={item.title}
                            style={styles.iconStyle}
                          />
                          <div style={styles.skillTitle}>{item.title}</div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner />}
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
