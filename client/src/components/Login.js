import React  from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState ,useCallback, useRef , useEffect } from "react";


const Login = ({ setAuth }) => {
    const errRef= useRef();
    const [errMsg, setErrMsg]=useState(""); 

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const initialvalues={email:"" ,password:""};

  const { email, password } = inputs;
  const [formValues ,setFormValues] =useState(initialvalues);
    const [formErrors ,setFormErrors] =useState({});
    const [isSubmit, setIsSubmit] = useState(false); 
  const onChange = e =>
   {
      setInputs({ ...inputs, [e.target.name]: e.target.value }
        );}
        const handleChange=(e) =>{
            const {name,value }  =e.target ;
            setFormValues({...formValues,[name]:value});
            setIsSubmit(true)    
        }
  const onSubmitForm = async e => {
    e.preventDefault()
    setFormErrors(validate(formValues));
    e.preventDefault(); 

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();
        
      if(parseRes.jwtToken) {
        localStorage.setItem("jwtToken", parseRes.jwtToken); 
        setAuth(true); 
        toast.success("login successfully") ; 

      }else {
        setAuth(false); 
        toast.error(parseRes); 

      }
 // localStorage.setItem("jwtToken", parseRes.jwtToken);
      // setAuth(true);
    //  console.log(parseRes); 

 // console.log(jsonData); 
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
        if(!values.password){
         errors.password =" password is required !!";
       }
           return errors ;
    
     }

  return (
    <section>
      <div>
        <body className="hold-transition login-page" >
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <div className="login-box">


            <div className="card">
              <div className="login-logo">
                <h1> Login </h1>
              </div>
              <div className="card-body login-card-body">
                <form onSubmit={onSubmitForm}>
                  <div className="input-group mb-3">
                    {/* /*****  input email ****** */}
                    <input type="email"
                      class="form-control"
                      name="email"
                      placeHolder="Email"
                      value={email}
                      onChange={e => onChange(e)}
                      onBlur={handleChange}

                    />


                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                      </div>
                    </div>
                  </div>
                  <p style={{color:"red"}}>{formErrors.email}</p>
                  <div className="input-group mb-3">
                    {/* /*****  input password  ****** */}
                    <input type="password"
                      className="form-control"
                      name="password"
                      placeHolder="Password"
                      value={password}
                      onChange={e => onChange(e)}
                      onBlur={handleChange}

                    />

                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  <p style={{color:"red"}}>{formErrors.password}</p>

                  <div className="row">
     
                    <div className="col-4">
                      <button type="submit"> Register </button>
                      {/* <button className="btn btn-primary btn-block" onClick={() => setAuth(true)} > Authentificate </button> */}

                    </div>

                  </div><br></br>
                  <Link to="/register" > Register </Link>
                </form>
                <br></br>

                <p className="mb-1">
                  <a href="forgot-password.html">I forgot my password</a>
                </p>
                <p className="mb-0">
                  <a href="register.html" className="text-center">Register a new admin</a>
                </p>

              </div>
            </div>
          </div>
        </body>
     
      </div>

    </section>
  );
}

export default Login;

