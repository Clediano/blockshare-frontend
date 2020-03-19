import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { withSnackbar } from 'notistack';

import { connect } from 'react-redux';

import { loadAvatar } from '../../../../config/actions/index';
import { Avatar, Button, CircularProgress, Grid, Typography, withStyles } from '@material-ui/core';

import { Portlet, PortletContent, PortletFooter } from 'components';
import { withRouter } from 'react-router-dom';

import styles from './styles';

import avatar_default from './images/avatar_default.png';

import { removeAvatar, saveAvatar } from './requests';
import { getFromSessionStorage, saveAsSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';
import { mountDataImage } from '../../../../common/functions';


class AccountProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ip: '',
      loading: false,
      avatar: getFromSessionStorage(KEY_STORAGE.AVATAR)
    };
  }

  async componentDidMount() {
    const name = getFromSessionStorage(KEY_STORAGE.NAME);

    this.setState({ name });
  }

  showLoading = () => {
    this.setState({ loading: true });
  };

  hiddenLoading = () => {
    this.setState({ loading: false });
  };

  handleCaptureImage = ({ target }) => {

    this.showLoading();

    if (target.files[0].size < 100000) {
      const formData = new FormData();
      formData.append('file', target.files[0]);

      saveAvatar(formData, async resp => {
        this.props.enqueueSnackbar('Avatar atualizado com sucesso! 👻👻', { variant: 'success' });

        this.hiddenLoading();

        mountDataImage(resp.data._id, dataImage => {
          saveAsSessionStorage(KEY_STORAGE.AVATAR, dataImage);
          this.props.loadAvatar({
            avatar: dataImage,
            oidvatar: resp.data._id
          });
          this.hiddenLoading();
        }, () => {
          this.props.enqueueSnackbar('Ocorreu um erro ao atualizar o avatar. Por favor, faça login na aplicação novamente 😅😅', { variant: 'warning' });
          this.hiddenLoading();
        });
      }, err => {
        this.props.enqueueSnackbar('Esse arquivo infelizmente não é suportado. 😢😢', { variant: 'error' });
        this.hiddenLoading();
      });
    } else {
      this.props.enqueueSnackbar('Tamanho do arquivo não suportado. 😢😢 Limite máximo de 100KB', { variant: 'warning' });
      this.hiddenLoading();
    }
  };

  deleteAvatar = () => {

    this.showLoading();

    removeAvatar(() => {
      this.props.enqueueSnackbar('Avatar removido com sucesso ✌✌', { variant: 'success' });
      this.hiddenLoading();

      this.props.loadAvatar({
        avatar: '',
        oidvatar: ''
      });
      saveAsSessionStorage(KEY_STORAGE.AVATAR, '');

      this.setState({ loading: false });
    }, err => {
      this.props.enqueueSnackbar(err.message || 'Ops, alguma coisa deu errado. Tente daqui a pouco!', { variant: 'error' });
      this.hiddenLoading();
    });
  };

  render() {
    const { classes, className, avatar, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          {this.state.loading ? (
            <Grid container justify="center" alignItems="center">
              <CircularProgress />
            </Grid>
          ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography noWrap={false} variant="h4">
                        {this.state.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Avatar
                    className={classes.avatar}
                    src={avatar.avatar || this.state.avatar || avatar_default}
                  />
                </Grid>
              </Grid>
            )}
        </PortletContent>
        <PortletFooter>
          <div>
            <input
              accept="image/*"
              className={classes.inputFile}
              id="contained-button-file"
              onChange={this.handleCaptureImage}
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button component="span" className={classes.profileButton}>
                Trocar avatar
              </Button>
            </label>
          </div>
          <Button
            disabled={!avatar.avatar}
            variant="text"
            className={classes.profileButton}
            onClick={this.deleteAvatar}
          >
            Remover avatar
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  avatar: state.avatar
});

const mapDispatchToProps = dispatch => ({
  loadAvatar: data => dispatch(loadAvatar(data))
});

const AccountProfileWithNotistack = withSnackbar(AccountProfile);
const AccountProfileWithRedux = connect(mapStateToProps, mapDispatchToProps)(AccountProfileWithNotistack);

export default compose(withRouter, withStyles(styles))(AccountProfileWithRedux);