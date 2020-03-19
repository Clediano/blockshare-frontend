import React, { Component } from 'react';

import { DocumentsList, DocumentUpload } from './components';

import { Dashboard as DashboardLayout } from 'layouts';

import { withStyles } from '@material-ui/core';

import styles from './style';
import { loadAllTransactions, findTransactionsByTxid } from './requests';
import DocumentToolbar from './components/DocumentToolbar';
import { withSnackbar } from 'notistack';


class DocumentsRegistration extends Component {
  state = {
    transactions: [],
    loading: false,
    rowsPerPage: 10,
    page: 0,
    count: 0
  };

  handleChangePage = async (event, page) => {
    this.setState({ page }, () => {
      this.getTransactions();
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value }, () => {
      this.getTransactions();
    });
  };

  showLoading = () => {
    this.setState({ loading: true });
  };

  hiddenLoading = () => {
    this.setState({ loading: false });
  };

  getTransactions = () => {
    const { rowsPerPage, page } = this.state;

    this.showLoading();

    loadAllTransactions((rowsPerPage*page), rowsPerPage, transactions => {
      this.setState({
        transactions: transactions.rows,
        count: transactions.count,
        loading: false
      });
    }, err => {
      this.hiddenLoading();
      this.props.enqueueSnackbar('Ocorreu um erro ao localizar seus documentos 😢😢', { variant: 'error' });
    });
  };

  searchDocuments = async (filterSelected, value) => {

    this.showLoading();

    const { page, rowsPerPage } = this.state;

    if (value) {
      if (filterSelected) {
        switch (filterSelected.value) {
          case 'txid': {
            await findTransactionsByTxid(value, page, rowsPerPage, transactions => {
              this.setState({ transactions, loading: false });
            }, err => {
              this.hiddenLoading();
              this.props.enqueueSnackbar(err && err.response.data.error ? err.response.data.error : 'Ocorreu um erro ao localizar seus documentos 😢😢', { variant: 'error' });
            });
            break;
          }
          default:
            break;
        }
      }
    } else {
      loadAllTransactions(page, rowsPerPage, transactions => {
        this.setState({ transactions, loading: false });
      }, err => {
        this.hiddenLoading();
        this.props.enqueueSnackbar('Ocorreu um erro ao localizar seus documentos 😢😢', { variant: 'error' });
      });
    }

  };

  render() {

    const { classes } = this.props;
    const { rowsPerPage, page, transactions, loading, count } = this.state;

    return (
      <DashboardLayout title="Novo Documento">
        <div className={classes.root}>
          <DocumentUpload getTransactions={this.getTransactions} />
          <DocumentToolbar
            searchDocuments={this.searchDocuments}
          />
          <DocumentsList
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            handleChangePage={this.handleChangePage}
            getTransactions={this.getTransactions}
            rowsPerPage={rowsPerPage}
            page={page}
            count={count}
            loading={loading}
            transactions={transactions}
          />
        </div>
      </DashboardLayout>
    );
  };
};

const DocumentsRegistrationWithSnackbar = withSnackbar(DocumentsRegistration);

export default withStyles(styles)(DocumentsRegistrationWithSnackbar);
