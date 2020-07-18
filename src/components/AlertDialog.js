import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function AlertDialog(props) {

  const { invalidFasta, handleCloseModal, textError } = props;
  
//  const [open, setOpen] = React.useState(jump);

  console.log(`**** invalidFasta: ${invalidFasta}`);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    handleCloseModal();
    //renderButton();
  };


  return (

      <div>

      <Dialog
        open={invalidFasta}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ERROR"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {textError}
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Disagree
          </Button> */}
          <Button onClick={handleClose} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
