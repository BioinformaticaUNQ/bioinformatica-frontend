import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Dropzone from "./components/Dropzone";
import Progress from "./components/Progress";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import FileService from "../../../../services/FileService";
import uploadActions from '../../../../actions/uploadActions';


const useStyles = makeStyles(theme => ({
    title: {
      textAlign: 'center',
      fontSize: 20,
      marginBottom: theme.spacing(3)
    },
    fileName: {
      color: theme.palette.black,
      fontSize: 14,
      marginBottom: theme.spacing(1)
    },
    progressBar: {
      marginTop: theme.spacing(2)
    }
}));


const Uploader = (props) => {
    const classes = useStyles();
    const { file, processing, processFinished, processProgress } = useSelector(state =>  state.upload );
    

    async function onFileAdded(file) {

        try {
          await processFile(file)
        } catch (error) {
          console.log(error)
        }
        
    }



    function processFile(file) {
      return new Promise((resolve, reject) => {
        
          new FileService().process(file, (event) => {
              if (event.loaded < event.total) {

              }
          }).then((result) => {
            

            resolve(result);
          }).catch((err) => {


            reject(err);
          });
        
      });
    }
    
    
    function renderProgress() {
        if (processing || processFinished) {
          return (
                <Progress progress={processProgress ? processProgress.percentage : 0}/>
          );
        }
    }


    return (
        <div>
          <Grid item xs={12}>
            <Typography component="h1" className={classes.title}>Subida de datos</Typography>
          </Grid>
          <Grid item xs={12}>
            <Dropzone
              onFileAdded={onFileAdded}
              disabled={processing || processFinished}
              />
          </Grid>
          <Grid item xs={12}>
            {
              file &&
              <div className={classes.progressBar}>
                  <Typography className={classes.fileName}>Archivo seleccionado: {file.name}</Typography>
                  {renderProgress()}
              </div>
            }
          </Grid>
        </div>
    );
}

export default Uploader;