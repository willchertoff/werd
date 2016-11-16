import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import App from '../components/App';

class AppContainer extends Component {
  render() {
    return (
      <App {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { message } = state;
  return {
    message,
  };
}

export default withRouter(connect(mapStateToProps)(AppContainer));
