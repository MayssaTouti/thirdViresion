import React, {useState} from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import back from './brokenhill180100193.jpg';
const RegisterEsay = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        nom: ""
    });
const { email, password, nom } = inputs ; 
const onChange = e => 
setInputs({...inputs, [e.target.name] : e.target.value}); 

const onSubmitForm = async e => {
    e.preventDefault(); 
    try {
        const body = { email, password, nom };
      const response = await fetch(
          "http://localhost:5000/auth/register", {
              method: "POST",
              headers: {
                  "Authorization": "token",
                  "Content-Type": "application/json" 
              }, 
              body: JSON.stringify(body)  
          }

      ); 

        const parseRes = await response.json();
        if(parseRes.jwtToken){
            localStorage.setItem("jwtToken", parseRes.jwtToken); 
            setAuth(true); 
            toast.success("Register successfully");   
        }else{
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
                            <h1>Page d'inscription </h1>
                            <form onSubmit={onSubmitForm}>
                            <div>
                                
                                <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        placeholder="email"
                                        onChange={e => onChange(e)}
                                  className="name" 
                    
                                  />
                            </div>
                         
                        
<br/>

                            <div>
                             
                                <input
                                type="text"
                                placeholder="user name"
                                className="name" 
                                onChange={e => onChange(e)}
                                value={nom}
                                name="nom"
                                   />
                            </div>
                            <div className="second-input">
                               
                                <input 
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeholder="password"
                                        onChange={e => onChange(e)}
                                className="name" />
                            </div>
                            <div className="login-button">
                                <button className='buttonLog'> Register </button>
                            </div>



                            <p className="link">
                                    <Link to="/login"> Login</Link>
                           
                            </p>

                            </form>
                        </div>
                   
                    </div>


                </div>
            </div>
        </div>
    ); 
}

export default RegisterEsay
