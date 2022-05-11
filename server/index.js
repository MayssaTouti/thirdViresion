const express =require("express"); 
const app=express(); 
const cors= require("cors"); 
const pool= require("./db"); 
const { Pool } = require("pg");

app.get('/hh', function(req, res) {

    res.send("bonjour mayssa test avec react native "); 
}); 





//midelware
app.use(cors()); 
app.use(express.json()); 
//partie search 
// query parametr => http//localhost:5000/?name=henry = req.query 
app.get("/search", async(req, res) => {

try {
    const { role } = req.query; 
//role name
const users = await pool.query("SELECT * FROM role WHERE role_name LIKE $1", [
        `%${role}%`
    ]); 
    res.json(users.rows); 
} catch (err) {
    console.error(err.message); 
}})















//register and login routes 

app.use("/auth",require("./routes/jwtAuth")); 
 //dashboard route 
 app.use("/dashboard",require("./routes/dashboard")); 


 /////////////////////////////////////////////////// User /////////////////////

//create a user  
/*app.post("/userss", async(req,res) => {
    //await 
    try {
    console.log(req.body); 
    const {email , name, password, role_name} = req.body; 
    const newUser = await pool.query(
       `INSERT INTO utilisateur("email", "name","password","role_name")  VALUES ($1, $2,$3,$4) 
 WHERE (utilisateur.role_id=role.role_id ) `, [email, name,password,role_name]
    ); 
    res.json(newUser.rows[0]); 
        
    } catch (err) {
        console.error(err.message); 
    }

})*/
app.post("/users", async(req,res) => {
    //await 
    try {
    console.log(req.body); 
    const {email , name, password, role_name} = req.body; 
    const newUser = await pool.query(
       `INSERT INTO utilisateur("email", "name","password","role_name") SELECT (role_name) FROM role WHERE utilisateur.role_id=role.role_id VALUES ($1, $2,$3,$4)
      `, [email, name,password,role_name]
    ); 
    res.json(newUser.rows[0]); 
        
    } catch (err) {
        console.error(err.message); 
    }
  
})
//get information user 
app.get('/informationUsser ', async (req, res) => {
    try {
       let emailAdmin = await pool.query(
    "SELECT email FROM utilisateur u , role r  WHERE u.role_id  = r.role_id AND r.role_name ='admin' "); 
    res.json(emailAdmin.rows);  
    } catch (err) {
     console.error(err.message);      
    }
}); 



// get all user for simple user 

