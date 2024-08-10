import React, { useState, useContext } from 'react';
import {
  Button, Card, Badge, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
  contributorsHeaderStyle: {
    fontWeight: 600,
    marginTop: 10,
  },
  contributorLinkStyle: {
    color: 'inherit',
    textDecoration: 'underline',
  },
  contributorsContainerStyle: {
    textAlign: 'left',
  },
  additionalInfoStyle: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
};

const PublicationCard = (props) => {
  const theme = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const { publication } = props;

  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const MAX_LENGTH = 100;
  const shouldShowReadMore = publication.bodyText.length > MAX_LENGTH;

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
      >
        <Card.Img variant="top" src={publication?.image} />
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>{publication.title}</Card.Title>
          {publication.additionalInfo && (
            <div style={styles.additionalInfoStyle}>
              {publication.additionalInfo.map((info) => (
                <div key={info}>{info}</div>
              ))}
            </div>
          )}
          <Card.Text style={styles.cardTextStyle}>
            {parseBodyText(isExpanded || !shouldShowReadMore
              ? publication.bodyText
              : `${publication.bodyText.substring(0, MAX_LENGTH)}...`)}
            {shouldShowReadMore && (
              <Button
                variant="link"
                style={{ paddingLeft: 0 }}
                onClick={toggleReadMore}
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </Button>
            )}
          </Card.Text>
          {publication?.links?.map((link) => (
            <Button
              key={link.href}
              style={styles.buttonStyle}
              variant={'outline-' + theme.bsSecondaryVariant}
              onClick={() => window.open(link.href, '_blank')}
            >
              {link.text}
            </Button>
          ))}
          <div style={styles.contributorsContainerStyle}>
            {publication['Co-authors'] && (
              <>
                <div style={styles.contributorsHeaderStyle}>Co-authors:</div>
                <ul>
                  {publication['Co-authors'].map((author) => (
                    <li key={author}>
                      <a
                        href={author.contactURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.contributorLinkStyle}
                      >
                        {author.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </Card.Body>
        {publication.tags && (
          <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
            {publication.tags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg={theme.bsSecondaryVariant}
                text={theme.bsPrimaryVariant}
                style={styles.badgeStyle}
              >
                {tag}
              </Badge>
            ))}
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

PublicationCard.propTypes = {
  publication: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
    'Co-authors': PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      contactURL: PropTypes.string.isRequired,
    })),
    additionalInfo: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PublicationCard;
