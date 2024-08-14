import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from './Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import PublicationCard from './publications/PublicationCard';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
};

const Publications = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.publications, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .then(() => setFadeIn(true))
      .catch((err) => err);
  }, []);
  const numberOfItems = showMore && data ? data.length : 6;
  return (
    <>
      <Header title={header} />
      {data
        ? (
          <div className="section-content-container">
            <Container style={styles.containerStyle}>
              <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                {data.publications?.slice(0, numberOfItems).map((publication) => (
                  <Fade in={fadeIn} key={publication.title}>
                    <PublicationCard publication={publication} />
                  </Fade>
                ))}
              </Row>

              {!showMore
                && (
                <Button
                  style={styles.showMoreStyle}
                  variant={theme.bsSecondaryVariant}
                  onClick={() => setShowMore(true)}
                >
                  show more
                </Button>
                )}
            </Container>
          </div>
        ) : <FallbackSpinner /> }
    </>
  );
};

Publications.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Publications;
