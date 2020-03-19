import React, { Component } from 'react';
import { withStyles, Divider, Button, Paper } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import { withSnackbar } from 'notistack';
import { findOrganization, findAllDocumentsByOrganization } from './requests';
import { withRouter } from 'react-router-dom';

import OrganizationHeader from './components/OrganizationHeader';
import DocumentsList from './components/DocumentsList';

import styles from './style';

import ArrowBack from '@material-ui/icons/ArrowBack';

class OrganizationDetail extends Component {

    state = {
        loading: false,
        organization: null,
        documents: [],
        rowsPerPage: 5,
        offset: 0,
        count: 0,
        page: 0,
    }

    componentDidMount() {
        const { params } = this.props.match;

        this.showLoading();

        findOrganization(params.id, organization => {
            this.setState({ organization }, () => {
                this.hiddenLoading();
            })
        }, err => {
            this.hiddenLoading();
            this.props.enqueueSnackbar('Não foi encontrado nenhuma organização', { variant: 'error' });
            this.props.history.goBack();
        });

        this.getDocuments();
    }

    showLoading = () => {
        this.setState({ loading: true })
    }

    hiddenLoading = () => {
        this.setState({ loading: false })
    }

    getDocuments = () => {
        const { params } = this.props.match;
        const { page, rowsPerPage } = this.state;

        this.showLoading();

        findAllDocumentsByOrganization(params.id, (page * rowsPerPage), rowsPerPage, documents => {
            this.setState({ documents: documents.rows, count: documents.count }, () => {
                this.hiddenLoading();
            });
        }, () => {
            this.setState({ documents: [] });
            this.hiddenLoading();
        });
    };

    handleChangePage = (event, page) => {
        this.setState({ page }, () => {
            this.getDocuments()
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value }, () => {
            this.getDocuments()
        });
    };

    render() {
        const { classes, history } = this.props;

        return (
            <DashboardLayout title="Organizações">
                <div className={classes.root}>
                    <Button size="medium" onClick={() => history.goBack()}>
                        <ArrowBack fontSize="default" />
                        Voltar
                    </Button>

                    <Divider className={classes.divider} />

                    <Paper className={classes.paper}>
                        <OrganizationHeader organization={this.state.organization} />

                        <DocumentsList
                            documents={this.state.documents}
                            handleChangePage={this.handleChangePage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                            count={this.state.count}
                            page={this.state.page}
                            rowsPerPage={this.state.rowsPerPage}
                            loading={this.state.loading}
                        />
                    </Paper>
                </div>
            </DashboardLayout>
        );
    }
}

const OrganizationDetailWithRouter = withRouter(OrganizationDetail);
const OrganizationDetailWithSnackbars = withSnackbar(OrganizationDetailWithRouter);

export default withStyles(styles)(OrganizationDetailWithSnackbars);
