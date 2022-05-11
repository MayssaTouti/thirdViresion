import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useCallback, useRef , useEffect } from "react";

const  Register = ({ setAuth }) => {



    const errRef= useRef();
    const [errMsg, setErrMsg]=useState(""); 

    const initialvalues={email:"" ,password:"",nom:""};

    const [formValues ,setFormValues] =useState(initialvalues);
      const [formErrors ,setFormErrors] =useState({});
      const [isSubmit, setIsSubmit] = useState(false); 
  
          const handleChange=(e) =>{
              const {name,value }  =e.target ;
              setFormValues({...formValues,[name]:value});
              setIsSubmit(true)    
          }
  //laset version 
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    nom: ""
  });
  const { email, password, nom } = inputs;

  const onChange = e =>{
    setInputs({ ...inputs, [e.target.name] : e.target.value });
  }

  const onSubmitForm = async e => {
    e.preventDefault()
    setFormErrors(validate(formValues));
    e.preventDefault(); 
    try {
      const body = { email, password, nom };
      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
           "Authorization": "token", 
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();
      
      if (parseRes.jwtToken) {

        localStorage.setItem("jwtToken", parseRes.jwtToken);
        setAuth(true);
        toast.success("Register  successfully");

      } else {
        setAuth(false);
        toast.error(parseRes);

      }  
     // console.log(parseRes); 
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(()  =>{
    setErrMsg('');
  }, [email,password])

  const fetchBusinesses = useCallback(() => {
}, [])
useEffect(()  =>{
  fetchBusinesses()
}, [fetchBusinesses])
const useFormInput = initialValue => {
const [value, setValue] = useState(initialValue);
const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

const validate =(values)  =>{
    const errors={};
 
        if(!values.email){
         errors.email =" email is required !!"
        }
        if(!values.nom){
            errors.nom =" name is required !!"
           }
        if(!values.password){
         errors.password =" password is required !!";
       }
           return errors ;
    
     }
  return (
    <Fragment>
      <body className="hold-transition register-page">
        <div className="register-box">
          <div className="card"> <div class="register-logo">
            <a href="/"><b>Sign</b>UP</a>
          </div>
            <div className="card-body register-card-body">
              <p className="login-box-msg">Register a new membership</p>

              <form onSubmit={onSubmitForm}>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <div className="input-group mb-3">
                  {/********  input name ********* */}

                  <input
                    type="text"
                    name="nom"
                    value={nom}
                    placeholder="name"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                    onBlur={handleChange}
                  />

                </div>
                <p style={{color:"red"}}>{formErrors.nom}</p>

                <div className="input-group mb-3">
                  {/********  input email ********* */}
                  <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="email"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                    onBlur={handleChange}
                  />

                </div>
                <p style={{color:"red"}}>{formErrors.email}</p>

                <div className="input-group mb-3">
                  {/********  input password ********* */}
                  <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                    onBlur={handleChange}
                  />

                </div>
                <p style={{color:"red"}}>{formErrors.password}</p>

                <div className="row">
                  <div className="col-8">
                  </div>
                  <div className="col-4">
                    <button className="btn btn-success btn-block">Submit</button>
                  </div>
                </div>
                <Link to="/login"> Login</Link>
              </form>
            </div>
          </div>
        </div>
      </body>
     
    </Fragment>
);
};
export default Register;