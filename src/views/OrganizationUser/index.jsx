import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withRouter } from "react-router";
import { Grid, withStyles } from '@material-ui/core';
import { Public as PublicLayout } from 'layouts';
import { getAllUsersOfOrganization } from './requests';
import { AccountDetails } from './components';
import AccountDetailsError from './components/AccountDetailsError';

const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class Account extends Component {

  state = {
    organizationHasUsers: true
  };

  componentDidMount() {
    const { match } = this.props;

    const {organizationid} = match.params;

    getAllUsersOfOrganization(organizationid, response => {
      this.setState({
        organizationHasUsers: Boolean(response.data.length > 0)
      });
    }, err => {
      this.props.enqueueSnackbar(err.response.data.message, { variant: 'error'});
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <PublicLayout title="Criação do usuário administrador">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              {!this.state.organizationHasUsers ? <AccountDetails/> : <AccountDetailsError/>}
            </Grid>
          </Grid>
        </div>
      </PublicLayout>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

const AccountWithRouter = withRouter(Account);
const AccountWithSnackbar = withSnackbar(AccountWithRouter);

export default withStyles(styles)(AccountWithSnackbar);
