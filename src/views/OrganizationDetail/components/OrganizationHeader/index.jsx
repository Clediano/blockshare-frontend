import React, { Component } from 'react';
import {
  Avatar,
  Grid,
  withStyles,
  Typography
} from '@material-ui/core';
import styles from './styles';
import avatar_default from './images/avatar_default.png';
import compose from 'recompose/compose';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';

class OrganizationHeader extends Component {

  render() {
    const { classes, organization } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item>
            <Avatar
              alt="Avatar"
              className={classes.avatar}
              src={avatar_default}
            />
          </Grid>
          <Grid item sm container alignItems="center" justify="space-between">
            <Grid item xs container direction="column">
              <Grid item xs>
                <Typography variant="h4">
                  {organization && String(organization.name).toUpperCase()}
                </Typography>
                <Typography variant="body2">
                  {organization && organization.email}
                </Typography>
                <Typography variant="body2">
                  {organization && ((organization.type === 'FISICA') ? organization.cpf : organization.cnpj)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                {organization && 'PESSOA ' + organization.type}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}



const OrganizationHeaderWithNotistack = withSnackbar(OrganizationHeader);

export default compose(withRouter, withStyles(styles))(OrganizationHeaderWithNotistack);

