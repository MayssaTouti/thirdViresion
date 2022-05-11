/*import React , { useState , useEffect}  from "react" ;


const Tiers = () =>{
    const [codetier, setCodeTier] = useState([]); 
    const [tiers, setTypeTier] = useState([]); 


    const onSubmitForm = async e => {
        e.preventDefault();
    
           try {
         const body = { codetier}; 
            const response =  fetch("http://localhost:5000/CodeTier", {
                method: "POST", 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify(body)
                }); 

         console.log(response); 
    
        } catch (err) {
            console.error(err.message); 
            }}; 
    
            useEffect (()  =>  {
                console.log ("erreur ");

                },[]);

return (
        <div>
    <label>Tiers Model :</label>
<select className="form-control"  name="codetier" value={codetier} >
{tiers.map (tier => (<option key={tier.codetier} >{tier.type} </option>
 ))}</select>
        </div>
    )
}
export default Tiers ;*/