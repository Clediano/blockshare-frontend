import React, { Component, Fragment } from 'react';

import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { withStyles, withWidth } from '@material-ui/core';

import { Footer, Topbar } from './components';

import styles from './styles';

class Public extends Component {

  render() {
    const { classes, title, children } = this.props;

    return (
      <Fragment>
        <Topbar title={title}/>
        <main className={classNames(classes.content)}>
          {children}
          <Footer/>
        </main>
      </Fragment>
    );
  }
}

Public.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  width: PropTypes.string.isRequired
};

export default compose(withStyles(styles), withWidth())(Public);
