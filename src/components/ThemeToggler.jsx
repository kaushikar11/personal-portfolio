import React from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

function ThemeToggler(props) {
  const { onClick } = props;

  return (
    <AppContext.Consumer>
      {({ darkMode, toggle }) => (
        <div style={{ marginBottom: 8, marginRight: 20 }}>
          <DarkModeToggle
            onChange={() => {
              toggle();
              onClick();
            }}
            checked={darkMode}
            size={50}
          />
        </div>
      )}
    </AppContext.Consumer>
  );
}

ThemeToggler.propTypes = {
  onClick: PropTypes.func,
};

ThemeToggler.defaultProps = {
  onClick: () => {},
};

export default ThemeToggler;
