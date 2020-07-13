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
    sequences: [],
    newick: '(WP_037127040.1_cytochrome_c_family_protein__Rhizobium_sp._CF097_:0.8739629220,(NP_001285984.1_cytochrome_c_proximal__isoform_B__Drosophila_melanogaster_:0.2257576382,(NP_061820.1_cytochrome_c__Homo_sapiens_:0.0444042475,bartmosca:0.0497006668)76.4/70:0.0846359924)82/82:0.3135776502,(CBJ31344.1_Cytochrome_c__Ectocarpus_siliculosus_:0.3016561411,(KAE8767936.1_Cytochrome_c__Hordeum_vulgare_:0.1017417046,((QEE59979.1_cytochrome_c__Betula_platyphylla_:0.0419600515,KAE9612850.1_Cytochrome_c__Lupinus_albus_:0.0223135394)74.6/72:0.0208958552,NP_001363126.1_cytochrome_c__Vigna_radiata_:0.0068358208)86.9/79:0.0578703709)28.7/42:0.0939446480)26.3/60:0.1878425126);'
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

        <DisplayTree newick={state.newick}/>

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
