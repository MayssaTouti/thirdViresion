import React, {Fragment,  useEffect, useState } from 'react'
import {FaUserTimes} from 'react-icons/fa'; 
import {FaUserPlus} from 'react-icons/fa'; 
import InputUser from './InputUser';
const ListeSimpleUser =  ()  => {
  const [utilisateur, setUser] = useState([]);


//blocked function 
const blockfunction = async (id) =>  {
  try{
    const blockUser = await fetch(`http://localhost:5000/deleteUser/${id}`, {
      method: "DELETE"
    });
    console.log(blockUser);
    setUser(utilisateur.filter(utilisateur => utilisateur.id_user !== id))
  
  }
catch(err) 
{
  console.error(err.message);
}
};
 


  const getUser = async () => {

 try {
   const response = await fetch("http://localhost:5000/simpleUsers");
   const jsonData = await response.json(); 
   setUser(jsonData); 
   
 } catch (err) {
   console.log(err.message); 
 }}

  useEffect(() => {
    getUser();
  }, []); 
  console.log(utilisateur); 


  return (
    <Fragment style={{ width: 1000, marginInlineStart: 320 }}>
      {""}
      <h2 className="text-center mt-5"><b> Liste demande users</b>  </h2>
          <form style={{ width: 800, marginInlineStart: 320 }}>
      
          <table className="table mt-5 text-center">
          <thead>
          <tr>
          <th> Prenom Nom </th>
          <th> Email  </th>
          <th> Password   </th>
          <th  class="text-center"> Status </th>
          <th  style={{ width: 40, align: 200 }}> Actions</th>
          </tr>
          </thead>
          <tbody>
          {utilisateur.map(user => (
          <tr key={user.id_user}> 
          <td> {user.email}  </td> 
          <td> {user.nom}  </td> 
          <td> {user.password}  </td> 
          <td class="project-state">
          </td>
              <td>
                <button className="btn btn-danger" onClick={() => {
                  if ((window.confirm('vous etes sur de blocker cet utilisateur  ?')) === true) {
                    blockfunction(user.id_user)
                  }
                  else { this.onSave(user.id_user) }
                }
                } ><FaUserTimes /></button> </td> 
              <td> <button className="btn btn-success"><FaUserPlus /></button> </td> 
             
 </tr>
 )
 )
 }     
  </tbody> 
  </table>
 </form>
</Fragment>
  ); 
}

export default ListeSimpleUser; 
