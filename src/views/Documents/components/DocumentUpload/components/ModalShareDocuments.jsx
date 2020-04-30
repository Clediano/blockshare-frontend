import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem, Chip, Input } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { loadFriends } from './requests';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};


function getStyles(name, friendsSelected, theme) {
    return {
        fontWeight:
            friendsSelected.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function ModalShareDocuments(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [friendsSelected, setFriendsSelected] = React.useState([]);
    const [friends, setFriends] = React.useState([]);

    const handleChange = (event) => {
        setFriendsSelected(event.target.value);
    };

    useEffect(() => {
        if(props.open) {
            loadFriends(friends => {
                const optionsOfSelect = friends.map(friend => { return { label: friend.name + '(' + friend.email + ')', value: friend.email } });
                setFriends(optionsOfSelect);
                setFriendsSelected(optionsOfSelect);
            })
        }
    }, [props.open])

    return (
        <Dialog
            fullWidth={true}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Defina para quem deseja compartilhar</DialogTitle>
            <DialogContent>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">Organizações que irão receber o documento por e-mail</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={friendsSelected}
                        onChange={handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                                {selected.map((friend, key) => (
                                    <Chip key={key} label={friend.label} className={classes.chip} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {friends.length > 0 ? friends.map((friend, key) => (
                            <MenuItem key={key} value={friend} style={getStyles(friend.value, friendsSelected, theme)}>
                                {friend.label}
                            </MenuItem>
                        )) : "Você não possui organizações pareadas para compartilhar este documento."}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleDisagree} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={() => props.handleAgree(friendsSelected)} color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ModalShareDocuments.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleAgree: PropTypes.func.isRequired,
    handleDisagree: PropTypes.func.isRequired,
};