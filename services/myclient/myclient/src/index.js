import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';  // nuevo
import Listarempleado from './component/Listarempleado';
import InsertarEmpleado from './component/InsertarEmpleado';
 
class App extends Component {
    // nuevo
    constructor() {
        super();
       // nuevo
       this.state ={
          users: [],
          username: '',
          email: '',
          address: '',
          phone: '',
          age: '',

       };
       this.addUser = this.addUser.bind(this);  // new
       this.handleChange = this.handleChange.bind(this);
      };

      handleChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
      };
      
      
    // nuevo
    componentDidMount() {
      this.getUsers();
    };
    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)  // nuevo
        .then((res) =>{ this.setState({ users: res.data.data.users }); })
        .catch((err) =>{ console.log(err); });
       };

       addUser(event) {
        event.preventDefault();
        //console.log('TRAUMA TOTAL!');
        //console.log(this.state);
        const data = {
          username: this.state.username,
          email: this.state.email,
          address: this.state.address,
          phone: this.state.phone,
          age: this.state.age
       };

        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
        .then((res) => {
          this.getUsers();
          this.setState({ username: '', email: '', address: '', phone: '', age: ''});
        })   
          .catch((err) => { console.log(err);});

      };
                
       render() {
        return (
          <section className="section">
            <div className="container">
            <div className="column is-full">
                  <h1 className="title is-1">Alumnos desprobados - Arquitectura Software</h1>
                  </div>
              <div className="columns">
                  
                  <br/>
                  <div className="column is-two-fifths">
                  <hr/><br/>
                  <InsertarEmpleado 
                  username={this.state.username}
                  email={this.state.email}
                  address={this.state.address}
                  phone={this.state.phone} 
                  age={this.state.age}                  
                  addUser={this.addUser}
                  handleChange={this.handleChange}  // new
                  /> 
                  </div>
                  <hr/><br/>
                  <div className="column">
                  <Listarempleado users={this.state.users}/>
                  </div>
                
              </div>
            </div>
          </section>
        )
      }
      
};
ReactDOM.render(
  <App />,
  document.getElementById('root')
);