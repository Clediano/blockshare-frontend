import React, { Component, Fragment } from 'react';

import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { Toolbar, Typography, withStyles } from '@material-ui/core';

import styles from './styles';

class Topbar extends Component {

  render() {
    const { classes, className, title } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <Typography
              className={classes.title}
              variant="h4"
            >
              {title}
            </Typography>
          </Toolbar>
        </div>
      </Fragment>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default compose(withStyles(styles))(Topbar);
