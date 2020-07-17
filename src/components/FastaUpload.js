
import React from 'react';
import { post } from 'axios';

export default class FastaUpload  extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			nombre: '',
			detalles: '',
			fasta_file: null,
			sequences: [],
			newick_tree: null
		};
	}

	onFormSubmit(e) {
		e.preventDefault();
		//Esto hay que centralizarlo en un servicio de env o algo asi
		const url = 'http://localhost:8000/api/fastas/';
    	const formData = new FormData();
		formData.append('fasta_file',this.state.fasta_file);
		formData.append('nombre', this.state.nombre);
		formData.append('detalles', this.state.detalles);
    	const config = {
        headers: {
					'content-type': 'multipart/form-data'
        }
	};
	

	post(url, formData,config)
		.then( resp => {

			const { extractDataToUpload } = this.props;

			//effectOFF();

			console.log(`***********--  resp:  ${ JSON.stringify(resp) }`);
			//console.log(resp);
			alert('Archivo subido correctamente');

			const { sequences, newick_tree } = resp.data;
			console.log(`***********--  sequences:  ${ JSON.stringify(sequences) }`);
			console.log(`***********--  newick_tree:  ${ JSON.stringify(newick_tree) }`);

			this.setState({
				sequences: sequences,
				newick_tree: newick_tree
			});

			extractDataToUpload(sequences, newick_tree);
		})
		.catch(error => {
			//alert('No se pudo subir el archivo: '+JSON.stringify(error.response.data));
			alert(`No se pudo subir el archivo:  ${ JSON.stringify(error) }`);
		});
	}


	valueForType(target) {
		return target.type === 'text' ? target.value : target.files[0];
	}


	onChange(e) {

		const target = e.target;
    	const value = this.valueForType(target);
		this.setState({[target.name]:value});
	}
	
	
	// handlerButton = () => {
		
	// 	const { effectON } = this.props;

	// 	effectON();
	// }


	// getSequences = () => {

	// 	const { sequences } = this.state;

	// 	return sequences;
	// }



render() {
		return (
			<form onSubmit={e => this.onFormSubmit(e)}>
				<h1>Fasta</h1>

				<div style={{display: "inline-flex", justifyContent: "space-between", width: "70%", fontSize: "medium"}}>

					<td>
						<label>Nombre</label>
						<input type="text" name="nombre" onChange={nombre => this.onChange(nombre)}/>
					</td>

					<td>
						<label>Detalles</label>
						<input type="text" name="detalles" onChange={detalles => this.onChange(detalles)}/>
					</td>

					<td>
						<input type="file" name="fasta_file" onChange={e => this.onChange(e)} />
						<button type="submit"  >Enviar Peticion</button>
					</td>

				</div>


				<br/>
				<br/>
				<br/>


			</form>


		);
	}

}


