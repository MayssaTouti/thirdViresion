import React , { Fragment , useState}  from "react";

const EditType = ({ type }) => {
    const [nametype, setName] = useState(type.nametype); 
    
//edit description function 
const updateType = async e => {
    e.preventDefault(); 
try {
    const body = { nametype}; 
    const response = await fetch(`http://localhost:5000/type/${type.idtype}`, {
        method: "PUT", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(body)
       

    }); 
  console.log(response); 
window.location = "/inputType"; 

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
   data-target={`#id${type.idtype}`}>
 Edit 
</button>
{/* 

id= id10
*/}
<div className="modal" id={`id${type.idtype}`}>
  <div className="modal-dialog">
    <div className="modal-content">
      {/* Modal Header */}
      <div className="modal-header">
        <h2 className="modal-title">Edit Type </h2>
        <button type="button" className="close" data-dismiss="modal"  onClick={() => setName(type.nametype)}>
      x

        </button>
      </div>
      {/* Modal body */}
      <div className="modal-body">
     <label> Type Name </label>
       <input type="text" className="form-control" value={nametype} onChange={e => setName(e.target.value)}></input>
      </div>
      {/* Modal footer */}
      <div className="modal-footer">
      <button type="button" 
      className="btn btn-warning"
       data-dismiss="modal" onClick={e => updateType(e)}>Edit</button>
        <button type="button"
         className="btn btn-danger" 
         data-dismiss="modal" onClick={() => setName(type.nametype)}>Close</button>
      </div>
    </div>
  </div>
</div>


</Fragment>
)

}; 
export default EditType ; 