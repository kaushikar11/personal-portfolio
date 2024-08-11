import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';

const Fade = ({ in: inProp, children }) => {
  const props = useSpring({
    opacity: inProp ? 1 : 0,
    config: { duration: 500 },
  });

  return <animated.div style={props}>{children}</animated.div>;
};

Fade.propTypes = {
  in: PropTypes.bool.isRequired, // 'in' should be a boolean and is required
  children: PropTypes.node.isRequired, // 'children' should be a React node and is required
};

export default Fade;
