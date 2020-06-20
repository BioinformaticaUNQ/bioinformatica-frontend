    
import React, { useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Unarchive, UnarchiveOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  dropzone: {
    height: 200,
    width: '100%',
    backgroundColor: '#fff',
    border: `2px dashed ${theme.palette.tertiary.main}`,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: 16,
  },
  dropzoneHighlight: {
    height: 200,
    width: '100%',
    border: '2px dashed rgb(187, 186, 186)',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: 16,
    backgroundColor: theme.palette.tertiary.main,
  },
  dropzoneDisabled: {
    height: 200,
    width: '100%',
    backgroundColor: '#fff',
    border: `2px dashed ${theme.palette.secondaryTexts.main}`,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: 16,
  },
  dropzoneInfo: {
    fontSize: 14,
    textAlign: 'center',
    color: theme.palette.tertiary.main
  },
  dropzoneInfoDisabled: {
    fontSize: 14,
    textAlign: 'center',
    color: theme.palette.secondaryTexts.main
  },
  icon: {
    fontSize: 80,
    color: theme.palette.tertiary.main
  },
  iconHighlight: {
    fontSize: 80,
    color: '#fff'
  },
  iconDisabled: {
    fontSize: 80,
    color: theme.palette.secondaryTexts.main
  },
  fileInput: {
    display: 'none',
  }
}));

const Dropzone = (props) => {
    const classes = useStyles();
    const fileInputRef = useRef();
    const [hightlight, setHightlight] = useState(false);

    function openFileDialog() {
      if (props.disabled) return;

      fileInputRef.current.click();
    }

    function onFilesAdded(evt) {
      if (props.disabled) return;

      const file = evt.target.files[0];
      props.onFileAdded(file);
    }

    function onDragOver(event) {
      event.preventDefault();
      if (props.disabled) return;

      setHightlight(true);
    }
  
    function onDragLeave(event) {
      setHightlight(false);
    }
  
    function onDrop(event) {
      event.preventDefault();
      if (props.disabled) return;

      const file = event.dataTransfer.files[0];
      // if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type !== 'application/vnd.ms-excel') return;

      props.onFileAdded(file);
      setHightlight(false);
    }

    
    return (
        <div
          className={props.disabled ? 
            classes.dropzoneDisabled : 
            (hightlight ? classes.dropzoneHighlight : classes.dropzone)}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={openFileDialog}
          style={{ cursor: props.disabled ? "default" : "pointer" }}
        >
          <input
            ref={fileInputRef}
            className={classes.fileInput}
            type="file"
            onChange={onFilesAdded}
            accept=".xls,.xlsx"
          />
          { 
            hightlight ?
            <Unarchive className={classes.iconHighlight}/> :
            <UnarchiveOutlined className={props.disabled ? classes.iconDisabled : classes.icon}/>
          }
          <Typography className={props.disabled ? classes.dropzoneInfoDisabled : classes.dropzoneInfo}>
            Arrastra archivos aquí o clickea para cargar
          </Typography>
        </div>
    );
}

export default Dropzone;