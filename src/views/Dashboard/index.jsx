import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import {
	DocumentsByPeriod,
	DocumentsNotRegistred,
	DocumentsRegistred,
	Friend,
	TotalDocumentsRegistred
} from './components';

const styles = theme => ({
  root: {
    padding: theme.spacing(2)
  },
  item: {
    width: '100%',
    height: '100%'
  }
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              lg={6}
              sm={6}
              xl={3}
              xs={12}
            >
              <DocumentsNotRegistred className={classes.item}/>
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              xl={3}
              xs={12}
            >
              <DocumentsRegistred className={classes.item}/>
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              xl={3}
              xs={12}
            >
              <Friend className={classes.item}/>
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalDocumentsRegistred className={classes.item}/>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <DocumentsByPeriod className={classes.item}/>
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
