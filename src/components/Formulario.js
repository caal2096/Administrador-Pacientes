import React, { useState, Fragment } from "react";
import uuid from "uuid/v4";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
	const [cita, actualizarCita] = useState({
		mascota: "",
		propetario: "",
		fecha: "",
		hora: "",
		sintomas: "",
	});

	const [error, actualizarError] = useState(false);

	// Extraer los valores, hace destrotorin para acortar el codigo para que no sea como cita.masta
	const { mascota, propetario, fecha, sintomas, hora } = cita;

	//Funcion que se ejecuata cada que el usario escribe en el imput

	const handleChange = (e) => {
		actualizarCita({
			//Hace una copia del state para luego reescribirlo
			...cita,

			[e.target.name]: e.target.value,
		});
	};

	//Cuando el usuario envia el form
	const submitCita = (e) => {
		e.preventDefault();
		//Validar
		if (
			mascota.trim() === "" ||
			propetario.trim() === "" ||
			fecha.trim() === "" ||
			sintomas.trim() === "" ||
			hora.trim() === ""
		) {
			actualizarError(true);
			return;
		}

		//Eliminar mensaje previo
		actualizarError(false);

		//Asignar Id
		cita.id = uuid();

		// Crear Cita
		crearCita(cita);

		// Reiniciar form
		actualizarCita({
			mascota: "",
			propetario: "",
			fecha: "",
			hora: "",
			sintomas: "",
		});
	};

	return (
		<Fragment>
			<h2 className="title">Crear Cita</h2>

			{error ? (
				<p className="alert-error"> Todos los campos son obligatorio</p>
			) : null}

			<form className="formulario" onSubmit={submitCita}>
				<div className="form-group">
					<label>Nombre Mascotas</label>
					<input
						type="text"
						name="mascota"
						className="u-full-width"
						placeholder="Nombre Mascota"
						onChange={handleChange}
						value={mascota}
					/>
				</div>
				<div className="form-group">
					<label>Nombre Dueño</label>
					<input
						type="text"
						name="propetario"
						className="u-full-width"
						placeholder="Nombre Dueño"
						onChange={handleChange}
						value={propetario}
					/>
				</div>
				<div className="form-group">
					<label>Fecha</label>

					<input
						type="date"
						name="fecha"
						className="u-full-width"
						onChange={handleChange}
						value={fecha}
					/>
				</div>
				<div className="form-group">
					<label>Hora</label>

					<input
						type="time"
						name="hora"
						className="u-full-width"
						onChange={handleChange}
						value={hora}
					/>
				</div>
				<div className="form-group">
					<label>Description</label>
					<textarea
						className="u-full-width"
						name="sintomas"
						onChange={handleChange}
						value={sintomas}
					/>
				</div>

				<button className="u-full-width button-primary" type="submit">
					Save
				</button>
			</form>
		</Fragment>
	);
};

Formulario.propTypes = {
	crearCita: PropTypes.func.isRequired,
};

export default Formulario;
