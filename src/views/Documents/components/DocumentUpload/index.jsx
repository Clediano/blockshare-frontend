import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import Dropzone from 'react-dropzone';
import WithDocument from './WithDocument';
import ModalShareDocuments from './components/ModalShareDocuments';

import styles from './styles';

import { registerDocument, registerDocumentAndShare } from '../../requests';
import { getBytesFromFile } from 'common/functions';
import { SHA256 } from 'crypto-js';
import WithoutDocument from './WithoutDocument';
import { withSnackbar } from 'notistack';
import ResponsiveDialog from 'components/Dialog';

class Upload extends Component {

  state = {
    document: null,
    sha256: '',
    loading: false,
    openAlertDialog: false,
    openShareConfirmation: false,
    openShareDocument: false
  };

  onDropAccepted = event => {
    this.setState({
      document: event[0],
      sha256: SHA256(getBytesFromFile(event[0]))
    });
  };

  onClickRegister = () => {
    this.setState({ openShareConfirmation: true })
  };

  registerAndShare = organizations => {
    this.setState({ openShareConfirmation: false, openShareDocument: false, loading: true });

    const emails = organizations.map(org => org.value);

    registerDocumentAndShare(this.state.document, emails, () => {
      this.props.enqueueSnackbar('Documento enviado para registro ✔✔', { variant: 'success' });
      this.props.getTransactions();
      this.setState({ loading: false });
    }, err => {
      this.props.enqueueSnackbar(err && err.error ? err.error : 'Não foi possível registrar este arquivo  😮😮', { variant: 'error' });
      if (err && err.response.data.transaction) {
        this.setState({
          loading: false,
          openAlertDialog: true,
          transactionId: err.response.data.transaction.id
        });
      }
    }, () => {
      this.resetState();
    });
  }

  registerOnly = () => {

    this.setState({ openShareConfirmation: false, loading: true });

    registerDocument(this.state.document, () => {
      this.props.enqueueSnackbar('Documento enviado para registro ✔✔', { variant: 'success' });
      this.props.getTransactions();
      this.setState({ loading: false });
    }, err => {
      this.props.enqueueSnackbar(err && err.error ? err.error : 'Não foi possível registrar este arquivo  😮😮', { variant: 'error' });
      if (err && err.response.data.transaction) {
        this.setState({
          loading: false,
          openAlertDialog: true,
          transactionId: err.response.data.transaction.id
        });
      }
    }, () => {
      this.resetState();
    });
  }

  resetState = () => {
    this.setState({
      document: null,
      sha256: '',
      loading: false
    });
  };

  onDropRejected = event => {
    this.props.enqueueSnackbar('Não foi possível carregar o arquivo, verifique o tamanho do mesmo e tente novamente  😅😅', { variant: 'error' });
  };

  clearDocumentSelected = () => {
    this.setState({ document: null });
  };

  render() {

    const { classes } = this.props;

    const {
      document,
      sha256,
      openAlertDialog,
      openShareConfirmation,
      openShareDocument,
      transactionId,
      loading,
      registredWithSuccess
    } = this.state;

    return (
      <div className={classes.content}>
        <Dropzone
          maxSize={5000000}
          multiple={false}
          onDropAccepted={this.onDropAccepted}
          onDropRejected={this.onDropRejected}
          disabled={Boolean(document)}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            document && document ? (
              <WithDocument
                document={this.state.document}
                sha256={sha256}
                loading={loading}
                success={registredWithSuccess}
                onClickRegister={this.onClickRegister}
                clearDocumentSelected={this.clearDocumentSelected}
              />
            ) : (
                <WithoutDocument
                  getRootProps={getRootProps}
                  isDragActive={isDragActive}
                  getInputProps={getInputProps}
                />
              )
          )}
        </Dropzone>

        <ResponsiveDialog
          open={openAlertDialog}
          handleCloseDialogTitle={() => this.setState({ openAlertDialog: false })}
          handleClose={() => this.setState({ openAlertDialog: false })}
          dialogTitleText="Atenção, documento já registrado!"
          dialogContentText={`Este documento já foi registrado, você pode encontrá-lo pelo ID ${transactionId}`}
          handleDisagree={() => this.setState({ openAlertDialog: false })}
          handleAgree={() => this.setState({ openAlertDialog: false })}
          actionButtonAgreeText="Confirmar"
          actionButtonDisagreeText="Cancelar"
        />

        <ResponsiveDialog
          open={openShareConfirmation}
          handleCloseDialogTitle={() => this.setState({ openShareConfirmation: false })}
          actionButtonAgreeText="Registrar e compartilhar"
          actionButtonDisagreeText="Registrar, apenas"
          dialogTitleText="Deseja compartilhar este documento?"
          dialogContentText="Se você compartilhar este documento, ele será acessível para que seus contatos pareados visualize-os e até mesmo baixe-os para fins de confirmação."
          handleDisagree={this.registerOnly}
          handleAgree={() => this.setState({ openShareConfirmation: false, openShareDocument: true })}
        />

        <ModalShareDocuments
          open={openShareDocument}
          handleClose={() => this.setState({ openShareDocument: false })}
          handleAgree={this.registerAndShare}
          handleDisagree={() => this.setState({ openShareDocument: false })}

        />

      </div>
    );
  }
}

Upload.propTypes = {
  classes: PropTypes.object.isRequired
};

const UploadWithSnackbars = withSnackbar(Upload);

export default withStyles(styles)(UploadWithSnackbars);
