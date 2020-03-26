import React, { Component } from 'react';

import { Button, ButtonBase, Divider, Grid, Paper, Tooltip, Typography, withStyles } from '@material-ui/core';

import styles from './styles';

import { copyStringToClipboard, formatBytes } from 'common/functions';

import LoadingButton from 'components/LoadingButton';

import imgAudio from './images/audio.svg';
import imgVideo from './images/video.svg';
import imgImage from './images/image.svg';
import imgApplication from './images/application.svg';

class WithDocument extends Component {

  loadAvatar = () => {
    const { classes, document } = this.props;

    const type = String(document.type);

    if (type.includes('audio')) {
      return <img src={imgAudio} alt="Audio" className={classes.image}/>;
    } else if (type.includes('video')) {
      return <img src={imgVideo} alt="Video" className={classes.image}/>;
    } else if (type.includes('image')) {
      return <img src={imgImage} alt="File" className={classes.image}/>;
    }
    return <img src={imgApplication} alt="Application" className={classes.image}/>;
  };

  loadExtension = () => {
    const { document } = this.props;

    const type = String(document.type);
    const typeSplitted = type.split('/')[1] || '';

    if (type.includes('audio')) {
      return String(typeSplitted);
    } else if (type.includes('video')) {
      return String(typeSplitted);
    } else if (type.includes('image')) {
      return String(typeSplitted);
    }
    return 'DOC';
  };

  loadName = () => {
    const { document } = this.props;

    const name = String(document.name);

    return name.split('.')[0];
  };


  render() {

    const { classes, document, clearDocumentSelected, sha256, onClickRegister, loading, success } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                {this.loadAvatar()}
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs={6} container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    Arquivo carregado
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {this.loadName()} • {this.loadExtension()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Clique para limpar o arquivo">
                    <Button onClick={() => clearDocumentSelected()} aria-label="delete" className={classes.margin}>
                      ALTERAR
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid item xs={6} container direction="column" justify="space-between" alignItems="flex-end">
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom>
                    Tamanho
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatBytes(document.size)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Clique para copiar o SHA256 do arquivo">
                    <Button onClick={() => copyStringToClipboard(sha256)} aria-label="copy" className={classes.margin}>
                      SHA256
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider className={classes.divider}/>
          <Grid container direction="row" justify="center" alignItems="center">
            <LoadingButton
              label="Registrar documento"
              loading={loading}
              success={success}
              color="inherit"
              handleButtonClick={() => onClickRegister()}
            />
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(WithDocument);
