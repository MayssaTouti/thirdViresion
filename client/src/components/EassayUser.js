import React, { Fragment, useState , useEffect} from "react";

const EassayUser = ({ user }) => {
        // id_user SERIAL PRIMARY KEY,
        // email VARCHAR(255),
        //     nom  VARCHAR(255),
        //         password VARCHAR(255)
    const [userR, setRoleName] = useState([]); 
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.nom);
    const [password, setPassword] = useState(user.password);
    const [role_id, setRoleId] = useState(user.role_id);

    //edit description function 
    
    const updateUser = async e => {
        e.preventDefault();
        try {
            const body = { email, name, password, role_id };
            const response = await fetch(`http://localhost:5000/addUsers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)


            });
            console.log(response);
            window.location = "/";

        } catch (err) {
            console.log(err.message);

        }

    };
/////////////////////////
    const getRoleName = async () => {
        try {
            const response = await fetch("http://localhost:5000/RoleName");
            const jsonData = await response.json();

            setRoleName(jsonData);

            // console.log(jsonData); 
        } catch (err) {
            console.log(err.message);

        }
    }; 
    useEffect(() => {
        getRoleName();


    }, []); 

    //console.log(role); 
    return (

        <Fragment>

            <button type="button"
                class="btn btn-success"
                data-toggle="modal"
                data-target={`#id${user.id_user}`}>
                Ajouter 
            </button>
            {/* 

id= id10
*/}
            <div className="modal" id={`id${user.id_user}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h2 className="modal-title">Ajouter  Utilisateur </h2>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => setEmail(user.email)}>
                                x
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">
                            <label> User Email </label>
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className="modal-body">
                            <label> User Name </label>
                            <input type="text" className="form-control" name="name" 
                                placeholder="name" value={name} onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="modal-body">
                            <label> Password </label>
                            <input type="password" className="form-control" name="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="modal-body">
                            <label> Role User  </label>
                            <select className="form-control" name="role_id" onChange={e => setPassword(e.target.value)}>
                                {userR.map(users => (<option>{users.role_id} : {users.role_name}</option>
                                ))}</select>
                        </div>
                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-warning"
                                data-dismiss="modal" onClick={e => updateUser(e)}>Edit</button>
                            <button type="button"
                                className="btn btn-danger"
                                data-dismiss="modal" onClick={() => setEmail(user.email)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )

};
export default  EassayUser ; 