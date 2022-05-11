import React , { useState } from "react";
import { useEffect } from "react";
import EditType from "./EditType";

const InputType = () => {
 
    const [type, setType] = useState([]); 
    const initialvalues={nametype:""};
    const [formValues ,setFormValues] =useState(initialvalues);
    const [formErrors ,setFormErrors] =useState({});
    const [isSubmit, setIsSubmit] = useState(false); 

 const handleChange=(e) =>{
        const {name,value }  =e.target ;
        setFormValues({...formValues,[nametype]:value});
        setIsSubmit(true)    
    }
const [nametype, setName] = useState(""); 

const onSubmitForm = async e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    e.preventDefault();   
    try {
     const body = { nametype}; 
        const response = await fetch("http://localhost:5000/type", {
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(body)
            }); 
        window.alert("Success added  type  !!!!!");
        console.log(response); 

    } catch (err) {
        console.error(err.message); 
        }
  }; 

        useEffect (()  =>  {
            console.log (formErrors);
              if(Object.keys(formErrors).length === 0 && isSubmit){
              }
            },[formErrors]);
                const validate =(values)  =>{
               const errors={};
    //var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

               if(!values.nametype){
                    errors.nametype ="  Name is required !!"
                   }               
                      return errors ;
               
                }
////////////////////////////////////////////////////////  liste

 //delete function 
const deleteType = async (id) => {
      try {
       const deleteType = await fetch(`http://localhost:5000/type/${id}`,{
       method: "DELETE"
       }); 
      console.log(deleteType); 
       setType(type.filter(type => type.idtype !== id)) 
      } catch (err) {
          console.error(err.message); 
      }
  }; 

const getType = async () => {
    try {
        const response = await fetch("http://localhost:5000/types"); 
        const jsonData = await response.json(); 

    setType(jsonData); 

       // console.log(jsonData); 
    } catch (err) {
        console.log(err.message); 
        
    }
}
  useEffect(() => {
    getType();
   
    
   }, []); 

    console.log(type); 

return (
    
<div >

<form className="form-inline"   style={{width:200,marginInlineStart:1000}}>
<br></br>
<h5><label>Add new Type  :</label></h5>
<input  placeholder="type name"  type="text" className="form-control" name="nametype"  id="name"
value={nametype} onChange={e => setName(e.target.value)}
onBlur={handleChange}  />
<p style={{color:"red"}}>{formErrors.name}</p>
<button style={{marginLeft:130 }} className="btn btn-primary" onClick={onSubmitForm} > Submit</button>
</form>
<h3 className="text-center mt-5"> Liste Type Model </h3>
<form  style={{width:900,marginInlineStart:340}}>
<table className="table mt-5 text-center" >
    <thead>
      <tr>
        <th>id Type  </th>
        <th>Type Name </th>
    
        <th> Action </th>
      </tr>
    </thead>
    <tbody>
        
   
  { type.map(type => (
     <tr key={type.idtype}>
           <td>{ type.idtype }</td>
         <td>{ type.nametype }</td>
         <td> <EditType type={type} />  </td>

 
     <td>  <button className="btn btn-danger"  onClick={() =>{  if ((window.confirm('Are you sure you to delete this type model ?')) === true ){
           deleteType(type.idtype)
         } 
         else{this.onSave(type.idtype) } 
         }
      } > Delete</button> </td>
       </tr> 
  ) )}
  

    </tbody>
  </table>
  </form>

</div>
); 

};
export default InputType; 