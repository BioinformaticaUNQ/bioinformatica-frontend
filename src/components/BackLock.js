import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
//import CircularProgress from '@material-ui/core/CircularProgress';
import EffectLoad from './EffectLoad';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop(props) {
    
const { loading, getLoading } = props;

console.log(`***********-SimpleBackdrop-  loading:  ${ JSON.stringify(loading) }`);
console.log(`***********-SimpleBackdrop-  getLoading:  ${ JSON.stringify(getLoading()) }`);

  const classes = useStyles();
  const [open, setOpen] = React.useState(loading);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };


  return (
    <div>

      {/* <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button> */}

      {/* <Backdrop className={classes.backdrop} open={open} onClick={handleClose}> */}
      <Backdrop className={classes.backdrop} open={open} >

        <EffectLoad />

        {/* <CircularProgress color="inherit" /> */}
      </Backdrop>
    </div>
  );
}
