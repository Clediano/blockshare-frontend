import React, { Component } from 'react';
import classNames from 'classnames';
import { Grid, TextField, Typography, withStyles } from '@material-ui/core';
import QRCode from 'qrcode.react';
import { Portlet, PortletContent, PortletHeader, PortletLabel } from 'components';
import styles from './styles';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';
import { copyStringToClipboard } from '../../../../common/functions';
import Tooltip from '@material-ui/core/Tooltip';
import { getDetailsAddress, getTransactionFee } from './requests';

class Account extends Component {
  state = {
    userName: getFromSessionStorage(KEY_STORAGE.NAME),
    email: getFromSessionStorage(KEY_STORAGE.EMAIL),
    organizationId: getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID),
    address: getFromSessionStorage(KEY_STORAGE.ADDRESS),
    balance: 0,
    fee: 0
  };

  componentDidMount() {
    const { address } = this.state;

    getDetailsAddress(address, ({ data }) => {
      this.setState({ balance: data.payload.balance }, () => {
        getTransactionFee(({ data }) => {
          this.setState({ fee: data.payload.average })
        }, err => {
          console.error(err)
        })
      });
    }, err => {
      console.error(err);
    });
  }

  render() {
    const { classes, className, values, errors, dirty, touched, setFieldTouched, ...rest } = this.props;
    const { userName, email } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <React.Fragment>
        <Portlet {...rest} className={rootClassName}>
          <PortletHeader>
            <PortletLabel
              title="Informações sobre o usuário"
            />
          </PortletHeader>
          <PortletContent noPadding>
            <form
              autoComplete="off"
              noValidate
            >
              <div className={classes.field}>
                <TextField
                  className={classes.textField}
                  label="Nome do usuário"
                  margin="dense"
                  disabled
                  value={userName}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  label="Email do usuário"
                  margin="dense"
                  value={email}
                  variant="outlined"
                  disabled
                />
              </div>
            </form>
          </PortletContent>
        </Portlet>
        <Portlet
          {...rest}
          className={rootClassName}
        >
          <PortletHeader>
            <PortletLabel
              title="Informações da carteira"
            />
          </PortletHeader>
          <PortletContent noPadding>
            <div className={classes.field}>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item>
                  <Tooltip title="Endereço da carteira(clique para copiar)" className={classes.copy}>
                    <div onClick={() => copyStringToClipboard(this.state.address)}>
                      <QRCode value={this.state.address} level="H" />
                    </div>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Balanço atual da carteira(total de bitcoins para gastar)">
                    <Typography color="textSecondary" variant="body1" align="center">
                      BTC {this.state.balance}
                    </Typography>
                  </Tooltip>

                  <Typography color="textSecondary" variant="body2" align="center">
                    {this.state.balance > 0 ? `Você pode registrar aproximadamente ${Number(this.state.balance / this.state.fee).toFixed(0)} documentos.` : 'Você não pode registrar documentos com este saldo.'}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </PortletContent>
        </Portlet>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Account);
