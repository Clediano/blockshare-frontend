import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button, Grid, TextField, withStyles } from '@material-ui/core';
import { Portlet, PortletContent, PortletFooter, PortletHeader, PortletLabel } from 'components';

import FieldErrorMessage from 'components/FieldErrorMessage';

import styles from './styles';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { formHasError } from '../../../../common/functions';
import { save } from './requests';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const initialValues = {
  name: '',
  password: '',
  confirmation: ''
};

class Account extends Component {
  state = {
    organizationid: '',
    userCreated: false
  };

  componentDidMount() {
    const { match } = this.props;
    const { organizationid } = match.params;

    this.setState({ organizationid });
  }

  handleSubmit = async () => {
    const { values, validateForm } = this.props;

    await validateForm(values);

    if (!formHasError(this.props.errors)) {
      if (this.state.organizationid) {
        save(this.state.organizationid, values, () => {
          this.props.enqueueSnackbar('Cadastro concluído. 😁😁', { variant: 'success' });
          this.props.history.push('/sign-in');
        }, err => {
          this.props.enqueueSnackbar('Ocorreu um erro ao concluir o cadastro. 😥😥', { variant: 'error' });
        });
      } else {
        this.props.enqueueSnackbar('Não conseguimos localizar A organização responsável. 😥😥', { variant: 'error' });
      }
    } else {
      const fieldError = Object.getOwnPropertyNames(this.props.errors)[0];
      this.props.enqueueSnackbar(this.props.errors[fieldError], { variant: 'error' });
    }
  };

  render() {
    const { classes, className, values, errors, dirty, touched, setFieldTouched, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <React.Fragment>
        <Grid container direction="column" justify="center" alignItems="center" className={classes.title}>
          <Typography variant="h2" color="textPrimary">
            Seja bem-vindo de volta!
          </Typography>
          <Typography variant="h3" color="textSecondary">
            Estamos ansiosos para que conclua seu cadastro!
          </Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Portlet {...rest} className={rootClassName}>
            <PortletHeader>
              <PortletLabel title="Dados do usuário"/>
            </PortletHeader>
            <PortletContent noPadding>
              {this.state.userCreated ? (<div>Usuário criado com sucesso! Agradecemos</div>) : null}
              <form className={classes.form}>
                <div className={classes.field}>
                  <TextField
                    className={classes.textField}
                    label="Nome"
                    name="name"
                    error={Boolean(touched['name']) && Boolean(errors.name)}
                    onBlur={() => setFieldTouched('name', true)}
                    onChange={event => this.props.setFieldValue('name', event.target.value)}
                    value={values.name}
                    variant="outlined"
                  />
                  <FieldErrorMessage touched={touched['name']} errors={errors} field="name"/>
                  <TextField
                    className={classes.textField}
                    label="Senha"
                    name="password"
                    type="password"
                    error={Boolean(touched['password']) && Boolean(errors.password)}
                    onBlur={() => setFieldTouched('password', true)}
                    onChange={event => this.props.setFieldValue('password', event.target.value)}
                    value={values.password}
                    variant="outlined"
                  />
                  <FieldErrorMessage touched={touched['password']} errors={errors} field="password"/>
                  <TextField
                    className={classes.textField}
                    label="Confirmar senha"
                    name="confirmation"
                    type="password"
                    error={Boolean(touched['confirmation']) && Boolean(errors.confirmation)}
                    onBlur={() => setFieldTouched('confirmation', true)}
                    onChange={event => this.props.setFieldValue('confirmation', event.target.value)}
                    value={values.confirmation}
                    variant="outlined"
                  />
                  <FieldErrorMessage touched={touched['confirmation']} errors={errors} field="confirmation"/>
                </div>

                {/*<Button*/}
                {/*  className={classes.signInButton}*/}
                {/*  color="primary"*/}
                {/*  onClick={this.handleSignIn}*/}
                {/*  size="large"*/}
                {/*  variant="contained"*/}
                {/*>*/}
                {/*  Acessar*/}
                {/*</Button>*/}
              </form>
            </PortletContent>
            <PortletFooter noDivider alignRight>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Confirmar
              </Button>
            </PortletFooter>
          </Portlet>
        </Grid>
      </React.Fragment>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const AccountDetailsForm = withFormik({
  mapPropsToValues: () => ({ ...initialValues }),

  validate: values => {
    const errors = {};
    if (values.password !== values.confirmation) {
      errors.password = 'As senhas não coincidem.';
      errors.confirmation = 'As senhas não coincidem.';
    }
    return errors;
  },

  validationSchema: Yup.object({
    name: Yup.string().required('O campo nome é obrigatório'),
    password: Yup.string().required('O campo senha é obrigatório'),
    confirmation: Yup.string().required('É necessário confirmar sua senha')
  })
})(Account);

const AccountDetailsFormWithRouter = withRouter(AccountDetailsForm);

export default withStyles(styles)(withSnackbar(AccountDetailsFormWithRouter));
