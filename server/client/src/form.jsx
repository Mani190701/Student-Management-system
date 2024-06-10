import React ,{useState}from 'react';
import './form.css';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver}from '@hookform/resolvers/yup';
import { useNavigate ,} from 'react-router-dom';
import axios from 'axios';

const schema =yup.object().shape({
  firstName:yup.string().required('First name is Required'),
  lastName:yup.string().required('Last name is Required'),
  email:yup.string().email('Please Enter Valid Email.. ').required('Email is Required'),
  location:yup.string().required('Location is Required'),
  education:yup.string().required('Education is Required'),
  about:yup.string().required('About is Required'),
  day:yup.number().integer().positive().required('Day is Required'),
  month:yup.number().integer().positive().required('Month is Required'),
  year:yup.number().integer().positive().required('Year is Required'),

});
export default function Form(){
  
  const navigate=useNavigate();
  const { register,handleSubmit,formState:{errors,isValid,isDirty}} = useForm({
    resolver:yupResolver(schema),
    mode:'onChange'

  });
  console.log('errors',errors);

 




  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/users', data);
      alert('Data saved successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  return (
    <>
   
      <div className="row container-fluid mt-3">
        <div className="col-1 text-center">
          <button type="button btn btn-primary" className='backbtn'
           onClick={()=>{
            navigate("/");
          }} >
        <i className="fa-solid fa-arrow-left"></i></button>
        </div>
        <div className="col"></div>
      </div>
      <div className='container mt-3'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
            <div className="col-6">
                <div className="input-grp">
                <label htmlFor="fname">First Name:</label>
                <input    {...register('firstName')}  type="text" placeholder='Enter Your First Name' name='firstName' id='fname' className='form-control' />
                <p>{errors.firstName?.message}</p>
                </div>
                <div className="input-grp">
                <label htmlFor="loc">Location :</label>
                <input  {...register('location')} type="text" name='location'placeholder='Enter Your Location'  id='loc' className='form-control' />
                <p>{errors.location?.message}</p>
                </div>
                <div className="input-grp">
                <label htmlFor="email">Email :</label>
                <input  {...register('email')} type="email" name='email' placeholder='Enter Your E-Mail'  id='email' className='form-control' />
                <p>{errors.email?.message}</p>
                </div>

           
                <div className="input-grp row">
                  <div className="col-3">
                <label htmlFor="doc">DOB :</label>
                </div>
                <div className="col-9">
                <input  {...register('day')} type="text" id="day" name="day" maxLength="2" placeholder="DD"   className='form-control'/>
                <input  {...register('month')} type="text" id="month" name="month" maxLength="2" placeholder="MM"   className='form-control'/>
                <input  {...register('year')} type="text" id="year" name="year" maxLength="4" placeholder="YYYY"  className='form-control'/>

                </div>
                <p>{errors.day?.message || errors.month?.message ||errors.year?.message}</p>
             
                </div>
                
                <div className="input-grp">
                <label htmlFor="edu">Education :</label>
                <select  {...register('education')}  name="edu" id="edu"   className='form-control'>
              
  <option value="B.E">B.E</option>
  <option value="B.Tech">B.Tech</option>
  <option value="MCA">MCA</option>
  <option value="M.Tech">M.Tech</option>
  <option value="M.Sc ">M.Sc</option>
  <option value="B.Sc">B.Sc</option>

                </select>
                <p>{errors.education?.message}</p>
                </div>
                <div className="input-grp" id="about">
                <label htmlFor="About" id="abo">About:</label>
                <textarea  {...register('about')}  id="about" name="about"  placeholder='Write Something'  rows="4" cols="30" className='form-control' />
                <p>{errors.about?.message}</p>
                </div>
                <div className="row mt-3">
                  <div className="col"></div>
                  <div className="col-2 text-center">
                    <button type="submit" className='btn btn-dark' disabled={isDirty && !isValid}  >Submit</button>
                    {/*  */}
                  </div>
                  <div className="col"></div>
                </div>

            </div>
            <div className="col-6">
            <div className="input-grp">
                <label htmlFor="lname">Last Name:</label>
                <input  {...register('lastName')} type="text" name='lastName'placeholder='Enter Your Last Name'  id='lname'  className='form-control'/>
                <p>{errors.lastName?.message}</p>
                </div>
            </div>
        </div>
      </form>
    </div>
    </>
  )


}