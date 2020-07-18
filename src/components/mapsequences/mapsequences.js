import React from 'react';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "./mapsequences.css";

// import axios, { get } from 'axios';


const secuences_mock = [
			{
					"id": 24,
					"gb_id": "DQ362940.1",
					"sequence": "ATGTCTTGGAAAGTGGTGATCATTTTTTCATTGTTAATAACACCTCAACACGGTCTTAAAGAGAGCTATTTAGAAGAGTCATGTAGCACTATAACTGAAGGATATCTCAGTGTTCTGAGGACAGGTTGGTATACCAACGTTTTTACACTGGAGGTAGGTGATGTAGAGAACCTTACATGTGCTGATGGACCTAGCTTAATAAAAACAGAATTAGACCTGACCAAAAGTGCACTAAGAGAGCTCAGAACAGTTTCTGCTGATCAACTGGCAAGAGAGGAGCAAATTGAGAATCCCAGACAATCTAGATTTGTTCTAGGAGCAATAGCACTCGGTGTTGCAACAGCAGCTGCAGTTACAGCAGGTGTTGCAATTGCCAAAACCATCCGGCTTGAAAGTGAAGTAACAGCAATTAAGAATGCCCTCAAAAAGACCAATGAAGCAGTATCTACATTGGGGAATGGAGTTCGAGTGTTGGCAACTGCAGTGAGGGAGCTGAAAGATTTTGTGAGCAAGAATCTAACACGTGCAATCAACAAAAACAAGTGCGACATTGCTGACCTGAAAATGGCCGTTAGCTTCAGTCAATTCAACAGAAGGTTTCTAAATGTTGTGCGGCAATTTTCAGACAATGCTGGAATAACACCAGCAATATCCTTGGACTTAATGACAGATGCTGAACTAGCCAGAGCTGTTTCCAACATGCCAACATCTGCAGGACAAATAAAACTGATGTTGGAGAACCGTGCAATGGTAAGAAGAAAGGGGTTCGGAATCCTGATAGGAGTTTACGGAAGCTCCGTAATTTACATGG",
					"latitude": 30.0,
					"longitude": 95.0,
					"fasta": 36
			},
			{
					"id": 25,
					"gb_id": "DQ362939.1",
					"sequence": "ATGTCTTGGAAAGTGGTGATCATTTTTTCATTGTTAATAACACCTCAACACGGTCTTAAAGAGAGCTATTTAGAAGAGTCATGTAGCACTATAACTGAAGGATATCTCAGTGTTCTGAGGACAGGTTGGTATACCAACGTTTTTACACTGGAGGTAGGTGATGTAGAGAACCTTACATGTGCTGATGGACCTAGCTTAATAAAAACAGAATTAGACCTGACCAAAAGTGCACTAAGAGAGCTCAGAACAGTTTCTGCTGATCAACTGGCAAGAGAGGAGCAAATTGAGAATCCCAGACAATCTAGATTTGTTCTAGGAGCAATAGCACTCGGTGTTGCAACAGCAGCTGCAGTTACAGCAGGTGTTGCAATTGCCAAAACCATCCGGCTTGAAAGTGAAGTAACAGCAATTAAGAATGCCCTCAAAAAGACCAATGAAGCAGTATCTACATTGGGGAATGGAGTTCGAGTGTTGGCAACTGCAGTGAGGGAGCTGAAAGATTTTGTGAGCAAGAATCTAACACGTGCAATCAACAAAAACAAGTGCGACATTGCTGACCTGAAAATGGCCGTTAGCTTCAGTCAATTCAACAGAAGGTTTCTAAATGTTGTACGGCAATTTTCAGACAATGCTGGAATAACACCAGCAATATCCTTGGACTTAATGACAGATGCTGAACTAGCCAGAGCTGTTTCCAACATGCCAACATCTGCAGGACAAATAAAACTGATGTTGGAGAACCGTGCAATGGTAAGAAGAAAAGGGTTCGGAATCCTGATAGGAGTTTACGGAAGCTCCGTAATTTACATGG",
					"latitude": 15.0,
					"longitude": 125.0,
					"fasta": 36
			},
			{
					"id": 26,
					"gb_id": "AY530092.1",
					"sequence": "ATGTCTTGGAAAGTGGTGATCATTTTTTCATTGTTAATAACACCTCAACACGGTCTTAAAGAGAGCTATTTAGAAGAGTCATGTAGCACTATAACTGAAGGATATCTCAGTGTTCTGAGGACAGGTTGGTATACCAACGTTTTTACACTGGAGGTAGGTGATGTAGAGAACCTTACATGTGCTGATGGACCTAGCTTAATAAAAACAGAATTAGACCTGACCAAAAGTGCACTAAGAGAGCTCAGAACAGTTTCTGCTGATCAACTGGCAAGAGAGGAGCAAATTGAGAATCCCAGACAATCTAGATTTGTTCTAGGAGCAATAGCACTCGGTGTTGCAACAGCAGCTGCAGTTACAGCAGGTGTTGCAATTGCCAAAACCATCCGGCTTGAAAGTGAAGTAACAGCAATTAAGAATGCCCTCAAAAAGACCAATGAAGCAGTATCTACATTGGGGAATGGAGTTCGAGTGTTGGCAACTGCAGTGAGGGAGCTGAAAGATTTTGTGAGCAAAAATCTAACACGTGCAATCAACAAAAACAAGTGCGACATTGCTGACCTGAAAATGGCCGTTAGCTTCAGTCAATTCAACAGAAGGTTTCTAAATGTTGTGCGGCAATTTTCAGACAATGCTGGAATAACACCAGCAATATCCTTGGACTTAATGACAGATGCTGAACTAGCCAGAGCTGTTTCCAACATGCCAACATCTGCAGGACAAATAAAACTGATGTTGGAGAACCGTGCAATGGTAAGAAGAAAGGGGTTCGGAATCCTGATAGGAGTTTACGGAAGCTCCGTAATTTACATGG",
					"latitude": 45.0,
					"longitude": 75.0,
					"fasta": 36
			},
			{
					"id": 26,
					"gb_id": "GARCA.1",
					"sequence": "GARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCAGARCA",
					"latitude": -38.416097,
					"longitude": -63.616672,
					"fasta": 36
					// si pongo los valores invertidos funciona, sino termina en el agua...
			}
		];

