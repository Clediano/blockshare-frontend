import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { Typography, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export default function ResponsiveDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle onClose={props.handleCloseDialogTitle} id="responsive-dialog-title">{props.dialogTitleText}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.dialogContentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.handleDisagree} color="secondary">
                        {props.actionButtonDisagreeText}
                    </Button>
                    <Button onClick={props.handleAgree} color="primary">
                        {props.actionButtonAgreeText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

ResponsiveDialog.propTypes = {
    actionButtonAgreeText: PropTypes.string.isRequired,
    actionButtonDisagreeText: PropTypes.string.isRequired,
    dialogTitleText: PropTypes.string.isRequired,
    dialogContentText: PropTypes.string.isRequired,
    handleDisagree: PropTypes.func.isRequired,
    handleAgree: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
