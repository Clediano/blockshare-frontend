import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import { Grid, Typography } from '@material-ui/core';
import imageError from './images/error500.svg';

const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    textAlign: 'center'
  },
  image: {
    display: 'inline-block',
    marginTop: '50px',
    maxWidth: '100%',
    width: '554px'
  }
});

class AccountDetailsError extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container justify="center" spacing={4}>
          <Grid item lg={6} xs={12}>
            <div className={classes.content}>
              <Typography variant="h1">
                500: Ooops, algo de errado não está certo!!!
              </Typography>
              <Typography variant="subtitle2">
                Sua organização já possui usuários cadastrados.
              </Typography>
              <img
                alt="deceive"
                className={classes.image}
                src={imageError}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

AccountDetailsError.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountDetailsError);
