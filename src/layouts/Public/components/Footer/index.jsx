import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Divider, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  company: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5)
  }
});

class Footer extends Component {
  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <Divider/>
        <Typography
          className={classes.company}
          variant="body1"
        >
          &copy; Clediano e Cleiton Estefenon. 2019
        </Typography>
        <Typography variant="caption">
          Trabalho de conclusão de curso desenvolvido com a ajuda do Prof. Me. Roberson Junior Fernandes Alves
        </Typography>
      </div>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
