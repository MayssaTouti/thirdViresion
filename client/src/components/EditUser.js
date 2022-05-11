import React , { Fragment , useState}  from "react";
import { FaMarker } from "react-icons/fa";

import { FaCheckSquare } from "react-icons/fa";

import { FaTimesCircle } from "react-icons/fa";
const EditUser = ({ user }) => {
    const [email, setEmail] = useState(user.email); 
    const [name, setName] = useState(user.name); 
    const [password, setPassword] = useState(user.password); 
    const [role_id, setRoleId] = useState(user.role_id); 

  // iduser SERIAL PRIMARY KEY,
  //   email VARCHAR(255),
  //     name VARCHAR(255),
  //       password VARCHAR(255),
  //         role_id SERIAL REFERENCES role

//edit description function 
const updateUser = async e => {
    e.preventDefault(); 
try {
    const body = { email, name, password, role_id }; 
    const response = await fetch(`http://localhost:5000/users/${user.iduser}`, {
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
   data-target={`#id${user.iduser}`}>
      <FaMarker />
</button>
{/* 

id= id10
*/}
<div className="modal" id={`id${user.iduser}`}>
  <div className="modal-dialog">
    <div className="modal-content">
      {/* Modal Header */}
      <div className="modal-header">
        <h2 className="modal-title">Edit User </h2>
        <button type="button" className="close" data-dismiss="modal"  onClick={() => setEmail(user.email)}>
      x

        </button>
      </div>
      {/* Modal body */}
      <div className="modal-body">
     <label> User Email </label>
       <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}></input>
      </div>
      <div className="modal-body">
     <label> User Name </label>
       <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}></input>
      </div>
      <div className="modal-body">
      <label> Password </label>
       <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}></input>
      </div>
      <div className="modal-body">
      <label> Role User  </label>
       <input type="text" className="form-control" value={role_id} onChange={e => setRoleId(e.target.value)}></input>
      </div>
      {/* Modal footer */}
      <div className="modal-footer">
      <button type="button" 
      className="btn btn-warning"
       data-dismiss="modal" onClick={e => updateUser(e)}>Edit</button>
        <button type="button"
         className="btn btn-danger" 
         data-dismiss="modal" onClick={() => setEmail(user.email)}>Close</button>
      </div>
    </div>
  </div>
</div>


</Fragment>
)

}; 
export default EditUser; 