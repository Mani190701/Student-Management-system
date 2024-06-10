
import React from 'react';
import { useEffect,useState } from "react";
import axios from 'axios';
import "./table.css";
import { useNavigate } from 'react-router-dom';
import './App.css';
import { Component } from 'react';
import Form from './form';

import SweetAlert2 from 'react-sweetalert2';
import Swal from 'sweetalert2'

export default function Table(){
 
    const  [users,setUsers]=useState([]);
    const [filteredUsers,setFilterUsers] = useState([]);
    const [isModelOpen,setIsModelOpen]= useState(false);
    const [userData,setUserData]= useState({firstName:"",lastName:"",location:"",email:"",day:"",education:"",month:"",year:"",about:""});
    const [swalProps, setSwalProps] = useState({});
    
   const navigate=useNavigate();

    const getAllUsers= async () => {
  
      await axios.get("http://localhost:8000/users").then 
      ((res) => {
        console.log(res.data);
        setUsers(res.data);
        setFilterUsers(res.data);
      });
    
       
    };
  
  
  
    useEffect(()=>{
      getAllUsers();
    },[]);
  
   
  
  //search function
  
  const handleSearchChange =(e) =>{
  const searchText=e.target.value.toLowerCase();
  const filteredUsers=users.filter((user)=>user.firstName.toLowerCase().includes(searchText)   || user.lastName.toLowerCase().includes(searchText)  || user.location.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText)  || user.education.toLowerCase().includes(searchText));
  
  setFilterUsers(filteredUsers);
  };
  

 
const sweet = () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "Delete This Id",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });
}

// Delete Function
const handleDelete = async (id) => {
  try {
    const result = await sweet();
    if (result.isConfirmed) {
      await axios.delete(`http://localhost:8000/users/${id}`);
      const res = await axios.get('http://localhost:8000/users');
      setUsers(res.data);
      setFilterUsers(res.data);
    }
  } catch (error) {
    console.error("Error deleting user: ", error);
  }
};

  
  // ADD Record
  // const handleAddRecord =()=>{
  //  setUserData({fname:"",lname:"",loc:"",email:"",dob:"",edu:""})
  // setIsModelOpen(true);
  // }
  //  
  

  //update record
  // const updateRecord =(user)=>{
  //   // navigate("/form");
  //   setIsModelOpen(true);
   
  // }

  return (
      <>

  
        <div className="container">
          <h3 className='m-3'>Student Management System</h3>
          <div className="row ">
            <div className="col-5 search" >
            <input type="search col-10" className='form-control' name="" id="search" placeholder='Search' onChange={ handleSearchChange} />   
            <i className="fa-solid fa-magnifying-glass "></i>
            </div><SweetAlert2 {...swalProps} />
            <div className="col"></div>
            <div className="col-2">
              <button type="button" className='btn btn-dark rounded addbtn p-2 ' onClick={()=>{
               navigate("/form");
              }}> Add  </button>
            </div>
         
          </div>
          <table className="table border p-3 mt-4">
            <thead className='p-3 m-3'>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Education</th>
              <th>Action</th>
              <th>Delete</th>
  
            </tr>
            </thead>
            <tbody>
             
            {filteredUsers &&
            filteredUsers.map((user,index) => {
              return(
                <tr key={user.id} >
                <td id='td-data'>{index+1}</td>
                <td id='td-data'>{user.firstName}</td>
                <td id='td-data'>{user.lastName}</td>
                <td id='td-data'>{user.location}</td>
                <td id='td-data'>{user.email}</td>
                <td id='td-data'>{user.day}:{user.month}:{user.year}</td>
                <td id='td-data'>{user.education}</td>
             
                <td>
                  <button type='button'  className='btn table-btn'><i className="fa-solid fa-user-pen "> </i> Edit</button>
                </td>
                <td>
                  <button onClick={()=>handleDelete(user.id)}  type="button"  className='btn table-btn' ><i className="fa-solid fa-trash-can"></i> Delete</button>
                </td>
              </tr> 
              );
            })}
        
              
     
            </tbody>
          </table>
       

        </div>
          
  <SweetAlert2 {...swalProps} />

      </>
    )
}