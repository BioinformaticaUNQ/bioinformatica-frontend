import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import uploadActions from '../../../actions/uploadActions';
import { CheckCircle, Error } from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';
import { Grid, CircularProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    statusWrapper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingIcon: {
        marginRight: theme.spacing(1),
    },
    doneIcon: {
        marginRight: theme.spacing(1),
        color: green[500],
        fontSize: 30
    },
    errorIcon: {
        marginRight: theme.spacing(1),
        color: red[700],
        fontSize: 30
    }
}));

const Status = (props) => {
    const classes = useStyles();
    const { processProgress } = useSelector(state =>  state.upload );
    const dispatch = useDispatch();

    function renderStatus() {
        if(processProgress) {
            switch (processProgress.state) {
                case "done":
                    return <div className={classes.statusWrapper}>
                        <CheckCircle className={classes.doneIcon}/>
                        <Typography>Archivo procesado con éxito</Typography>
                    </div>;
                case "pending":
                    return <div className={classes.statusWrapper}>
                        <CircularProgress className={classes.loadingIcon} size={25}/>
                        <Typography>Procesando archivo...</Typography>
                    </div>;
                case "error":
                    return <div className={classes.statusWrapper}>
                        <Error className={classes.errorIcon}/>
                        <Typography>Error al intentar procesar el archivo</Typography>
                    </div>;
                default:
                    return '';
            }
        }
    }

    return (
        <Grid item xs={12}>
            {renderStatus()}
        </Grid>
    );
};

export default Status;