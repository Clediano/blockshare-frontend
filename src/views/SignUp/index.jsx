import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles, Backdrop, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { withFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import styles from './styles';

import { signUp } from './requests';
import { withSnackbar } from 'notistack';

import FieldErrorMessage from 'components/FieldErrorMessage';

import { defaultFormMessages } from 'common/form';

const initialValues = {
  name: '',
  email: '',
  type: 'FISICA',
  cpf: '',
  cnpj: ''
};

class SignUp extends Component {

  state = {
    loading: false
  }

  enableLoading = () => {
    this.setState({ loading: true });
  }

  disableLoading = () => {
    this.setState({ loading: false });
  }

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  handleSignUp = e => {
    e.preventDefault();

    const { history, values, enqueueSnackbar } = this.props;

    this.enableLoading();

    signUp(values.name, values.email, values.type, values.cpf, values.cnpj, response => {
      enqueueSnackbar(response.data.message, { variant: 'success' });
      this.disableLoading();
      history.push('/sign-in')
    }, err => {
      this.disableLoading();
      enqueueSnackbar(err.response.data.message || "Ocorreu um erro ao cadastrar a organização 😌😌", { variant: 'error' });
    });
  };

  render() {
    const { classes, values, errors, dirty, touched, setFieldTouched } = this.props;
    const { loading } = this.state;

    return (
      <div className={classes.root}>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteWrapper}
            item
            lg={5}
          >
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
                <form className={classes.form} onSubmit={this.handleSignUp}>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Crie sua conta
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  >
                    Use seu melhor e-mail e crie uma conta... É gratuito!
                  </Typography>

                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      disabled={loading}
                      label="Nome da organização"
                      name="name"
                      error={Boolean(touched['name']) && Boolean(errors.name)}
                      onBlur={() => setFieldTouched('name', true)}
                      onChange={event => this.props.setFieldValue('name', event.target.value)}
                      value={values.name}
                      variant="outlined"
                    />
                    <FieldErrorMessage touched={touched['name']} errors={errors} field="name" />

                    <TextField
                      className={classes.textField}
                      disabled={loading}
                      label="Endereço de e-mail da organização"
                      name="email"
                      error={Boolean(touched['email']) && Boolean(errors.email)}
                      onBlur={() => setFieldTouched('email', true)}
                      onChange={event => this.props.setFieldValue('email', event.target.value)}
                      value={values.email}
                      variant="outlined"
                    />
                    <FieldErrorMessage touched={touched['email']} errors={errors} field="email" />

                    <FormControl variant="outlined" className={classes.textField} disabled={loading}>
                      <InputLabel> Tipo da entidade </InputLabel>
                      <Select
                        label="Tipo da entidade"
                        name="type"
                        variant="outlined"
                        onBlur={() => setFieldTouched('type', true)}
                        value={values.type}
                        onChange={event => this.props.setFieldValue('type', event.target.value)}
                      >
                        <MenuItem value="FISICA">Física</MenuItem>
                        <MenuItem value="JURIDICA">Jurídica</MenuItem>
                      </Select>
                    </FormControl>
                    {
                      values.type === 'FISICA' ? (
                        <span className={classes.textField}>
                          <TextField
                            className={classes.textField}
                            disabled={loading}
                            label="CPF"
                            name="cpf"
                            type="number"
                            error={Boolean(touched['cpf']) && Boolean(errors.password)}
                            onBlur={() => setFieldTouched('cpf', true)}
                            onChange={event => this.props.setFieldValue('cpf', event.target.value)}
                            value={values.password}
                            variant="outlined"
                          />
                          <FieldErrorMessage touched={touched['cpf']} errors={errors} field='cpf' />
                        </span>
                      ) : (
                          <span className={classes.textField}>
                            <TextField
                              className={classes.textField}
                              disabled={loading}
                              label="CNPJ"
                              name="cnpj"
                              type="number"
                              error={Boolean(touched['cnpj']) && Boolean(errors.password)}
                              onBlur={() => setFieldTouched('cnpj', true)}
                              onChange={event => this.props.setFieldValue('cnpj', event.target.value)}
                              value={values.password}
                              variant="outlined"
                            />
                            <FieldErrorMessage touched={touched['cnpj']} errors={errors} field='cnpj' />
                          </span>
                        )
                    }
                  </div>
                  <Button
                    className={classes.signUpButton}
                    color="primary"
                    disabled={!dirty || loading}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Cadastrar
                  </Button>

                  <Typography
                    className={classes.signIn}
                    variant="body1"
                  >
                    Você já possui conta?{' '}
                    <Link
                      className={classes.signInUrl}
                      to="/sign-in"
                    >
                      Faça login
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

SignUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const AccountDetailsFormDetailsForm = withFormik({
  mapPropsToValues: () => ({ ...initialValues }),
  validateOnChange: false,

  validationSchema: Yup.object({
    name: Yup.string().required(defaultFormMessages.isRequired),
    email: Yup.string().email('E-mail inválido').required(defaultFormMessages.isRequired)
  })

})(SignUp);

export default compose(withRouter, withStyles(styles))(withSnackbar(AccountDetailsFormDetailsForm));

