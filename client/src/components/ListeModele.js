import React, { useEffect , useState }  from "react";
import EditModel  from "./EditModel";

const ListeMoele = () => {
  
  
    const [modele, setModele] = useState([]); 
   
    const [types, setType] = useState([]); 


  //delete function 
  const deleteModele = async (id) => {
      try {
       const deleteModele = await fetch(`http://localhost:5000/modele/${id}`,{
           method: "DELETE"
       }); 
        console.log(deleteModele); 
        setModele(modele.filter(modele => modele.idmodele !== id)) 
      } catch (err) {
          console.error(err.message); 
      }
  }; 

const getModel = async () => {
    try {
        const response = await fetch("http://localhost:5000/ModeleType"); 
        const jsonData = await response.json(); 

        setModele(jsonData); 
       
       // console.log(jsonData); 
    } catch (err) {
        console.log(err.message); 
        
    }
}
    useEffect(() => {
    getModel();
    }, []); 

    console.log(modele); 
 
////////////  searcht 


/////////////////////

   const handleCode = (event) =>{
        const getType = event.target.value;
        console.log(getType);
        setType(getType);
      }
return (
<div>

   <div className="form-inline"  style={{width:200,marginInlineStart:1000}}>
        <div className="input-group-append"><p>{types}</p>
        <select name="mod" className="form-control" onChange={e => handleCode(e)}> 
                   <option>--Select Type--</option>
                 </select>
 <button className="btn btn-info"  style={{width:40}} onClick={() =>{}} >
  <i className="fas fa-search fa-fw" /></button>

        
        </div>
    
    </div>
    <h2 className="text-center mt-5"> Liste Models </h2>
    <form  style={{width:1000,marginInlineStart:320}}>

<table className="table mt-5 text-center"  >
    <thead  >
      <tr>
        <th >id Model  </th>
        <th > Name model </th> 
        <th  > Type model</th>
        <th  > Name Tier </th>  
        <th style={{width: 60, justifyContent: 'center',marginInlineStart:50 }}> </th>
     
      </tr>
    </thead>
    <tbody >
  
    
   {modele.map(model => (
     <tr key={model.idmodele   }  >
    <td >{ model.idmodele }</td>
    <td >{ model.name }</td>
    <td>{model.nametype}</td>
    <td>{model.codetier}</td>
   <td class="project-state">
</td>
         <td  > <EditModel model={model} /> </td>
         <td>
  {/*<Details className="btn btn-info"  />*/}
     
  <button className="btn btn-danger"  onClick={() =>{  if ((window.confirm('Are you sure you to delete this model ?')) === true ){
           deleteModele(model.idmodele)
         } 
         else{this.onSave(model.idmodele) } 
         }
      } > Delete</button> </td>     </tr> 
 
   ) )}

    </tbody>
  </table>


</form>
</div>


)


}
export default ListeMoele; 