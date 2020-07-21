
import React from 'react';
import { post } from 'axios';
import AlertDialog from './AlertDialog';
import ErrorDialog from './ErrorDialog';
import BackLock from './BackLock';

export default class FastaUpload  extends React.Component {

	constructor(props) {
		super(props);

		//const { cleanFile } = this.props;
		//console.log(`***********-constructor-  cleanFile:  ${ cleanFile }`);

		this.state = {
			nombre: '',
			detalles: '',
			fasta_file: null,
			sequences: [],
			newick_tree: null,
			invalidFasta: false,
			loading: false,
			errorFasta:false,
			errorString:'',
			//shouldClean: cleanFile
		};
	}


	componentDidUpdate(prevProps){
		
		// const { cleanFile } = this.props;
		// console.log(`***********-componentDidUpdate-  cleanFile:  ${ cleanFile }`);
		// console.log(`***********-componentDidUpdate-  prevProps.cleanFile:  ${ prevProps.cleanFile }`);
		

		if(this.props.cleanFile && this.props.cleanFile !== prevProps.cleanFile){

			console.log(`***********-componentDidUpdate-  IF:  ${ this.props.cleanFile }`);

			//this.cleanFileData();
			this.setState({
				nombre: '',
				detalles: '',
				fasta_file: null,
			})
		}
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
					console.log(error.message)
					if(error.message == "Network Error"){
						this.effectOFF();
						this.setState({
							errorFasta: true,
							errorString: "El servicio de procesamiento no esta funcionando, por favor revisar"
						});
					}
					else if(error.message == "Request failed with status code 400" && (typeof error.response.data.nombre) == 'object'){
						this.effectOFF();
						this.setState({
						errorFasta: true,
						errorString: "El nombre del archivo ya ha sido utilizado anteriormente,por favor utilice otro"
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


	cleanFileData = () => {

		this.setState({
			nombre: '',
			detalles: '',
			fasta_file: null,
		})

		this.props.setCleanFile();
	}



render() {

	const { fasta_file, invalidFasta, loading, errorFasta, errorString, nombre, } = this.state;


		return (
			<form onSubmit={e => this.onFormSubmit(e)}>
				<h1>Fasta</h1>

				<div style={{display: "inline-flex", justifyContent: "space-between", width: "70%", fontSize: "medium"}}>

					<td>
						<label>Nombre</label>
						<input type="text" name="nombre" onChange={nombre => this.onChange(nombre)} value={nombre} />
					</td>


					<td>
						<input type="file" name="fasta_file" onChange={e => this.onChange(e)} id="fasta" key={nombre}/>
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


