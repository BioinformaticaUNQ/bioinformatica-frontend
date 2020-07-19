
import React from 'react';
import { post } from 'axios';
import AlertDialog from './AlertDialog';
import ErrorDialog from './ErrorDialog';
import BackLock from './BackLock';

export default class FastaUpload  extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			nombre: '',
			detalles: '',
			fasta_file: null,
			sequences: [],
			newick_tree: null,
			invalidFasta: false,
			loading: false,
			errorFasta:false,
			errorString:''
		};
	}

	onFormSubmit(e) {

		e.preventDefault();
		//Esto hay que centralizarlo en un servicio de env o algo asi
		const url = 'http://localhost:8000/api/fastas/';
		const formData = new FormData();
		
		const { fasta_file, nombre, detalles } = this.state;

		if( fasta_file && fasta_file.name && fasta_file.name.includes(".fasta") ){

			this.effectON();

			//this.sendLoading();

			console.log(`***********-onFormSubmit-  fasta_file:  ${ fasta_file} `);
			console.log(`***********-onFormSubmit-  fasta_file.name:  ${ fasta_file.name} `);

			formData.append('fasta_file', fasta_file);
			formData.append('nombre', nombre);
			formData.append('detalles', detalles);
	
			const config = {
				headers: {
							'content-type': 'multipart/form-data'
						}
			};
		
			post(url, formData, config)
				.then( resp => {
	
					const { extractDataToUpload } = this.props;
		
					console.log(`***********--  resp:  ${ JSON.stringify(resp) }`);
					//console.log(resp);
					//alert('Archivo subido correctamente');
	
					const { sequences, newick_tree } = resp.data;
					console.log(`***********--  sequences:  ${ JSON.stringify(sequences) }`);
					console.log(`***********--  newick_tree:  ${ JSON.stringify(newick_tree) }`);
	
					this.setState({
						sequences: sequences,
						newick_tree: newick_tree
					});
	
					extractDataToUpload(sequences, newick_tree);

					this.effectOFF();
				})
				.catch(error => {
					if(error.message == "Network Error"){
						this.effectOFF();
						this.setState({
							errorFasta: true,
							errorString: "Atentx no tenes levantado el backend"
						});
					}
					else{
					this.effectOFF();
					this.setState({
						errorFasta: true,
						errorString: JSON.stringify(error.response.data.non_field_errors[0])
					});
					//alert(`No se pudo subir el archivo:  ${ JSON.stringify(error) }`);
					//alert(`No se pudo subir el archivo:  ${ JSON.stringify(error.response.data.non_field_errors[0]) }`)
					}
				});

		}else{

			//alert("No te pases de vivo!!");
			this.setState({
				invalidFasta: true
			});

		}

	}


	valueForType(target) {

		return target.type === 'text' ? target.value : target.files[0];
	}


	onChange(e) {

		const target = e.target;
		const value = this.valueForType(target);
		console.log(`***********-onChange-  value:  ${ JSON.stringify(value) }`);
		//console.log(`***********-onChange-  target:  ${ JSON.stringify(target) }`);
		
		this.setState({[target.name]:value});
	}
	


	handleCloseModal = () => {

			this.setState({
		invalidFasta: false,
		errorFasta:false
			})
	}



	effectON = () => {

		this.setState({
			loading: true
		})
	}
	
	  
	effectOFF = () => {
	
		this.setState({
			loading: false
		})
	}


	// sendLoading = () => {

	// 	const { loading } = this.state;

	// 	const { extractLoading } = this.props;

	// 	extractLoading(loading);
	// }




render() {

	const { fasta_file, invalidFasta, loading,errorFasta,errorString } = this.state;

		return (
			<form onSubmit={e => this.onFormSubmit(e)}>
				<h1>Fasta</h1>

				<div style={{display: "inline-flex", justifyContent: "space-between", width: "70%", fontSize: "medium"}}>

					<td>
						<label>Nombre</label>
						<input type="text" name="nombre" onChange={nombre => this.onChange(nombre)}/>
					</td>


					<td>
					{/* accept=".fasta" */}
						<input type="file" name="fasta_file" onChange={e => this.onChange(e)}  />
						<button type="submit" disabled={!fasta_file} >Enviar Peticion</button>
					</td>

				</div>


				<br/>
				<br/>
				<br/>

				<AlertDialog invalidFasta={invalidFasta} handleCloseModal={this.handleCloseModal} textError="No es un archivo formato de fasta" />
				<ErrorDialog errorInFile={errorFasta} handleCloseModal={this.handleCloseModal} textError={errorString} />

				<BackLock loading={loading} />

			</form>


		);
	}

}


