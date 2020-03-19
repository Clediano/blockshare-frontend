import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import { OrganizationTable, OrganizationToolbar } from './components';
import styles from './style';
import { findAllSharedOrganizations, findSharedOrganizationsByEmail, findSharedOrganizationsByName } from './requests';
import { withSnackbar } from 'notistack';

class Organizations extends Component {

  state = {
    rowsPerPage: 10,
    page: 0,
    organizations: []
  };

  componentDidMount() {
    this.searchOrganizations();
  }

  searchOrganizations = async (filterSelected, value) => {

    const { page, rowsPerPage } = this.state;

    if (value) {
      if (filterSelected) {
        switch (filterSelected.value) {
          case 'name': {
            await findSharedOrganizationsByName(value, page, rowsPerPage, resp => {
              this.setState({
                organizations: resp
              });
            }, err => {
              this.props.enqueueSnackbar(err && err.response.data.error ? err.response.data.error : 'Ocorreu um erro ao localizar seus contatos pareados  😢😢', { variant: 'error' });
            });
            break;
          }
          case 'email': {
            await findSharedOrganizationsByEmail(value, page, rowsPerPage, resp => {
              this.setState({
                organizations: resp
              });
            }, err => {
              this.props.enqueueSnackbar(err && err.response.data.error ? err.response.data.error : 'Ocorreu um erro ao localizar seus contatos pareados  😢😢', { variant: 'error' });
            });
            break;
          }
          default:
            break;
        }
      }
    } else {
      await findAllSharedOrganizations((page * rowsPerPage), rowsPerPage, resp => {
        this.setState({
          organizations: resp
        });
      }, err => {
        this.props.enqueueSnackbar(err && err.response && err.response.data && err.response.data.error ? err.response.data.error : 'Ocorreu um erro ao localizar seus contatos pareados  😢😢', { variant: 'error' });
      });
    }

  };

  handleChangePage = (event, page) => {
    this.setState({ page }, () => {
      this.searchOrganizations();
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value }, () => {
      this.searchOrganizations();
    });
  };

  render() {
    const { classes } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <DashboardLayout title="Organizações">
        <div className={classes.root}>
          <OrganizationToolbar
            searchOrganizations={this.searchOrganizations}
          />
          <OrganizationTable
            className={classes.content}
            onSelect={this.handleSelect}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            handleChangePage={this.handleChangePage}
            searchOrganizations={this.searchOrganizations}
            organizations={this.state.organizations}
          />
        </div>
      </DashboardLayout>
    );
  }
}

const OrganizationsWithSnackbars = withSnackbar(Organizations);

export default withStyles(styles)(OrganizationsWithSnackbars);
