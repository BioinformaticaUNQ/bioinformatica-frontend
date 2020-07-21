import React from 'react';
import Phylotree from "../phylotree/phylotree.jsx";
import SVG from "../phylotree/svg.jsx";
import TooltipContainer from "../phylotree/tooltip_container.jsx";

function TooltipContents(props) {
  return (<TooltipContainer 
    tooltip_width={200}
    tooltip_height={100}
    {...props}
  >
    <rect
      x={0}
      y={0}
      width={200}
      height={100}
      rx={15}
      fill='grey'
    />
    <text
      x={100}
      y={50}
      fill="black"
	  textAnchor="middle"
    >
      {props.data.name}
    </text>
  </TooltipContainer>);
}

class DisplayTree extends React.Component {

  constructor(props) {

	super(props);
	
    this.state = {
      tree: null,
      width: 1200,
      height: 1000,
      alignTips: "right",
      sort: null,
      internal: true,
      newick: null,
      colors: props.colors
    };
  };


	componentWillMount(){
			
		console.log("cacatua_tree");

		this.handlerNewick();
	}



	handlerNewick = async () => {

		const { getNewick } = this.props;

		var newick = await getNewick();

		await this.setNewick(newick);
	}


	setNewick = async (newick) => {

		console.log(`***********-setNewick-  newick:  ${ JSON.stringify(newick) }`);

		this.setState({
			newick: newick
		});
	}

  seq_colors = (branch) => {
    const fill = 'children' in branch ? 'black' : this.state.colors[branch.name]
    return { fill };
  }

  render() {
    const { width, height, newick, colors } = this.state;
	
	  console.log(`***********-displayTree render-  newick:  ${ JSON.stringify(newick) }`);
    
    // ARBOLES DE PRUEBA
	  // const newick1 = '((((Pig:0.147969,Cow:0.21343):0.085099,Horse:0.165787,Cat:0.264806):0.058611,((RhMonkey:0.002015,Baboon:0.003108):0.022733,(Human:0.004349,Chimp:0.000799):0.011873):0.101856):0.340802,Rat:0.050958,Mouse:0.09795)';
	  // const newick2 = '((((Pig{Test}:0.147969,Cow{Test}:0.21343){Test}:0.085099,Horse{Test}:0.165787,Cat{Test}:0.264806):0.058611,((RhMonkey{Reference}:0.002015,Baboon{Reference}:0.003108){Reference}:0.022733,(Human{Reference}:0.004349,Chimp{Reference}:0.000799){Reference}:0.011873):0.101856):0.340802,Rat:0.050958,Mouse:0.09795)';
	  // const newick3 = "(prueba3|41.87194|12.56738|113{Test}:0.0000010000,prueba4|4.570868|-74.297333|11{Test}:0.0000010000,(prueba5|53.4129105|-8.2438898|{Test}:0.0000010000,(prueba2|40.463667|-3.74922|112:0.0000010000,prueba1|-38.416097|-63.616672|:0.0024696015)30:0.0000010000)34:0.0000010000)";
	  // const newick4 = "((prueba3:0.0000010000,prueba4:0.0000010000,(prueba5:0.0000010000,(prueba2:0.0000010000,prueba1:0.0024696015)30:0.0000010000)34:0.0000010000)";
    // const newick5 = "(WP_037127040.1_cytochrome_c_family_protein__Rhizobium_sp._CF097_:0.8739629220,(NP_001285984.1_cytochrome_c_proximal__isoform_B__Drosophila_melanogaster_:0.2257576382,(NP_061820.1_cytochrome_c__Homo_sapiens_:0.0444042475,bartmosca:0.0497006668)76.4/70:0.0846359924)82/82:0.3135776502,(CBJ31344.1_Cytochrome_c__Ectocarpus_siliculosus_:0.3016561411,(KAE8767936.1_Cytochrome_c__Hordeum_vulgare_:0.1017417046,((QEE59979.1_cytochrome_c__Betula_platyphylla_:0.0419600515,KAE9612850.1_Cytochrome_c__Lupinus_albus_:0.0223135394)74.6/72:0.0208958552,NP_001363126.1_cytochrome_c__Vigna_radiata_:0.0068358208)86.9/79:0.0578703709)28.7/42:0.0939446480)26.3/60:0.1878425126);";

    const dynamic_height = Object.keys(colors).length*25;
    const overflow = {
      height: 500,
      overflowY:'scroll'
    };
    return (
      <div style={ overflow }>
        <SVG width={width} height={dynamic_height} padding={25}>
          <Phylotree
		  	    //maxLabelWidth={100}
            width={width-5*2}
            height={dynamic_height-5*2}
            newick={newick}
            internalNodeLabels={true}
            labelStyler={this.seq_colors}
            alignTips='left'
            tooltip={TooltipContents}
			      branchStyler={ () => ( { strokeWidth: 4} ) }
			      //labelStyler={ () => ({ width: "200" }) } 
          />
        </SVG>
      </div>
    );
  }
}

export default DisplayTree;
