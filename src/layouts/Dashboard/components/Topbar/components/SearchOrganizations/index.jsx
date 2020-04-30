import React, { Component, Fragment } from 'react';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Divider, IconButton, InputBase, Popover, Tooltip, withStyles } from '@material-ui/core';
import styles from './styles';
import { Menu, Search } from '@material-ui/icons';
import SearchOptionsList from './SearchOptionsList';
import OrganizationList from './OrganizationList';
import { findOrganizationByAddress, findOrganizationByName, sendInvite } from './requests';
import { removeElementOfList } from 'common/functions';

const searchOptions = [
  { label: 'Nome', value: 'name', inputLabel: 'por nome...' },
  { label: 'Endereço', value: 'address', inputLabel: 'pelo endereço...' }
];

class SearchOrganizations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filterSelected: { label: 'Nome', value: 'name', icon: 'N', inputLabel: 'por nome...' },
      searchFilterEl: null,
      searchInputValue: '',
      organizations: [],
      count: 0,
      offset: 0,
      rowsPerPage: 4 //limit
    };
  }

  componentDidMount() {
    this.searchOrganizations();
  }

  searchOrganizations = () => {
    const { offset, rowsPerPage, filterSelected, searchInputValue } = this.state;

    switch (filterSelected.value) {
      case 'name': {
        findOrganizationByName(searchInputValue, offset, rowsPerPage, resp => {

          this.setState({
            organizations: resp.data.rows,
            count: resp.data.count
          });
        });
        break;
      }
      case 'address': {
        findOrganizationByAddress(searchInputValue, offset, rowsPerPage, resp => {
          this.setState({
            organizations: resp.data.rows.map(row => row.organization),
            count: resp.data.count
          });
        });
        break;
      }
      default:
        break;
    }
  };

  sendSolicitation = organization => {
    const { organizations } = this.state;

    sendInvite(organization.id, resp => {
      this.setState({
        organizations: removeElementOfList(organizations, false, 'id', organization.id)
      });
      this.props.enqueueSnackbar('Convite enviado com sucesso! 😎', { variant: 'success' });
    }, () => {
      this.props.enqueueSnackbar('Ops, ocorreu um erro ao enviar o convite. 😢', { variant: 'error' });
    });
  };

  handleChangePage = async (event, newPage) => {
    await this.setState({
      offset: newPage,
      organizations: null
    });
    await this.searchOrganizations();
  };

  handleChangeRowsPerPage = async (event) => {
    await this.setState({
      rowsPerPage: +event.target.value,
      page: 0,
      organizations: null
    });
    await this.searchOrganizations();
  };

  onSelectFilterOption = option => {
    this.setState({ filterSelected: option });
    this.handleCloseSearchFilter();
  };

  handleShowSearchFilter = event => {
    this.setState({
      searchFilterEl: event.currentTarget
    });
  };
  handleCloseSearchFilter = () => {
    this.setState({
      searchFilterEl: null
    });
  };

  onChangeInput = e => {
    this.setState({ searchInputValue: e.target.value });
  };

  render() {
    const { className, classes } = this.props;

    const {
      filterSelected,
      searchFilterEl,
      searchInputValue,
      organizations,
      count,
      offset,
      rowsPerPage
    } = this.state;

    const showSearchFilter = Boolean(searchFilterEl);

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <Fragment>
          <div className={classes.header}>
            <Tooltip title="Trocar filtro">
              <IconButton aria-label="menu" onClick={this.handleShowSearchFilter}>
                <Menu />
              </IconButton>
            </Tooltip>
            <InputBase
              className={classes.inputSearch}
              onChange={this.onChangeInput}
              placeholder={`Pesquisar organização ${filterSelected.inputLabel}`}
              inputProps={{ 'aria-label': 'search organizations' }}
            />
            <Tooltip title="Pesquisar">
              <IconButton aria-label="search" onClick={this.searchOrganizations}>
                <Search />
              </IconButton>
            </Tooltip>
          </div>

          <Divider />

          <div className={classes.content}>
            <OrganizationList
              organizations={organizations}
              searchOrganizations={this.searchOrganizations}
              searchInputValue={searchInputValue}
              filterSelected={filterSelected}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              handleChangePage={this.handleChangePage}
              sendSolicitation={this.sendSolicitation}
              count={count}
              offset={offset}
              rowsPerPage={rowsPerPage}
            />
          </div>
        </Fragment>

        <Popover
          anchorEl={searchFilterEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={this.handleCloseSearchFilter}
          open={showSearchFilter}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <SearchOptionsList
            searchOptions={searchOptions}
            onSelect={this.onSelectFilterOption}
            filterSelected={filterSelected}
          />
        </Popover>
      </div>
    );
  }
}

SearchOrganizations.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

const SearchOrganizationsWithSnackbars = withSnackbar(SearchOrganizations);

export default withStyles(styles)(SearchOrganizationsWithSnackbars);
