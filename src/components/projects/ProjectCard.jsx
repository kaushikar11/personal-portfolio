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
    textAlign: 'left', // Align content to the left
  },
  additionalInfoStyle: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState(false); // State for expanding text
  const { project } = props;

  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const MAX_LENGTH = 100; // Maximum number of characters to show before "Read More"
  const shouldShowReadMore = project.bodyText.length > MAX_LENGTH;

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
        <Card.Img variant="top" src={project?.image} />
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>
          {project.additionalInfo && (
            <div style={styles.additionalInfoStyle}>
              {project.additionalInfo.map((info) => (
                <div key={info}>{info}</div>
              ))}
            </div>
          )}
          <Card.Text style={styles.cardTextStyle}>
            {parseBodyText(isExpanded || !shouldShowReadMore
              ? project.bodyText
              : `${project.bodyText.substring(0, MAX_LENGTH)}...`)}
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
        </Card.Body>
        <Card.Body>
          {project?.links?.map((link) => (
            <Button
              key={link.href}
              style={styles.buttonStyle}
              variant={'outline-' + theme.bsSecondaryVariant}
              onClick={() => window.open(link.href, '_blank')}
            >
              {link.text}
            </Button>
          ))}

          {project?.Contributers?.length > 0 && (
            <div style={styles.contributorsContainerStyle}>
              <p style={styles.contributorsHeaderStyle}>Contributors:</p>
              <ul>
                {project.Contributers.map((contributor) => (
                  <li key={contributor.contactURL}>
                    <a
                      href={contributor.contactURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.contributorLinkStyle}
                    >
                      {contributor.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card.Body>

        {project.tags && (
          <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
            {project.tags.map((tag) => (
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

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
    Contributers: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      contactURL: PropTypes.string.isRequired,
    })),
    additionalInfo: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
