import React, { Component } from 'react';

import { Tree } from "./src/tree.js";
import { drawTree, addLabels, rotateAtNode } from "./src/figtree.js";




const newickString =
        '((((((virus1:0.1,virus2:0.12)0.95:0.08,(virus3:0.011,virus4:0.0087)1.0:0.15)0.65:0.03,virus5:0.21)1.0:0.2,(virus6:0.45,virus7:0.4)0.51:0.02)1.0:0.1,virus8:0.4)1.0:0.1,(virus9:0.04,virus10:0.03)1.0:0.6);';



const tree = Tree.parseNewick(newickString);




drawTree(document.getElementById('phylogram_1a'), tree, { top: 10, bottom: 60, left: 10, right: 150}, rotateAtNode);




addLabels(document.getElementById('example'), '.internal-node .node-shape', "This is an internal node - it is a putitive<br>common ancestor of the viruses to the right" );
addLabels(document.getElementById('example'), '.internal-node .node-label', "This is a support value - it gives the degree<br>of statistical support that the viruses to the<br>right cluster together");
addLabels(document.getElementById('example'), '.external-node .node-shape', "This is an external or leaf node - it represents<br>a sampled, sequenced virus");
addLabels(document.getElementById('example'), '.external-node .node-label', "This is an external or leaf node - it represents<br>a sampled, sequenced virus");
addLabels(document.getElementById('example'), '.branch', "This is a branch - it represents an<br>evolutionary lineage joining two nodes");
addLabels(document.getElementById('example'), '.internal-node #node_0', "The root node - represents the most recent<br>common ancestor of the whole tree");


class PruebaTree extends Component {

    constructor(props){
        super(props);

        // this.state = {
        // };

        console.log("constructor");
    }





    render(){

        return(

            <div>

                <svg id="example"></svg>
                
            </div>

        );


    }



}

export default PruebaTree;
