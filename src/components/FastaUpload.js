
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

			const { extractSequencesToUpload } = this.props;

			console.log(`***********--  resp:  ${ JSON.stringify(resp) }`);
			//console.log(resp);
			alert('Archivo subido correctamente');

			const { sequences } = resp.data;
			console.log(`***********--  sequences:  ${ JSON.stringify(sequences) }`);

			this.setState({
				sequences: sequences
			});

			extractSequencesToUpload(sequences);
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


	// handlerTree = () => {


	// }

	getSequences = () => {

		const { sequences } = this.state;

		return sequences;
	}



render() {
		return (
			<form onSubmit={e => this.onFormSubmit(e)}>
				<h1>Fasta</h1>
				<label>Nombre</label>
				<input type="text" name="nombre" onChange={nombre => this.onChange(nombre)}/>
				<label>Detalles</label>
				<input type="text" name="detalles" onChange={detalles => this.onChange(detalles)}/>
				<input type="file" name="fasta_file" onChange={e => this.onChange(e)} />
				<button type="submit">Enviar Peticion</button>

				{/* <div>
					<button onClick={} > Ir al Arbolito</button>
				</div> */}

				<br/>
				<br/>
				<br/>


			</form>


		);
	}

}


