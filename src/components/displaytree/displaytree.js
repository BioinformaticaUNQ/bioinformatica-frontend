import React from 'react';
import Phylotree from "../phylotree/phylotree.jsx";
import SVG from "../phylotree/svg.jsx";
import TooltipContainer from "../phylotree/tooltip_container.jsx";

// https://developer.aliyun.com/mirror/npm/package/react-phylotree 

// https://github.com/nextstrain/phyloTree
// https://github.com/Akshit-/treemap
// https://github.com/glouwa/d3-hypertree
// https://github.com/rambaut/figtree.js
// https://github.com/gregtatum/tree-editor

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
      fill='black'
    />
    <text
      x={100}
      y={50}
      fill="white"
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
      height: 550,
      alignTips: "right",
      sort: null,
      internal: true,
      newick: null,
    };
  }


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


  render() {
	const { width, height, newick } = this.state;
	
	//var newick = '(WP_037127040.1_cytochrome_c_family_protein__Rhizobium_sp._CF097_:0.8739629220,(NP_001285984.1_cytochrome_c_proximal__isoform_B__Drosophila_melanogaster_:0.2257576382,(NP_061820.1_cytochrome_c__Homo_sapiens_:0.0444042475,bartmosca:0.0497006668)76.4/70:0.0846359924)82/82:0.3135776502,(CBJ31344.1_Cytochrome_c__Ectocarpus_siliculosus_:0.3016561411,(KAE8767936.1_Cytochrome_c__Hordeum_vulgare_:0.1017417046,((QEE59979.1_cytochrome_c__Betula_platyphylla_:0.0419600515,KAE9612850.1_Cytochrome_c__Lupinus_albus_:0.0223135394)74.6/72:0.0208958552,NP_001363126.1_cytochrome_c__Vigna_radiata_:0.0068358208)86.9/79:0.0578703709)28.7/42:0.0939446480)26.3/60:0.1878425126)';

	
	console.log(`***********-displayTree render-  newick:  ${ JSON.stringify(newick) }`);

    return (
      <div>
        <SVG width={width} height={height} >
          <Phylotree
		  	maxLabelWidth={100}
            width={width-5*2}
            height={height-5*2}
            newick={newick}
            internalNodeLabels={true}
            highlightBranches={true}
            alignTips='left'
            tooltip={TooltipContents}
			branchStyler={ () => ( {strokeWidth: 6, stroke: "green" } ) }
          />
        </SVG>
      </div>
    );
  }
}

export default DisplayTree;
