import React from 'react';
 
const styles = {
    color: "black",
    marginTop: "50px",
    marginLeft: "0px",
    float: "center",
    fontSize: "18px"
};
const Listarempleado = (props) => {
  return (

    <div className="well" style={styles}> 
      <legend className="text-center header" >Lista de desaprobados</legend>
              <div>
                      <table className="table table-striped"  >
                         <thead className="thead-dark">
                            <tr>
                              <th scope="col">Usuario</th>
                              <th scope="col">Email</th> 
															<th scope="col">Direccion</th>                           
															<th scope="col">Telefono</th> 
															<th scope="col">Nota</th> 
                            </tr>
                          </thead>
													<tbody >
      {              
        props.users.map((user) => {
          return (                   
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
												<td>{user.address}</td>  
												<td>{user.phone}</td>  
												<td>{user.age}</td>                        
                    </tr>                    
          )
        })
			}
							</tbody> 
                </table>                     
        </div>
    </div> 
  )
};
 
export default Listarempleado;