app.get("/allUeserSimple", async (req, res) => {
    try {
        const allUeserSimple = await pool.query("SELECT * FROM simple_User WHERE");
        res.json(allUeserSimple.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
}); 






//    const allUsers = await pool.query ("SELECT (iduser,email,role_name) FROM utilisateur u, role r WHERE u.role_id=r.role_id"); 

app.get("/users", async (req,res) => {

    try {
    const allUsers = await pool.query ("SELECT * FROM utilisateur order by iduser  asc "); 
    res.json(allUsers.rows); 
    
    }catch (err) {
        console.error(err.message); 
    }})




// get a user
app.get("/users/:id" , async(req, res) => {
    try {
     
      const {id} = req.params; 
      const user= await pool.query
       ("SELECT * FROM utilisateur WHERE iduser = $1", [id]); 
      res.json(user.rows[0]); 
    
    
    } catch (err) {

        console.error(err.message);
    } })
//select * from simple user

app.get("/simpleUser/:id", async(req, res) => {
  try {
    const {id} = req.params; 
      const simpleUser = await pool.query("SELECT * FROM simple_User WHERE id_user =$1" , 
      [id]); 
      res.json(simpleUser.rows[0]);

  } catch (err) {
         console.error(err.message);
  }})
//////////////
app.post("/addUsers", async (req, res) => {
    //await 
    try {
        console.log(req.body);
        const { email, name, password, role_id } = req.body;
        const newUser = await pool.query(
            `INSERT INTO utilisateur ("email", "name","password","role_id") VALUES ($1, $2 ,$3 ,$4)
      `, [
            email, name, password, role_id
        ]
        );
        res.json(newUser.rows[0]);

    } catch (err) {
        console.error(err.message);
    }

})




 ////////////////////////////////////////////////////////////
   app.get("/RoleName", async (req,res) => {

          try {
          const allUsers = await pool.query
           ("SELECT (role_name),role_id FROM  role "); 
          res.json(allUsers.rows); 
          
          }catch (err) {
              console.error(err.message); 
          }})
//update a user 
app.get("/RoleUser", async (req,res) => {

  try {
  const allUsers = await pool.query
   ("SELECT email,iduser,(role_name) FROM  utilisateur u,role r WHERE u.role_id=r.role_id "); 
  res.json(allUsers.rows); 
  
  }catch (err) {
      console.error(err.message); 

  }})

  app.put("/RoleUser/:id", async (req, res) => {

    try {
      
    const {id} = req.params; 
    const {email , name,password,role_id} = req.body; 
    const updateUser = await  pool.query(`UPDATE "utilisateur" 
     SET "email" = $1 , "name"= $2 ,"password"=$3 ,"role_name"=$4 `, [email, name,password,role_id, id]); 
    
     res.json("User was updated "); 
    
        
    } catch (err) {
        console.error(err.message); 
    }
    
    })
app.put("/users/:id", async (req, res) => {

    try {
      
    const {id} = req.params; 
    const {email , name,password,role_id} = req.body; 
    const updateUser = await  pool.query(`UPDATE "utilisateur" 
     SET "email" = $1 , "name"= $2 ,"password"=$3 ,"role_id"=$4 WHERE "iduser" = $5 `, [email, name,password,role_id , id]); 
    
     res.json("User was updated "); 
    
        
    } catch (err) {
        console.error(err.message); 
    }
    
    })

    //delete a User
app.delete("/users/:id", async(req, res)=> {
try {
    
const {id} = req.params; 
const  deleteUser= await pool.query("DELETE FROM utilisateur WHERE  iduser = $1", [id] ); 
res.json(" user was deleted !"); 

} catch (err) {
    console.error(err.message); 
}

} )
   



///////////////////////////////////////////////////////  Role //////////////////////////////////





app.get("/roles", async (req,res) => {
    
    try {
    const allRoles = await pool.query ("SELECT * FROM role"); 
    res.json(allRoles.rows); 
    
    }catch (err) {
        console.error(err.message); 
        
    }})
//select from simple user

app.get("/simpleUsers", async(req, res) => {

   try {
       const allUtilisateur = await pool.query("SELECT (email, nom)  FROM Simple_User");
       res.json(allUtilisateur.rows[0]); 
   } catch (err) {
       console.error(err.message); 
   }


}); 




//create a role  
app.post("/roles", async(req,res) => {
    //await 
    try {
    console.log(req.body); 
    const {role_name , role_description} = req.body; 
    const newRole = await pool.query(
        `INSERT INTO role("role_name", "role_description") VALUES ($1, $2) `, [role_name, role_description]
    ); 
    res.json(newRole.rows[0]); 
        
    } catch (err) {
        console.error(err.message); 
    }

})

// get a role
 app.get("/roles/:id" , async(req, res) => {
try {
 
  const {id} = req.params; 
  const role= await pool.query
   ("SELECT * FROM role WHERE role_id = $1",
    [id]); 
  res.json(role.rows[0]); 


} catch (err) {
    console.error(err.message);
} })


app.get("/roles", async (req,res) => {

try {
const allRoles = await pool.query ("SELECT * FROM role"); 
res.json(allRoles.rows); 

}catch (err) {
    console.error(err.message); 
    
}})


//update a role 

app.put("/roles/:id", async (req, res) => {

try {
  
const {id} = req.params; 
const {role_name , role_description} = req.body; 
const updateRole = await  pool.query(`UPDATE "role"
 SET "role_name" = $1 , "role_description"= $2 WHERE "role_id" = $3 `, [role_name, role_description , id]); 

 res.json("Role was updated "); 

    
} catch (err) {
    console.error(err.message); 
}

})



//delete a role
app.delete("/roles/:id", async(req, res)=> {
try {
    
const {id} = req.params; 
const  deleteRole= await pool.query("DELETE FROM role WHERE  role_id = $1", [id] ); 
res.json(" role was deleted !"); 

} catch (err) {
    console.error(err.message); 
}

} )

///////////////////////////////////////////////////////  Tiers   //////////////////////////////////////////


app.get("/TypeTier", async (req,res) => {

    try {
    const alltier = await pool.query
     ("SELECT (typetier) FROM  modele,tiers WHERE modele.codetier=tiers.codetier "); 
    res.json(alltier.rows); 
    
    }catch (err) {
        console.error(err.message); 
    }});

app.get("/NameTier", async (req,res) => {

            try {
            const alltier = await pool.query
             ("SELECT name FROM  tiers   "); 
            res.json(alltier.rows); 
            
            }catch (err) {
                console.error(err.message); 
            }});
/////////////////////////////////////////////////////
/*app.get("/TypeTier/:codetier" , async(req, res) => {
            try {
              const {codetier} = req.params; 
              const role= await pool.query
               ("SELECT typetier FROM tiers WHERE codetier = $1",
                [codetier]); 
              res.json(role.rows[0]); 
            
            
            } catch (err) {
                console.error(err.message);
            } })*/

///////////////////////     Modéle            ///////////////////////////////////

//////////////// supprimer 

app.delete("/modele/:id", async(req, res)=> {
    try {
        
    const {id} = req.params; 
    const  deleteModele= await pool.query("DELETE FROM modele WHERE  idmodele = $1", [id] ); 
    res.json(" user was deleted !"); 
    
    } catch (err) {
        console.error(err.message); 
    }
    
    } )

/////////// get modele 
app.get("/CodeTierModele/:codetier" , async(req, res) => {
    try {
     
      const {codetier} = req.params; 
      const role= await pool.query
       ("SELECT * FROM modele WHERE codetier = $1",
        [codetier]); 
      res.json(role.rows[0]); 
    
    
    } catch (err) {
        console.error(err.message);
    } })
///////////  update model 
app.put("/modele/:id", async (req, res) => {

    try {
      
    const {id} = req.params; 
    const {name , type,file,codetier} = req.body; 
    const updateModel = await  pool.query(`UPDATE "modele" 
     SET "name" = $1 , "type"= $2  ,"file"=$3 , "codetier" =$4  WHERE "idmodele" = $5 `, [name,type,file,codetier , id]); 
    
     res.json("Model was updated "); 
    
        
    } catch (err) {
        console.error(err.message); 
    }
    
    })

////////////////// add modele
app.post("/modele", async(req,res) => {
    //await 
    try {
    console.log(req.body); 
    const {name,idtype,file,codetier} = req.body; 
    const newRole = await pool.query(
        `INSERT INTO modele("name", "idtype","file","codetier") VALUES ($1, $2,$3,$4) `, [name , idtype,file,codetier]
    ); 
    res.json(newRole.rows[0]); 
        
    } catch (err) {
        console.error(err.message); 
    }

})
///////////////
app.get("/modeles/:id" , async(req, res) => {
    try {
     
      const {id} = req.params; 
      const user= await pool.query
       ("SELECT * FROM modele WHERE idmodele = $1", [id]); 
      res.json(user.rows[0]); 
    
    
    } catch (err) {

        console.error(err.message);
    } })

///////////////////////
app.get("/modeles", async (req,res) => {

    try {
    const allUsers = await pool.query ("SELECT * FROM modele order by idmodele  asc "); 
    res.json(allUsers.rows); 
    
    }catch (err) {
        console.error(err.message); 
    }})
////////////////////////
app.get("/ModeleType", async (req,res) => {

    try {
    const allUsers = await pool.query
     ("SELECT idmodele,name,file,codetier,(nametype) FROM  modele u,type r WHERE u.idtype=r.idtype order by idmodele asc "); 
    res.json(allUsers.rows); 
    
    }catch (err) {
        console.error(err.message); 
  
    }})
///////////////////////////////////////////////
app.get("/ModeleType1", async (req,res) => {

    try {
    const allUsers = await pool.query
     ("SELECT (nametype) FROM  modele u,type r WHERE u.idtype=r.idtype "); 
    res.json(allUsers.rows); 
    
    }catch (err) {
        console.error(err.message); 
  
    }})
///////////////////////////////////////////////

app.get("/types", async (req,res) => {
    
    try {
    const allRoles = await pool.query ("SELECT * FROM type"); 
    res.json(allRoles.rows); 
    
    }catch (err) {
        console.error(err.message); 
        
    }})


    /////
    app.get("/type/:id" , async(req, res) => {
        try {
         
          const {id} = req.params; 
          const user= await pool.query
           ("SELECT * FROM type WHERE idtype = $1", [id]); 
          res.json(user.rows[0]); 
        
        
        } catch (err) {
    
            console.error(err.message);
        } })  
/////////////
app.delete("/type/:id", async(req, res)=> {
    try {
        
    const {id} = req.params; 
    const  deleteType= await pool.query("DELETE FROM type WHERE  idtype = $1", [id] ); 
    res.json(" Type was deleted !"); 
    
    } catch (err) {
        console.error(err.message); 
    }
    
    } )

    ///////////////
    
app.delete("/deleteUser/:id", async(req, res)=> {
    try {
        
    const {id} = req.params; 
        const deleteSimpleUser = await pool.query("DELETE FROM Simple_User WHERE  id_user = $1", [id] ); 
    res.json(" user annuler !"); 
    
    } catch (err) {
        console.error(err.message); 
    }
    
    } )




    /** */
    app.post("/type", async(req,res) => {
        //await 
        try {
        console.log(req.body); 
        const {nametype } = req.body; 
        const newRole = await pool.query(
            `INSERT INTO type("nametype") VALUES ($1) `, [nametype]); 
        res.json(newRole.rows[0]); 
            
        } catch (err) {
            console.error(err.message); 
        }
    
    })
  ////////////////
  
  app.put("/type/:id", async (req, res) => {

    try {
      
    const {id} = req.params; 
    const {nametype} = req.body; 
    const updateType = await  pool.query(`UPDATE "type"
     SET "nametype" = $1  WHERE "idtype" = $2 `, [nametype , id]); 
    
     res.json("type was updated "); 
    
        
    } catch (err) {
        console.error(err.message); 
    }
    });

app.listen(8080,() => {

    console.log("port is ready  8080"); 

}); 


//
