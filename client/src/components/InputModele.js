import React , {Fragment, useState , useEffect} from "react";
//import Model from "./DefinirModel";
const InputModele = () => {

const [codeid ,setCodeId] = useState('');
const [tier, setTier]= useState('');
const [tiers, setTypeTier] = useState([]); 
const [name, setName] = useState(""); 
const [idtype, setType] = useState(""); 
const [file , setFile] = useState("");
const [codetier, setCodeTier] = useState(""); 
const initialvalues={name:"",idtype:"", file:"",codetier:""};
const [formValues ,setFormValues] =useState(initialvalues);
const [formErrors ,setFormErrors] =useState({});
const [isSubmit, setIsSubmit] = useState(false); 
const [st ,setSt ] =useState([]);

const handleChange=(e) =>{  
    const {name,value }  =e.target ;
    setFormValues({...formValues,[name]:value});
    setIsSubmit(true) 
 //   this.setState({multiValue: [...e.target.selectedOptions].map(o => o.value)}); 
   
     
}

const onSubmitForm = async e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    e.preventDefault();     try {
     const body = { name,idtype,file,codetier}; 
        const response = await fetch("http://localhost:5000/modele", {
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(body)
            }); 
        window.alert("Success added  Modele  !!!!!");
     console.log(response); 

    } catch (err) {
        console.error(err.message); 
        }}; 

        useEffect (()  =>  {
            console.log (formErrors);
              if(Object.keys(formErrors).length === 0 && isSubmit){
              }
            },[formErrors]);
 const validate =(values)  =>{
               const errors={};

               if (!values.name) {
                 errors.name = "Name is required !! ";
             
               }
               return errors ;
               
                }

 //////////////////////////////////////////////////////////////////////////
 useEffect(() => {
 const getModell = async () => {
    try {
        const response = await fetch("http://localhost:5000/ModeleType1"); 
        const getModel = await response.json();
        console.log(getModel);
        setTypeTier(getModel); 
       
       // console.log(jsonData); 
    } catch (err) {
        console.log(err.message); 
        
    }
}
 getModell();

}, []);
/////////////////////////////////////////////////////////
useEffect(() => {
    const getTypeTier = async () => {
       try {
           const response = await fetch("http://localhost:5000/TypeTier"); 
           const getModel = await response.json();
           console.log(getModel);
           setTier(getModel); 
          
          // console.log(jsonData); 
       } catch (err) {
           console.log(err.message); 
           
       }
   }
   getTypeTier();
   
   }, []);
 ////////////////////////////////////////////////////////
  /* const handleCode = (event) =>{
     const getCodeId = event.target.value;
     console.log(getCodeId);
     setCodeId(getCodeId);
   }*/
/////////////////////////////////////////////////////////

return (
 <Fragment>
<i><h2 className="text-center mt-5">Add new  Modele  </h2></i>
<br></br>
<form className="/"   style={{width:600,marginInlineStart:320}}>
<label>Name Modele :</label>
 <input type="text" className="form-control" name="name" onBlur={handleChange}
 placeholder="name" value={name} onChange={e => setName(e.target.value)}
 />
 <p  style={{color:"red"}}>{formErrors.name}</p>

 <label>Type Model :</label>    
 <select className="form-control" name="idtype" >
 <option disabled selected > -- Select one --</option>
 {tiers.map ((mod) => (
<option key={mod.id} value={mod.idtype} > {mod.nametype}  </option> ))}
</select>

<br></br>
<label>Tiers Model :</label>
<select className="form-control"  name="codetier" >
 <option disabled selected > -- Select one --</option>
 {tiers.map ((tier) => (
<option key={tier.code} value={tier.codetier} > {tier.typetier}  </option> ))} </select>
<br></br>
<label> Choose the specific : { codeid } </label>

<select className="form-control" 
 id="code"  name="code"  >
  <option disabled selected > -- Select one --</option>
  {/*st.map ((tier) => (
     <option  key={tier.code} value={tier.name}  >  { tier.name }  </option>
      ))*/}
</select>
<br></br>
<label>Choose a Model :</label>
<input style={{color : "red"}}  type="file"  name="file" placeholder="File" ></input>
{/*<button name="file"  className="btn btn-info" >File </button>*/}
<br></br>
<br></br>
<icon className="fas fa-back" ></icon><button className="btn btn-success" onClick="/listeModel" > Back</button>
 <button style={{marginLeft:485}} className="btn btn-primary" onClick={onSubmitForm} > Add</button>
</form>

</Fragment>


); 




}; 
export default InputModele; 