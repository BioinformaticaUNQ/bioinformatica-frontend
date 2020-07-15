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
      height: 600,
      alignTips: "right",
      sort: null,
      internal: true,
      newick: props.newick,
    };
  }

  render() {
    const { width, height } = this.state;
    const newick = this.state.newick;
    return (
      <div>
        <SVG width={width} height={height}>
          <Phylotree
            width={width-5*2}
            height={height-5*2}
            newick={newick}
            internalNodeLabels={true}
            highlightBranches={true}
            alignTips='left'
            tooltip={TooltipContents}
            branchStyler={()=>({strokeWidth:7})}
          />
        </SVG>
      </div>
    );
  }
}

export default DisplayTree;
