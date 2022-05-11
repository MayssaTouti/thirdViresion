import React, {useState} from 'react'; 
import '../App.css'; 



import back from './brokenhill180100193.jpg'; 
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';



const LoginEssay = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const { email, password } = inputs;
  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value }
    );
  }
  const onSubmitForm = async e => {
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
  
      if(parseRes.jwtToken){
        localStorage.setItem("jwtToken", parseRes.jwtToken);
        setAuth(true);
        toast.success("login successfully"); 

      }else {
        setAuth(false);
        toast.error(parseRes);
      }


    } catch (err) {
      console.error(err.message);
    } 
    }; 


  return (
    <div className='test'>
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={back} alt="profile" className="profile" />

            </div>


          </div>
            <div> 
            <h1>Login Page</h1>
  <form onSubmit={onSubmitForm}>
            <div>
            
                  <input type="email"
                   className="name"
                    name="email"
                    placeHolder="Email"
                    value={email}
                    onChange={e => onChange(e)}
                  />
            </div>
            <div className="second-input">
            
              <input 
                    type="password"
                    name="password"
                    placeHolder="Password"
                    value={password}
                    onChange={e => onChange(e)}
                 className="name" />
            </div>
            <div className="login-button">
                  <button type='submit' className='buttonLog'>Login</button>
            </div>

            <p className="link">
                  <Link to="/register"> créer compte </Link>

            </p>

              </form>
          </div>
      
        </div>


      </div>
   </div> 
    </div> 
  )
}; 

export default LoginEssay
