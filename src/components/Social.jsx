import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import { ThemeContext } from 'styled-components';
import { FaGraduationCap } from 'react-icons/fa'; // Import Google Scholar representation icon
import endpoints from '../constants/endpoints';

const styles = {
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  customIconStyle: {
    fontSize: 30,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    cursor: 'pointer',
  },
};

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="social">
      {data
        ? data.social.map((social) =>
            social.network === 'google-scholar' ? (
              <a
                key={social.network}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: theme.socialIconBgColor }}
              >
                <FaGraduationCap style={styles.customIconStyle} />
              </a>
            ) : (
              <SocialIcon
                key={social.network}
                style={styles.iconStyle}
                url={social.href}
                network={social.network}
                bgColor={theme.socialIconBgColor}
                target="_blank"
                rel="noopener"
              />
            )
          )
        : null}
    </div>
  );
}

export default Social;
