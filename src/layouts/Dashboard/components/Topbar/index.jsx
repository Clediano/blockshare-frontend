import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { Badge, IconButton, Popover, Toolbar, Typography, withStyles } from '@material-ui/core';
import {
  Close as CloseIcon,
  Input as InputIcon,
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsIcon,
  PeopleSharp
} from '@material-ui/icons';
import { NotificationList, SearchOrganizations } from './components';
import styles from './styles';
import { getNumberOfNotifications } from './requests';
import ResponsiveDialog from 'components/Dialog';

class Topbar extends Component {

  state = {
    showExitConfirmation: false,
    notifications: [],
    notificationsCount: 0,
    notificationsEl: null,
    searchOrganizationsEl: null
  };

  async componentDidMount() {
    this.refleshCountNotifications();
  }

  getCountNotifications = async () => {
    return await getNumberOfNotifications();
  };

  refleshCountNotifications = async () => {
    const count = await this.getCountNotifications();

    this.setState({ notificationsCount: count });
  };

  handleSignOut = () => {
    const { history } = this.props;

    sessionStorage.clear();
    history.push('/sign-in');
  };

  handleShowSearchOrganizations = event => {
    this.setState({
      searchOrganizationsEl: event.currentTarget
    });
  };
  handleCloseSearchOrganizations = () => {
    this.setState({
      searchOrganizationsEl: null
    });
  };

  handleShowNotifications = event => {
    this.setState({
      notificationsEl: event.currentTarget
    });
  };
  handleCloseNotifications = () => {
    this.setState({
      notificationsEl: null
    });
  };

  render() {
    const { classes, className, title, isSidebarOpen, onToggleSidebar } = this.props;

    const { notificationsCount, notificationsEl, searchOrganizationsEl } = this.state;

    const rootClassName = classNames(classes.root, className);

    const showNotifications = Boolean(notificationsEl);
    const showSearchOrganizations = Boolean(searchOrganizationsEl);

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              onClick={onToggleSidebar}
              variant="text"
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              className={classes.title}
              variant="h4"
            >
              {title}
            </Typography>

            <IconButton
              className={classes.peopleIcon}
              onClick={this.handleShowSearchOrganizations}
            >
              <PeopleSharp />
            </IconButton>

            <IconButton
              className={classes.notificationsButton}
              onClick={this.handleShowNotifications}
            >
              <Badge
                badgeContent={notificationsCount}
                color="primary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              className={classes.signOutButton}
              onClick={() => this.setState({ showExitConfirmation: true })}
            >
              <InputIcon />
            </IconButton>

          </Toolbar>
        </div>
        <Popover
          anchorEl={notificationsEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={this.handleCloseNotifications}
          open={showNotifications}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <NotificationList
            onClose={this.handleCloseNotifications}
            onSelect={this.refleshCountNotifications}
          />
        </Popover>

        <Popover
          anchorEl={searchOrganizationsEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={this.handleCloseSearchOrganizations}
          open={showSearchOrganizations}
        >
          <SearchOrganizations />
        </Popover>

        <ResponsiveDialog
          open={this.state.showExitConfirmation}
          handleCloseDialogTitle={() => this.setState({ showExitConfirmation: false })}
          dialogTitleText="Confirmação"
          actionButtonAgreeText="Sair"
          actionButtonDisagreeText="Cancelar"
          dialogContentText="Você tem certeza que deseja sair do sistema?"
          handleDisagree={() => this.setState({ showExitConfirmation: false })}
          handleAgree={this.handleSignOut}
        />
      </Fragment>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

Topbar.defaultProps = {
  onToggleSidebar: () => {
  }
};

export default compose(
  withRouter,
  withStyles(styles)
)(Topbar);
