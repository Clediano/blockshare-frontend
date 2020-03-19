import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Grid, withStyles } from '@material-ui/core';

import { Dashboard as DashboardLayout } from 'layouts';

import { AccountDetails, AccountProfile } from './components';

const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class Account extends Component {
  state = {
    tabIndex: 0
  };

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Conta">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <AccountProfile/>
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <AccountDetails/>
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
