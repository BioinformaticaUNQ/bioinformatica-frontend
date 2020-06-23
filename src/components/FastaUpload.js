
import React from 'react';
import axios, { post } from 'axios';

export default class FastaUpload  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nombre:'',
			detalles:'',
			fasta_file:null
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
		.then( resp => {console.log(resp);
			alert('Archivo subido correctamente');
		})
		.catch(error => {
			alert('No se pudo subir el archivo: '+JSON.stringify(error.response.data));
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
			</form>
		);
	}

}


