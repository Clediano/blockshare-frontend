import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import FieldErrorMessage from 'components/FieldErrorMessage';

import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import styles from './styles';

import { withFormik } from 'formik';

import * as Yup from 'yup';

import { signIn } from './requests';

import { getFromSessionStorage, saveAsSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';
import { withSnackbar } from 'notistack';
import { formHasError, mountDataImage } from '../../common/functions';
import { connect } from 'react-redux';
import { loadAvatar } from '../../config/actions';

const initialValues = {
  email: '',
  password: ''
};

class SignIn extends Component {

  state = {
    loading: false
  };

  componentDidMount() {
    const token = getFromSessionStorage(KEY_STORAGE.TOKEN);

    if (token) {
      this.props.history.push('/dashboard');
    }
  }

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };


  handleSignIn = async () => {

    const { history, values, validateForm } = this.props;

    await validateForm(values);

    if (!formHasError(this.props.errors)) {

      this.setState({ loading: true });

      signIn(values.email, values.password, async resp => {
        this.props.enqueueSnackbar(`Seja bem-vindo ${String(resp.data.name).toLowerCase()} ❤❤`, { variant: 'success' });

        const oidavatar = resp.data.oidphoto;
        const avatar = await mountDataImage(oidavatar);
        
        saveAsSessionStorage(KEY_STORAGE.AVATAR, avatar);
        this.props.loadAvatar({ avatar, oidavatar });

        this.setState({ loading: false });

        history.push('/dashboard');

      }, ({ response }) => {
        let message = '';
        if (response && response.data) {
          message = response.data.message;
        } else {
          message = 'Não foi possível comunicar-se com o servidor.';
        }
        this.props.enqueueSnackbar(message, { variant: 'error' });
      });

    } else {
      const fieldError = Object.getOwnPropertyNames(this.props.errors)[0];
      this.props.enqueueSnackbar(this.props.errors[fieldError], { variant: 'error' });
    }
  };

  render() {
    const { classes, values, errors, touched, setFieldTouched } = this.props;
    const { loading } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteWrapper} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography
                  className={classes.quoteText}
                  variant="h1"
                >
                  Blockchain: a inovação mais disruptiva desde a invenção da Web
                </Typography>
                <div className={classes.person}>
                  <Typography
                    className={classes.name}
                    variant="body1"
                  >
                    Satoshi Nakamoto
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>

              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Entrar
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Endereço de e-mail"
                      name="email"
                      error={Boolean(touched['email']) && Boolean(errors.email)}
                      onBlur={() => setFieldTouched('email', true)}
                      onChange={event => this.props.setFieldValue('email', event.target.value)}
                      type="text"
                      value={values.email}
                      variant="outlined"
                      disabled={loading}
                    />
                    <FieldErrorMessage touched={touched['email']} errors={errors} field="email" />
                    <TextField
                      className={classes.textField}
                      label="Senha"
                      name="password"
                      error={Boolean(touched['password']) && Boolean(errors.password)}
                      onBlur={() => setFieldTouched('password', true)}
                      onChange={event => this.props.setFieldValue('password', event.target.value)}
                      type="password"
                      value={values.password}
                      variant="outlined"
                      disabled={loading}
                    />
                    <FieldErrorMessage touched={touched['password']} errors={errors} field="password" />
                  </div>

                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={loading}
                    onClick={this.handleSignIn}
                    size="large"
                    variant="contained"
                  >
                    Acessar
                  </Button>

                  <Typography
                    className={classes.signUp}
                    variant="body1"
                  >
                    Ainda não possui conta?{' '}
                    <Link
                      className={classes.signUpUrl}
                      to="/sign-up"
                    >
                      Cadastre-se
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const SignInDetailsForm = withFormik({
  mapPropsToValues: () => ({ ...initialValues }),
  validateOnChange: false,

  validationSchema: Yup.object({
    email: Yup.string().email('Formato de e-mail inválido').required('O campo e-mail é obrigatório'),
    password: Yup.string().required('O campo senha é obrigatório')
  })

})(SignIn);

const mapStateToProps = state => ({
  avatar: state.avatar
});

const mapDispatchToProps = dispatch => ({
  loadAvatar: data => dispatch(loadAvatar(data))
});

const SignInDetailsFormWithSnackbar = withSnackbar(SignInDetailsForm);

const SignInDetailsFormWithRedux = connect(mapStateToProps, mapDispatchToProps)(SignInDetailsFormWithSnackbar);

export default compose(withRouter, withStyles(styles))(SignInDetailsFormWithRedux);
