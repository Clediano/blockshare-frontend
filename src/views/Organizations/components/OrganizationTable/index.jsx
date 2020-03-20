import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
    Chip,
    withStyles,
    IconButton,
    Menu,
    MenuItem,
    ListItemText,
} from '@material-ui/core';
import { getInitials } from 'helpers';
import styles from './styles';
import { Portlet, PortletContent } from 'components';
import { Done, Timer, MoreVert } from '@material-ui/icons';

class OrganizationTable extends Component {
    state = {
        anchorEl: null,
        rowSelected: null,
        detailsOpen: false,
        avatar: null
    };

    componentDidMount() {
        const { page, rowsPerPage } = this.props;

        this.props.searchOrganizations(page, rowsPerPage);
    }

    handleDetailsClick = (event, rowSelected) => {
        this.setState({
            anchorEl: event.currentTarget,
            rowSelected
        })
    }

    handleCloseDetails = () => {
        this.setState({ anchorEl: null })
    }

    handleOpenDetailOrganization = () => {
        const { rowSelected } = this.state;
        const { history } = this.props;

        history.push(`/organizations/details/${rowSelected.id}`);
    }

    render() {
        const { classes, className, organizations, handleChangePage, page, handleChangeRowsPerPage, rowsPerPage } = this.props;
        const { anchorEl } = this.state;

        const rootClassName = classNames(classes.root, className);

        return (
            <Portlet className={rootClassName}>
                <PortletContent noPadding>
                    <PerfectScrollbar>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Nome</TableCell>
                                    <TableCell align="left">E-mail</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {organizations
                                    .map(friend => (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            key={friend.id}
                                        >
                                            <TableCell className={classes.tableCell}>
                                                <div className={classes.tableCellInner}>
                                                    <React.Fragment>
                                                        <Avatar
                                                            className={classes.avatar}
                                                        >
                                                            {getInitials(friend.name)}
                                                        </Avatar>
                                                        <Typography
                                                            className={classes.nameText}
                                                            variant="body1"
                                                        >
                                                            {friend.name}
                                                        </Typography>
                                                    </React.Fragment>
                                                </div>
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>
                                                {friend.email}
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>
                                                {friend.match ?
                                                    <Chip label="Pareado" color="primary" size="small" icon={<Done />} />
                                                    :
                                                    <Chip label="Aguardando" color="secondary" size="small" icon={<Timer />} />
                                                }
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                className={classes.tableCell}
                                            >
                                                <IconButton
                                                    size="medium"
                                                    disabled={!friend.match}
                                                    onClick={event => this.handleDetailsClick(event, friend)}
                                                >
                                                    <MoreVert />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </PerfectScrollbar>
                    <TablePagination
                        backIconButtonProps={{
                            'aria-label': 'Previous Page'
                        }}
                        component="div"
                        count={organizations.length}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page'
                        }}
                        onChangePage={e => handleChangePage(e)}
                        onChangeRowsPerPage={e => handleChangeRowsPerPage(e)}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={this.handleCloseDetails}
                    >
                        <MenuItem>
                            <ListItemText
                                primary="Detalhar"
                                onClick={this.handleOpenDetailOrganization}
                            />
                        </MenuItem>
                    </Menu>
                </PortletContent>
            </Portlet>
        );
    }
}

const OrganizationTableWithRouter = withRouter(OrganizationTable);

export default withStyles(styles)(OrganizationTableWithRouter);
