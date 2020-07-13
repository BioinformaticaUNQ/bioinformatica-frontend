import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FastaUpload from './FastaUpload';
import MapSequences from './mapsequences/mapsequences';
import DisplayTree from './displaytree/displaytree';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleExpansionPanel() {
  const classes = useStyles();



  const initialState = {
    sequences: []
  };


   const [state, setState] = React.useState(initialState);



  const extractSequencesToUpload = (seqs) => {

    console.log(`***********-extractSequencesToUpload-  seqs:  ${ JSON.stringify(seqs) }`);

    setState({
        sequences: seqs,
    });
  }


  const getSequences = async () => {

    const { sequences } = state;

    console.log(`***********-getSequences-  sequences:  ${ JSON.stringify(sequences) }`);

    return sequences;
  }



  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Ingresar archivo FASTA</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Ingresar un archivo con el formato saraza con y los datos pirulin y pirulo (en ese orden)
            para visualizar tanto el árbol como el mapa...
          </Typography>
        </ExpansionPanelDetails>

        <FastaUpload extractSequencesToUpload={extractSequencesToUpload}/>

      </ExpansionPanel>

      <ExpansionPanel TransitionProps={{ unmountOnExit: true }} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Árbol filogenético</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            poner un comentario que sirva para indicar como se usa, o para poner las restricciones 
            que necesitemos informar...
          </Typography>
        </ExpansionPanelDetails>

        <DisplayTree/>

      </ExpansionPanel>


      <ExpansionPanel TransitionProps={{ unmountOnExit: true }} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Mapa</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            poner un comentario que sirva para indicar como se usa, o para poner las restricciones 
            que necesitemos informar...
          </Typography>
        </ExpansionPanelDetails>

        <MapSequences getSequences={getSequences} />

      </ExpansionPanel>
    </div>
  );
}