export default class MapSequences extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			sequences: [],
			activeSeq: null,
		};
	}


	componentWillMount(){
		
		console.log("cacatua_map");

		this.handlerSequences();
	}


	handlerSequences = async () => {

		const { getSequences } = this.props;

		var seqs = await getSequences();

		await this.setSequences(seqs);
	}


	setSequences = async (seqs) => {

		console.log(`***********-setSequences-  seqs:  ${ JSON.stringify(seqs) }`);

		this.setState({
			sequences: seqs
		});
	}



	setActiveSeq = (seq) => {
		this.setState({
			activeSeq: seq
		})
	}



	render() {
		
		const { sequences, activeSeq } = this.state;

		console.log(`***********-render map-  sequences.length :  ${ JSON.stringify(sequences.length) }`);
		
		const filteredSequences = sequences.filter( seq => seq.latitude && seq.longitude );
		
		console.log(`***********-render map-  filteredSequences.length :  ${ JSON.stringify(filteredSequences.length) }`);
		
		console.log(`***********-render map-  filteredSequences :  ${ JSON.stringify(filteredSequences) }`);

		return (
			<div className='container'>
				<Map center={[45.4, -75.7]} zoom={2}>
					<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					//noWrap
					/>
					{
						filteredSequences.map( seq => (
							
							<Marker
								key={seq.id}
								position={[
									seq.latitude,
									seq.longitude,
								]}
								attribution={seq.id}
								onclick ={ () => {this.setActiveSeq(seq)}}
							/>
						))
					}
					{activeSeq && (
						<Popup
						position={[
							activeSeq.latitude,
							activeSeq.longitude,
						]}
						onClose={() => {
							this.setActiveSeq(null);
						}}
					>
						<div>
							<h2>{activeSeq.gb_id}</h2>
						</div>
					</Popup>
					)}
				</Map>
			</div>
		);
	}
}