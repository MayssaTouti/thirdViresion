import React, { Fragment , useEffect , useState }  from "react";
import EditRole from "./EditRole";
import { FaSearch } from "react-icons/fa";
import {FaTrashAlt} from "react-icons/fa"; 

const ListRole = () => {
//** */
const [name, setName] = useState(""); 
const onSubmitForm = async e => {
  e.preventDefault(); 
  try {
    const response = await fetch(`http://localhost:5000/search/?name=${name}`); 
    const parseResponse = await response.json(); 
     
  //  console.log(parseResponse); 
   setRoles(parseResponse); 
  } catch (err) {
    console.error(err.message); 
  }
}



//**** */
const [roles, setRoles] = useState([]); 

 //delete function 
const deleteRoles = async (id) => {
      try {
       const deleteRoles = await fetch(`http://localhost:5000/roles/${id}`,{
       method: "DELETE"
       }); 
      console.log(deleteRoles); 
       setRoles(roles.filter(role => role.role_id !== id)) 
      } catch (err) {
          console.error(err.message); 
      }
  }; 

const getRoles = async () => {
    try {
        const response = await fetch("http://localhost:5000/roles"); 
        const jsonData = await response.json(); 

    setRoles(jsonData); 

       // console.log(jsonData); 
    } catch (err) {
        console.log(err.message); 
        
    }
}
  useEffect(() => {
    getRoles();
   
    
   }, []); 

    console.log(roles); 

return (

<Fragment >

   {/*   <div className="input-group" data-widget="sidebar-search">
        <input className="form-control "
        onChange={handleSearch}
        type="search" placeholder="Search..." aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar" onSubmit={handleSearch}>
            <i className="fas fa-search fa-fw" />
        </button>
        </div>
         {JSONDATA.map((val,key ) =>{
      return (
      <div  className="user" key={key}>
        <p>{val.role_name}</p>
      </div>
      )} )}
      
      </div>
      <div className="search"> 
     */}{/*roles
      .filtre((val)  =>{
      return val.title.toLowerCase().includes(search.toLowerCase());
      })
      .map ((val)  =>{
      return <div  className="search" key={val.role_id} >
      {val.role_name}
      {val.role_description}
       </div>
    
  
  })

 </div>*/}
 {""}
    <h1 className="text-center mt-5"><b> Liste Roles </b> </h1>

    <form className="d-flex" onSubmit={onSubmitForm} style={{width:800,marginInlineStart:320}}>
     <div>
  <input type="text" 
  className="form-control"
   placeholder="Search.."
   value={name}
   onChange={e => setName(e.target.value)}
   name="name" />
  <button type="submit" style={{width: '50px'}}><FaSearch/></button>

</div>

<table className="table mt-5 text-center" >
    <thead>
      <tr>
        <th>id Role  </th>
        <th>Role Name </th>
        <th>Role description</th>
        <th> Action </th>
      </tr>
    </thead>
    <tbody>
        
   
  { roles.map(role => (
     <tr key={role.role_id}>
           <td>{ role.role_id }</td>
         <td>{ role.role_name }</td>
         <td> {role.role_description}</td>
         <td> <EditRole role={role} />  </td>
 
     <td>  <button className="btn btn-danger"  onClick={() =>{  if ((window.confirm('Are you sure you to delete this role ?')) === true ){
           deleteRoles(role.role_id)
         } 
         else{this.onSave(role.role_id) } 
         }
      } > <FaTrashAlt /></button> </td>
       </tr> 
  ) )}
  

    </tbody>
  </table>
  {roles.length === 0 && <p> No result found</p>}
  </form>



</Fragment>

)


}
export default ListRole ; 