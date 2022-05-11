import React , { Fragment , useState}  from "react";

const EditModel = ({ model }) => {
    const [name, setName] = useState(model.name);  
    const [type, setType] = useState(model.type); 
    const [codetier, setCodeTier] = useState(model.codetier); 


//edit description function 
const updateModel = async e => {
    e.preventDefault(); 
try {
    const body = { name,type,codetier }; 
    const response = await fetch(`http://localhost:5000/modele/${model.idmodele}`, {
        method: "PUT", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(body)
       

    }); 
   console.log(response); 
window.location = "/listeModele"; 

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
   data-target={`#id${model.idmodele}`}>
 Edit 
</button>
<div className="modal" id={`id${model.idmodele}`}>
  <div className="modal-dialog">
    <div className="modal-content">
      {/* Modal Header */}
      <div className="modal-header">
        <h2 className="modal-title">Edit Model </h2>
        <button type="button" className="close" data-dismiss="modal"  onClick={() => setName(model.name)}>
      x

        </button>
      </div>
      {/* Modal body */}
      <div className="modal-body">
     <label> Name model</label>
       <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}></input>
      </div>
         <div className="modal-body">
      <label> Type Modele </label>

      <select className="form-control"   
value={type} onChange={e => setType(e.target.value)}
 name="type" /*value={type} onChange={e => setType(e.target.value)}*/>
    <option>Commande de vente</option>
    <option>Facture Achat </option>

</select>
  {/*      <div className="modal-body">
         <label>  File Modele </label>
  <input type="file" className="form-control" value={file} onChange={e => setFile(e.target.value)}></input>
      </div>*/}
      <div className="modal-body">
      <label> Name Tier   </label>
       <input type="text" className="form-control" value={codetier} onChange={e => setCodeTier(e.target.value)}></input>
      </div>
      {/* Modal footer */}
      <div className="modal-footer">
      <button type="button" 
      className="btn btn-warning"
       data-dismiss="modal" onClick={e => updateModel(e)}>Edit</button>
        <button type="button"
         className="btn btn-danger" 
         data-dismiss="modal" onClick={() => setName(model.name)}>Close</button>
      </div>
    </div>
  </div>
</div>

</div>
</Fragment>
)

}; 
export default EditModel; 