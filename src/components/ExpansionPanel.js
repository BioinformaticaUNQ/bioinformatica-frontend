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
//import EffectLoad from './EffectLoad';
import BackLock from './BackLock';
import { sequences_colors } from '../utils/utils';
import { Newick } from 'newick';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '94%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleExpansionPanel() {
  const classes = useStyles();


  var msj_fasta = " Se solicita ingresar un archivo con formato fasta y extensión “xxxx.fasta”.  Por ahora solo se aceptan cadenas de nucleotidos.  " + "\n" +
                    " Formato de header esperado:   ' >nombreSecuencias | Latitud | Longitud | id  '   " + "\n" + "            ." + "\n" +
                    " Latitud:  número comprendido entre -90 y 90.  "  + "\n" +
                    " Longitud:  número comprendido entre -180 y 180";


 var msj_tree = "Para construir el árbol filogenético estamos utilizando la herramienta iqtree con bootstrap seteado en 1000";

 var msj_map = "Con respecto al mapa solo se ubicaran las secuencias que están seteadas con el formato de header antes descripto ";


  const initialState = {
    sequences: [],
    newick_tree: null,
    //loading: false,
  };

  const [state, setState] = React.useState(initialState);

  const extractDataToUpload = (seqs, newick) => {

    console.log(`***********-extractDataToUpload-  seqs:  ${ JSON.stringify(seqs) }`);
    console.log(`***********-extractDataToUpload-  newick:  ${ JSON.stringify(newick) }`);
    const seqs_headers = Object.keys(new Newick(newick).dfs());
    setState({
        sequences: seqs,
        newick_tree: newick,
        colors: sequences_colors(seqs_headers)

    });
  };


//   const extractNewickToUpload = (newick) => {

//     console.log(`***********-extractNewickToUpload-  newick:  ${ JSON.stringify(newick) }`);

//     setState({
//         newick_tree: newick,
//     });
//   }



  const getSequences = async () => {

    const { sequences } = state;

    console.log(`***********-getSequences-  sequences:  ${ JSON.stringify(sequences) }`);

    return sequences;
  };

  const getNewick = async () => {

      const { newick_tree } = state;

      console.log(`***********-getNewick-  newick_tree:  ${ JSON.stringify(newick_tree) }`);

      return newick_tree;
  };


//   const effectON = () => {

//     setState({
//         loading: true
//     })
//   }
  
//   const effectOFF = () => {

//     setState({
//         loading: false
//     })
//   }


//   const getLoading = async () => {

//     const { loading } = state;

//     console.log(`***********-getLoading-  loading:  ${ JSON.stringify(loading) }`);

//     return loading;
//   }


  const extractLoading = (loading) => {

    return loading;

  };

  const {newick, loading, sequences, newick_tree, colors} = state;

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
            { msj_fasta }
          </Typography>
        </ExpansionPanelDetails>

        <FastaUpload extractDataToUpload={extractDataToUpload} />
        {/* <FastaUpload extractDataToUpload={extractDataToUpload}  effectON={effectON} effectOFF={effectOFF}/> */}

      </ExpansionPanel>

      <ExpansionPanel TransitionProps={{ unmountOnExit: true }} disabled={!newick_tree} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Árbol filogenético</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
              { msj_tree }
          </Typography>
        </ExpansionPanelDetails>

        <DisplayTree newick={newick} getNewick={getNewick} colors={colors}/>

      </ExpansionPanel>


      <ExpansionPanel TransitionProps={{ unmountOnExit: true }} disabled={!sequences || sequences.length === 0} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Mapa</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
              { msj_map }
          </Typography>
        </ExpansionPanelDetails>

        <MapSequences getSequences={getSequences} colors={colors}/>

      </ExpansionPanel>



      {/* <BackLock extractLoading={extractLoading} /> */}

    <br/>
    <br/>


    </div>
    
  );
}
