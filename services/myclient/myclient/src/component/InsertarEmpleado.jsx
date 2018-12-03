import React from 'react';

const InsertarEmpleado = (props) => {
  return (   
    <form onSubmit={(event) => props.addUser(event)}>
      <div className="field">
      <label>Usuario: </label>
        <input
          name="username"
          className="input"
          type="text"
          placeholder="Ingresa un jalado"
          required
          value={props.username}  // nuevo
          onChange={props.handleChange}  // new
        />
      </div>
      <div className="field">
      <label>Correo: </label>
        <input
          name="email"
          className="input"
          type="email"
          placeholder="Ingresa un correo"
          required
          value={props.email}  // nuevo
          onChange={props.handleChange}  // new
        />
      </div>
      <div className="field">
      <label>Direccion: </label>
        <input
          name="address"
          className="input"
          type="text"
          placeholder="Ingresa una direccion"
          required
          value={props.address}  // nuevo
          onChange={props.handleChange}  // new
        />
      </div>
      <div className="field">
      <label>Telefono: </label>
        <input
          name="phone"
          className="input"
          type="text"
          placeholder="Ingresa un Telefono"
          required
          value={props.phone}  // nuevo
          onChange={props.handleChange}  // new
        />
      </div>
      <div className="field">
      <label>Edad: </label>
        <input
          name="age"
          className="input"
          type="text"
          placeholder="Ingresa un Edad"
          required
          value={props.age}  // nuevo
          onChange={props.handleChange}  // new
        />
      </div>
      <input
        type="submit"
        className="button is-primary is-large is-fullwidth"
        value="Submit"
      />
    </form>    
  )
};

export default InsertarEmpleado;
