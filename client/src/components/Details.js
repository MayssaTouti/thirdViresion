import React , { Fragment , useState}  from "react";

const Details = ({ model }) => {
  const [role_name, setRoleName] = useState(model.role_name); 
    const [role_description, setRoleDescription] = useState(model.role_description); 
    
//edit description function 
const updateModel = async e => {
    e.preventDefault(); 
try {
    const body = { role_name , role_description }; 
    const response = await fetch(`http://localhost:5000/modeles/${model.idmodele}`, {
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
   data-target={`#id${model.role_id}`}>
 Edit 
</button>
{/* 

id= id10
*/}
<div className="modal" id={`id${model.role_id}`}>
  <div className="modal-dialog">
    <div className="modal-content">
      {/* Modal Header */}
      <div className="modal-header">
        <h2 className="modal-title">Edit Role </h2>
        <button type="button" className="close" data-dismiss="modal"  onClick={() => setRoleName(model.role_name)}>
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
      className="btn btn-warning"
       data-dismiss="modal" onClick={e => updateModel(e)}>Edit</button>
        <button type="button"
        
         className="btn btn-danger" 
         data-dismiss="modal" onClick={() => setRoleName(model.role_name)}>Close</button>
      </div>
    </div>
  </div>
</div>


</Fragment>
)

}; 
export default Details ; 