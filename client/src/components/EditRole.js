import React , { Fragment , useState}  from "react";
import { FaMarker } from "react-icons/fa";

import { FaCheckSquare } from "react-icons/fa";

import { FaTimesCircle } from "react-icons/fa";
const EditRole = ({ role }) => {
    const [role_name, setRoleName] = useState(role.role_name); 
    const [role_description, setRoleDescription] = useState(role.role_description); 
    
//edit description function 
const updateRoles = async e => {
    e.preventDefault(); 
try {
    const body = { role_name , role_description }; 
    const response = await fetch(`http://localhost:5000/roles/${role.role_id}`, {
        method: "PUT", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(body)
       

    }); 
  console.log(response); 
window.location = "/"; 

} catch (err) {
    console.log(err.message); 

}

}; 


//console.log(role); 
return  (

<Fragment>

<button type="button"
 class="btn btn-warning"
  data-toggle="modal"
   data-target={`#id${role.role_id}`}>
  <FaMarker/>
</button>
{/* 

id= id10
*/}
<div className="modal" id={`id${role.role_id}`}>
  <div className="modal-dialog">
    <div className="modal-content">
      {/* Modal Header */}
      <div className="modal-header">
        <h2 className="modal-title">Edit Role </h2>
        <button type="button" className="close" data-dismiss="modal"  onClick={() => setRoleName(role.role_name)}>
      x

        </button>
      </div>
      {/* Modal body */}
      <div className="modal-body">
     <label> Role Name </label>
       <input type="text" className="form-control" value={role_name} onChange={e => setRoleName(e.target.value)}></input>
      </div>
      <div className="modal-body">
      <label> Role Description </label>
       <input type="text" className="form-control" value={role_description} onChange={e => setRoleDescription(e.target.value)}></input>
      </div>
      {/* Modal footer */}
      <div className="modal-footer">
      <button type="button" 
              className="btn btn-success"
       data-dismiss="modal" onClick={e => updateRoles(e)}><FaCheckSquare/> </button>
        <button type="button"
         className="btn btn-danger" 
         data-dismiss="modal" onClick={() => setRoleName(role.role_name)}><FaTimesCircle /></button>
      </div>
    </div>
  </div>
</div>


</Fragment>
)

}; 
export default EditRole ; 