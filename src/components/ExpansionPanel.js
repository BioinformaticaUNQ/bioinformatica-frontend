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
    newick3: '(0564_7,(((((0564_11,0564_4)Node20,(0564_1,(0564_21,0564_5)Node25)Node23)Node19,0564_17)Node18,((0564_13,(0564_15)Node32)Node30,((0564_22,0564_6)Node36,0564_3)Node35)Node29)Node17,0564_9)Node16,(((0557_24,0557_4,0557_2)Node9,0557_12)Node8,((0557_21,0557_6,0557_9,0557_11,0557_13,0557_26,(0557_5,0557_7)Node53)Node6,0557_25)Node7)Separator)',
    newick2: '(WP_037127040.1_cytochrome_c_family_protein__Rhizobium_sp._CF097_:0.8739629220,(NP_001285984.1_cytochrome_c_proximal__isoform_B__Drosophila_melanogaster_:0.2257576382,(NP_061820.1_cytochrome_c__Homo_sapiens_:0.0444042475,bartmosca:0.0497006668)76.4/70:0.0846359924)82/82:0.3135776502,(CBJ31344.1_Cytochrome_c__Ectocarpus_siliculosus_:0.3016561411,(KAE8767936.1_Cytochrome_c__Hordeum_vulgare_:0.1017417046,((QEE59979.1_cytochrome_c__Betula_platyphylla_:0.0419600515,KAE9612850.1_Cytochrome_c__Lupinus_albus_:0.0223135394)74.6/72:0.0208958552,NP_001363126.1_cytochrome_c__Vigna_radiata_:0.0068358208)86.9/79:0.0578703709)28.7/42:0.0939446480)26.3/60:0.1878425126);',
    newick: '((((Pig{Test}:0.147969,Cow{Test}:0.21343){Test}:0.085099,Horse{Test}:0.165787,Cat{Test}:0.264806):0.058611,((RhMonkey{Reference}:0.002015,Baboon{Reference}:0.003108){Reference}:0.022733,(Human{Reference}:0.004349,Chimp{Reference}:0.000799){Reference}:0.011873):0.101856):0.340802,Rat:0.050958,Mouse:0.09795);'
  };


  const [state, setState] = React.useState(initialState);



  const extractDataToUpload = (seqs, newick) => {

    console.log(`***********-extractDataToUpload-  seqs:  ${ JSON.stringify(seqs) }`);
    console.log(`***********-extractDataToUpload-  newick:  ${ JSON.stringify(newick) }`);

    setState({
        sequences: seqs,
        newick_tree: newick,
    });
  }


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
  }


  const getNewick = async () => {

      const { newick_tree } = state;

      console.log(`***********-getNewick-  newick_tree:  ${ JSON.stringify(newick_tree) }`);

      return newick_tree;
  }


  const effectON = () => {

    setState({
        loading: true
    })
  }

  
  const effectOFF = () => {

    setState({
        loading: false
    })
  }


  const getLoading = async () => {

    const { loading } = state;

    console.log(`***********-getLoading-  loading:  ${ JSON.stringify(loading) }`);

    return loading;
  }


  const {newick, newick2, newick3, loading} = state;


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

        <FastaUpload extractDataToUpload={extractDataToUpload}  />
        {/* <FastaUpload extractSequencesToUpload={extractSequencesToUpload} extractNewickToUpload={extractNewickToUpload}  effectON={effectON} effectOFF={effectOFF}/> */}

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
              { msj_tree }
          </Typography>
        </ExpansionPanelDetails>

        <DisplayTree newick={newick} getNewick={getNewick}  />

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
              { msj_map }
          </Typography>
        </ExpansionPanelDetails>

        <MapSequences getSequences={getSequences} />

      </ExpansionPanel>



      {/* <BackLock loading={loading} getLoading={getLoading} /> */}

    </div>


// {
//     loading ? 
//         <Effect></Effect>
//         : <p></p>
// }

    

  );
}
