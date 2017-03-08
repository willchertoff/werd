import React, { PropTypes } from 'react';

const pt = {
  children: PropTypes.element.isRequired,
};

const AppContainer = ({ children }) => (
  <div>
    {children}
  </div>
);

AppContainer.propTypes = pt;

export default AppContainer;
