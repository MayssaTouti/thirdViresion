import React, { Fragment , useEffect , useState }  from "react";
import EditModel  from "./EditModel";

const SearchType = () => {
  

    const [modele, setModele] = useState([]); 
    const [code, setCodeTier] = useState([]); 


    const getModel = async () => {
        try {
            const response = await fetch("http://localhost:5000/modeles"); 
            const jsonData = await response.json(); 
    
            setModele(jsonData); 
           
           // console.log(jsonData); 
        } catch (err) {
            console.log(err.message); 
            
        }
    }
        useEffect(() => {
        getModel();
        }, []); 
    
        console.log(modele); 
       
  //delete function 
  const deleteModele = async (id) => {
    try {
     const deleteModele = await fetch(`http://localhost:5000/modele/${id}`,{
         method: "DELETE"
     }); 
      console.log(deleteModele); 
      setModele(modele.filter(modele => modele.idmodele !== id)) 
    } catch (err) {
        console.error(err.message); 
    }
}; 

    const getSearchCode = async () => {
        try {
            const response = await fetch("http://localhost:5000/CodeTierModele/${code}"); 
            const jsonData = await response.json(); 
    
            setCodeTier(jsonData); 

           // console.log(jsonData); 
        } catch (err) {
            console.log(err.message); 
            
        }
    }
        useEffect(() => {
        getSearchCode();
        }, [code]); 
    
        console.log(modele); 


        const handleCode = (event) =>{
            const getType = event.target.value;
            console.log(getType);
            setCodeTier(getType);
          }        
return (
            <div>
            
               <div className="form-inline"  style={{width:200,marginInlineStart:1000}}>
                    <div className="input-group-append"><p>{code}</p>
 <input type="text" name="codetier" onChange={e => handleCode(e)}/>
<button className="btn btn-info"  onClick={() =>{ getSearchCode(modele.codetier)}} >
 <i className="fas fa-search fa-fw" /> Search</button>
            
                    
                    </div>
                
                </div>
                <h2 className="text-center mt-5"> Liste Models </h2>
                <form  style={{width:1000,marginInlineStart:320}}>
            
            <table className="table mt-5 text-center"  >
                <thead  >
                  <tr>
                    <th >id Model  </th>
                    <th > Name model </th> 
                    <th  > Type model</th>
                    <th  > Description model</th>
                    <th  > Name Tier </th>  
                    <th style={{width: 60, justifyContent: 'center',marginInlineStart:50 }}> </th>
                 
                  </tr>
                </thead>
                <tbody >
              
                
               {modele.map(model => (
                 <tr key={model.idmodele   }  >
                <td >{ model.idmodele }</td>
                <td >{ model.name }</td>
                <td>{model.type}</td>
                <td>{model.description}</td>
                <td>{model.codetier}</td>
               <td class="project-state">
            </td>
                     <td  > <EditModel model={model} /> </td>
                     <td>
              {/*<Details className="btn btn-info"  />*/}
                 
              <button className="btn btn-danger"  onClick={() =>{  if ((window.confirm('Are you sure you to delete this model ?')) === true ){
                       deleteModele(model.idmodele)
                     } 
                     else{this.onSave(model.idmodele) } 
                     }
                  } > Delete</button> </td>     </tr> 
             
               ) )}
            
                </tbody>
              </table>
            
            
            </form>
            </div>
            
            
            )
            




}
export default SearchType; 