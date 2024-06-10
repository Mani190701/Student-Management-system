import React from 'react';
import { useEffect,useState } from "react";
import axios from 'axios';

import { Navigate } from 'react-router-dom';
import './App.css';
import { Component } from 'react';
import Form from './form';
import Table from './table';
import Update from './update';
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom';


function App() {
  return(
  <div className='App'>
  <BrowserRouter>
  <Routes>
  <Route exact path="/" element={<Table/>} />
    <Route  path="/form" element={<Form/>} />
    <Route  path="/update:id" element={<Update/>} />
  </Routes>
    </BrowserRouter>
   
    </div>
  )

}




 

export default App
