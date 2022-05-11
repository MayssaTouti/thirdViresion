import React , { useState } from "react";
import { useEffect } from "react";
const InputRole = () => {
 
    const initialvalues={role_name:"" ,role_description:""};
    const [formValues ,setFormValues] =useState(initialvalues);
    const [formErrors ,setFormErrors] =useState({});
    const [isSubmit, setIsSubmit] = useState(false); 
    const [sucess, setSuccess]=useState(false); 

 const handleChange=(e) =>{
        const {name,value }  =e.target ;
        setFormValues({...formValues,[name]:value});
        setIsSubmit(true)    
    }
const [role_name, setRoleName] = useState(""); 
const [role_description, setRoleDescription] = useState(""); 
const onSubmitForm = async e => {

    e.preventDefault()
    setFormErrors(validate(formValues));
    e.preventDefault(); 
    try {
     const body = { role_name , role_description }; 
        const response = await fetch("http://localhost:5000/roles", {
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(body)
            }); 
           window.alert("Success added role user ");
         console.log(response); 

    } catch (err) {
        console.error(err.message); 
        }; 
 };


useEffect (()  =>  {
console.log (formErrors);
  if(Object.keys(formErrors).length === 0 && isSubmit){
  }
},[formErrors]);
    const validate =(values)  =>{
   const errors={};

       if(!values.role_name){
        errors.role_name =" role name is required !!"
       }
       if(!values.role_description){
        errors.role_description =" role description  is required !!";
      }
          return errors ;
   
    }


return (
    
<div >
<h1 className="text-center mt-5"> Add Role  </h1>
<form className="/" onSubmit={onSubmitForm}   style={{width:600,marginInlineStart:320}}>
<label>Role name :</label>
<input  placeholder="role name"  type="text" className="form-control" name="role_name" 
value={role_name} onChange={e => setRoleName(e.target.value)}
onBlur={handleChange}
/>
<p style={{color:"red"}}>{formErrors.role_name}</p>

<br></br>
<label>Description Role :</label>
<input type="text" placeholder="description role" className="form-control"  name="role_description" 
value={role_description} onChange={e => setRoleDescription(e.target.value) }
onBlur={handleChange}
/>
<p  style={{color:"red"}}>{formErrors.role_description}</p>
<br></br>
<button style={{marginLeft:550}} className="btn btn-primary"  > Add</button>
</form>
</div>
    
); 

};
export default InputRole; 