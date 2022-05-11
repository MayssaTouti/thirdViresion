import React, { Fragment , useEffect , useState }  from "react";
import EditUser from "./EditUser";
const ListeUser = () => {
  const [utilisateur, setUser] = useState([]); 

 // const [roles, setRoles] = useState([]); 
 const [role, setRoleName] = useState([]); 

  //delete function 
  const deleteUser = async (id) => {
      try {
       const deleteUser = await fetch(`http://localhost:5000/users/${id}`,{
           method: "DELETE"
       }); 
        console.log(deleteUser); 
       setUser(utilisateur.filter(utilisateur => utilisateur.iduser !== id)) 
      } catch (err) {
          console.error(err.message); 
      }
  }; 

const getUser = async () => {
    try {
        const response = await fetch("http://localhost:5000/users"); 
        const jsonData = await response.json(); 

        setUser(jsonData); 
       
       // console.log(jsonData); 
    } catch (err) {
        console.log(err.message); 
        
    }
}
    useEffect(() => {
    getUser();
    }, []); 

    console.log(utilisateur); 

    const getRoleUser = async () => {
      try {
          const response = await fetch("http://localhost:5000/RoleUser"); 
          const jsonData = await response.json(); 
  
          setUser(jsonData); 
         
         // console.log(jsonData); 
      } catch (err) {
          console.log(err.message); 
          
      }
  }
      useEffect(() => {
      getRoleUser();
      }, []); 
  
      console.log(role); 
    
   
return (

<Fragment   style={{width:1000,marginInlineStart:320}}>
    {""}
    <h2 className="text-center mt-5"> Liste Users </h2>
    <form  style={{width:800,marginInlineStart:320}}>

<table className="table mt-5 text-center"  >
    <thead  >
      <tr>
      
        <th> User Email </th>
        <th> Nom utilisateur</th>
        <th> User Role </th>
  
        <th style={{width: 40 , align:200}}> Actions</th>
      </tr>
    </thead>
    <tbody >
  
    
   {utilisateur.map(user => (
     <tr key={user.iduser}>
  
   
    <td> {user.email}</td>
       <td>{user.name}</td>
    <td>{user.role_name}</td>
   <td class="project-state">
<span class="badge badge-success">Success</span>
</td>
         <td  > <EditUser user={user} /> </td>
         <td>
  <button className="btn btn-danger"  onClick={() =>{  if ((window.confirm('Are you sure you to delete this user ?')) === true ){
           deleteUser(user.iduser)
         } 
         else{this.onSave(user.iduser) } 
         }
      } > Delete</button> </td>     </tr> 
 
   ) )}

    </tbody>
  </table>


</form>
</Fragment>

)


}
export default ListeUser ; 