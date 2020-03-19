import React, { Component } from 'react';

import { Paper, Typography, withStyles, ButtonBase } from '@material-ui/core';
import styles from './styles';
import imgUpload from './images/upload-de-arquivo.svg';

class WithoutDocument extends Component {

    renderDragMessage = () => {
        const { classes } = this.props;

        return (
            <ButtonBase className={classes.contentItem}>
                <img src={imgUpload} alt="upload files" className={classes.image} />
                <Typography gutterBottom variant="subtitle1" >
                    {!this.props.isDragActive ? "Clique aqui ou arraste um arquivo de até 5MB para carregá-lo" : "Solte o arquivo para carregá-lo"}
                </Typography>
            </ButtonBase>
        )
    };

    render() {

        const { classes, getRootProps, getInputProps } = this.props;

        return (
            <div
                className={classes.root}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <Paper className={classes.paper}>
                    {this.renderDragMessage()}
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(WithoutDocument);
