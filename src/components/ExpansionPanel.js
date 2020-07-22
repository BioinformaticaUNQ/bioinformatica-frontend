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
import CleanButton from './CleanButton';
//import BackLock from './BackLock';
import { sequences_colors } from '../utils/utils';
import { Newick } from 'newick';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '94%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    opacity: "3.38",
  },
  heading2: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    opacity: "3.38",
    color: "blanchedalmond"
  },
}));

export default function SimpleExpansionPanel() {
  const classes = useStyles();


  var msj_fasta = " Se solicita ingresar un archivo con formato fasta (puede estar alineado o no) y extensión “xxxx.fasta”.  Por ahora solo se aceptan cadenas de nucleotidos.  " + "\n" +
                    " Formato de header esperado:   ' >Id de la secuiencia | Latitud | Longitud | nombre de la secuencia  '   " + "\n" + "            ." + "\n" +
                    " Latitud:  número comprendido entre -90 y 90.  "  + "\n" +
                    " Longitud:  número comprendido entre -180 y 180";


 var msj_tree = "Para construir el árbol filogenético estamos utilizando la herramienta iqtree con bootstrap seteado en 1000";

 var msj_map = "Con respecto al mapa solo se ubicaran las secuencias que están seteadas con el formato de header antes descripto ";


  const initialState = {
    sequences: [],
    newick_tree: null,
    expand_tree: false,
    expand_map: false,
    cleanFile: false,
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


  const cleanData = () => {

    setState({
        ...state,
        sequences: [],
        newick_tree: null,
        expand_tree: false,
        expand_map: false,
        cleanFile: true
    })

  }
  

 
  const setCleanFile = () => {
    setState({
        cleanFile: false
    })
  }



    const handleClickTree = () => {

        const { expand_tree } = state;

        console.log(`***********-handleClickTree-  expand_tree:  ${ JSON.stringify(expand_tree) }`);

        setState({
            ...state,
            expand_tree: !expand_tree
        });
    }


    const handleClickMap = () => {

        const { expand_map } = state;

        setState({
            ...state,
            expand_map: !expand_map
        });
    }


  const extractLoading = (loading) => {

    return loading;

  };

  const {newick, loading, sequences, newick_tree, colors, expand_tree, expand_map, cleanFile} = state;

  return (
    <div className={classes.root}>
      <ExpansionPanel name="fasta">
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

        <FastaUpload extractDataToUpload={extractDataToUpload} cleanFile={cleanFile} setCleanFile={setCleanFile} />
        {/* <FastaUpload extractDataToUpload={extractDataToUpload}  effectON={effectON} effectOFF={effectOFF}/> */}

      </ExpansionPanel>

      {/* <ExpansionPanel TransitionProps={{ unmountOnExit: true }} disabled={!newick_tree} > */}
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }} disabled={!newick_tree} onChange={handleClickTree} name="arbol" expanded={expand_tree} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={ !newick_tree ? classes.heading2 : classes.heading }>Árbol Filogenético</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
              { msj_tree }
          </Typography>
        </ExpansionPanelDetails>

        <DisplayTree newick={newick} getNewick={getNewick} colors={colors}/>

      </ExpansionPanel>


      {/* <ExpansionPanel TransitionProps={{ unmountOnExit: true }} disabled={!sequences || sequences.length === 0}  expanded={expand_map} id="map2" > */}
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }} disabled={!sequences || sequences.length === 0} name="map2" expanded={expand_map} onChange={handleClickMap} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          //onClick={handleClickMap}
          //onChange={handleClickMap}
          //id="map"
        >
          <Typography className={ (!sequences || sequences.length === 0) ? classes.heading2 : classes.heading } >Mapa</Typography>
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

    <CleanButton  cleanData={cleanData} disabled={!newick_tree}/>

    <br/>

    </div>
    
  );
}
