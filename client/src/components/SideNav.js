import React from 'react';
//import Background from '../images/2.jfif';
//import InputUser from './InputUser';
//import ListeUser from './ListeUser';
const  SideNav= () =>{

  
/*
  var sectionStyle = {
    backgroundImage: `url(${Background})`
  };*/
  return (
<div >
<aside className="main-sidebar sidebar-dark-primary elevation-4" /* style={ sectionStyle }*/>
  {/* Brand Logo */}
  <a href="index3.html" class="brand-link">
<img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"/>

 
 </a>
  <br></br>
  <a href="index3.html" className="brand-link">
    <img src="dist/img/wedo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <br></br>
    <span className="brand-text font-weight-light">Wedo Consult </span>
  </a>
<br></br>
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
 
   
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>

    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="reeview" role="menu" data-accordion="false">

        <li className="nav-item">
       <a href="/listeUser" className="nav-link">
          <i className="nav-icon fas fa-table" />
            
            <p>
              List  Users 
              <i className="fas fa-angle-left right" />
            </p>
          </a>
            
        </li>
        <li className="nav-item">
       <a href="/inputUser" className="nav-link">
          <i className="nav-icon fas fa-table" />
            
            <p>
               Add User 
              <i className="fas fa-angle-left right" />
            </p>
          </a>
            
        </li>
        <li className="nav-item">
          <a href="/listeRole" className="nav-link">
          <i className="nav-icon fas fa-edit" />
            
            <p>
               List of Roles Users
              <i className="fas fa-angle-left right" />
            </p>
          </a>
         
        </li>
              
              <li className="nav-item">
                <a href="/listDemande" className="nav-link">
                  <i className="nav-icon fas fa-edit" />

                  <p>
                   liste demande utilisateur
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>

              </li>
        <li className="nav-item">
          <a href="/inputRole" className="nav-link">
          <i className="nav-icon fas fa-edit" />
            
            <p>
              Add Role User
              <i className="fas fa-angle-left right" />
            </p>
          </a>
         
        </li>

        <li className="nav-item">
          <a href="/Model" className="nav-link">
            <i className="nav-icon fas fa-book" />
            <p>
              Setting up a model
              <i className="fas fa-angle-left right" />
            </p>
          </a>
         
        </li>
        <li className="nav-item">
          <a href="/listeModele" className="nav-link">
            <i className="nav-icon fas fa-book" />
            <p>
              List Modeles
              <i className="fas fa-angle-left right" />
            </p>
          </a>
         
        </li>
        <li className="nav-item">
          <a href="/inputModele" className="nav-link">
            <i className="nav-icon fas fa-book" />
            <p>
              Add Modele
              <i className="fas fa-angle-left right" />
            </p>
          </a>
         
        </li>
        <li className="nav-item">
          <a href="/inputType" className="nav-link">
            <i className="nav-icon fas fa-book" />
            <p>
              List type Modele
              <i className="fas fa-angle-left right" />
            </p>
          </a>
         
        </li>
         
       
     
        
     
      
       
       
      
      </ul>
    </nav>
  
  </div>
 
</aside>

 </div>


 )

}

export default SideNav ;
