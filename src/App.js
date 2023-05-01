import React, { createContext, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Form from './Form';
import FormValidation from './FormValidation';
import  {Routes,Route } from 'react-router-dom';
import Formedit from './Formedit';
import Formik from './Formik';
export const ColorContext = createContext();

function App() {
  const [theme,setTheme] =useState(true);
  return (
    <div className=" p-2 m-2">
      <ColorContext.Provider value={{theme,setTheme}}>
        <button onClick={()=>{setTheme(!theme)}} className='btn btn-primary'>change mode</button>
      <h1 className='text-center'>Form</h1>
     <Routes>
      <Route path="/" element={<FormValidation/>}/>
      <Route path ="/Formedit" element={<Formedit/>}/>
     </Routes>
      {/* <FormValidation/> */}
      </ColorContext.Provider>
      <Formik/>
    </div>
  );
}

export default App;
