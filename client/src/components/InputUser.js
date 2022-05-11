import React , {Fragment, useState , useEffect} from "react";

const InputUser = () => {

  const [user, setRoleName] = useState([]); 
  const [code, setCode] = useState([]); 

const [email, setEmail] = useState(""); 
const [name, setName] = useState(""); 
const [password, setPassword] = useState(""); 
const [role_id, setRoleId] = useState(""); 

const initialvalues={email:"" ,name:"",password:"", code:""};
const [formValues ,setFormValues] =useState(initialvalues);
const [formErrors ,setFormErrors] =useState({});
const [isSubmit, setIsSubmit] = useState(false); 

const handleChange=(e) =>{
    const {name,value }  =e.target ;
    setFormValues({...formValues,[name]:value});
    setIsSubmit(true)    
}
const onSubmitForm = async e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    e.preventDefault();   
    try {
     const body = { email,name,password,role_id}; 
        const response = await fetch("http://localhost:5000/users", {
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(body)
            }); 
        window.alert("Success added  user  !!!!!");
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

               if (!values.email) {
                 errors.email = "Please enter valid email address.";
             
               }
                   if(!values.name){
                    errors.name ="  Name is required !!"
                   }
                   if(!values.password){
                    errors.password =" Password is required !!";
                  }
                  if(!values.code){
                    errors.code =" Role name is required !!";
                  }
                  
                      return errors ;
               
                }
 ///////////////////////////////////////////////////////////////////////////////////
 
 const getRoleName = async () => {
  try {
      const response = await fetch("http://localhost:5000/RoleName"); 
      const jsonData = await response.json(); 

  setRoleName(jsonData); 

     // console.log(jsonData); 
  } catch (err) {
      console.log(err.message); 
      
  }
}
useEffect(() => {
  getRoleName();
 
  
 }, []);   

 
 const handleCode = (event) =>{
  const getRoleName= event.target.value;
  console.log(getRoleName);
  setCode(getRoleName);
}
return (
 <Fragment>
        
<i><h2 className="text-center mt-5">Add new User  </h2></i>
<form className="/"    style={{width:600,marginInlineStart:320}}>
<label>Email user :</label>
<input type="email" className="form-control" width={45} placeholder="email@gmail.com"  onBlur={handleChange} name="email" value={email} onChange={e => setEmail(e.target.value)}
 />
 <p  style={{color:"red"}}>{formErrors.email}</p>
 <label>Name user :</label>
 <input type="text" className="form-control" name="name" onBlur={handleChange}
 placeholder="name" value={name} onChange={e => setName(e.target.value)}
 />
 <p  style={{color:"red"}}>{formErrors.name}</p>
 <label>Password user :</label>
 <input type="password" className="form-control" name="password" placeholder="password" onBlur={handleChange} value={password} onChange={e => setPassword(e.target.value)}
 />
 <p  style={{color:"red"}}>{formErrors.password}</p>

 <label>Role user :</label>
<select className="form-control" name="role_id" onChange ={ e => handleCode(e)}>
 {user.map (users => (<option>{users.role_id} : {users.role_name}</option>
 ))}</select>
<br></br>
<icon className="fas fa-back" ></icon><button className="btn btn-success" onClick="/listeUser" > Back</button>
 <button style={{marginLeft:470}} className="btn btn-primary" onClick={onSubmitForm}> Add</button>
</form>

</Fragment>


); 


}; 
export default InputUser; 