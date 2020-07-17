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
