import React, { useEffect, useState,useContext } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";

import { useNavigate } from 'react-router-dom';
import { ColorContext } from './App';

function FormValidation() {
    const navigate =useNavigate();
    const [array, setArray] = useState([])
    
    const validationSchema = Yup.object({
        firstName: Yup.string().min(2, 'Too Short!')
            .max(15, 'Too Long!').required(),
        lastName: Yup.string().min(3).required(),
        mobileNumber: Yup.number().min(10).required(),
        DOB: Yup.date().required(),
        Email: Yup.string().email().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email').required(),
        Gender: Yup.string().required(),
        //  checked:Yup.bool().oneOf([true], 'course is selected'),
        // check:Yup.string().required(),
        // checkedd:Yup.string().required(),
        select: Yup.string().required(),
    });
    const initialValues = {
        firstName: '',
        lastName: '',
        mobileNumber: '',
        DOB: '',
        Email: '',
        Gender: '',
        checked: '',
        // check:'',
        // checkedd:'',
        select: ''

    };
    const onSubmit = (values) => {
        console.log(values);
        const ar = [...array,values];
        setArray(ar)
        console.log('test',ar);
        localStorage.setItem('items', JSON.stringify(ar));
       

    };
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'));
        if(items){
            setArray(items)
        }
        
    },[])
    const Delete = (i)=>{
        var temp=[...array]
        temp.splice(i,1)
        
        setArray(temp)
        console.log('temp',temp)
        
    }  
    const themes = useContext(ColorContext);
    const {theme,settheme}=themes
   


    // const renderError = (message) => <p className='helpis-danger'>{message}</p>
    return (
        <div className='p-2 m-2'>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values)
                    resetForm();
                }}
            >
                <Form className={theme?"bg-light":"bg-dark text-light"} >
                    <div className='container'>

                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <label htmlFor='firstName'>FirstName:</label>
                                <Field type="text" name="firstName" className="form-control" placeholder="firstname" />
                                <ErrorMessage name="firstName" />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <label htmlFor="lastName">LastName:</label>
                                <Field type="text" name="lastName" className="form-control input input-bordered" placeholder="lastname" />
                                <ErrorMessage name="lastName" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6  col-sm-12 mt-3">
                                <label htmlFor='phoneno'>PHN NO:</label>
                                <Field type="text" name="mobileNumber" className="form-control" placeholder="mobileno" />
                                <ErrorMessage name="mobileNumber" />
                            </div>
                            <div className="col-md-6 col-sm-12 mt-3">
                                <label htmlFor='DOB'>DOB:</label>
                                <Field type="date" name="DOB" className="form-control" placeholder="DOB" />
                                <ErrorMessage name='DOB' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6  col-sm-12 mt-3">
                                <label htmlFor='email'>Email:</label>
                                <Field type="email" name="Email" className="form-control" placeholder="Enter email id" />
                                <ErrorMessage name="Email" />
                            </div>

                            <div className='col-md-6  col-sm-12 mt-4 p-3'>
                                <Field as="select" name="select" className="form-control" placeholder="please select state">

                                    <option >please select state </option>
                                    <option value="A.P">Andhrapradesh</option>
                                    <option value="U.P">uttarpradesh</option>
                                    <option value="US">Unitedstates</option>
                                    <option value="U.K">London</option>
                                    <option value="MA">Malesiya</option>
                                </Field>
                                <ErrorMessage name="select" />
                            </div>

                        </div>
                        <div className='row m-1'>
                            <div className='col-md-6 col-sm-12 mt-4'>

                                <label>
                                    <Field type="checkbox" name="checked" className='p-2' value="html" />
                                    HTML

                                </label>
                                {/* <ErrorMessage name="checked" /> */}

                                <label>
                                <Field type="checkbox" name="check"   className='m-1'value="reactjs" />
                                ReactJs
                            </label>
                           
                            {/* <label>
                                <Field type="checkbox" name="checkedd"  className='p-2' value="css"/>
                                CSS
                            </label> */}

                                <br />
                            </div>
                            <div className='col-md-6 col-sm-12 '>

                                <div className=' mt-3 p-2'>
                                    <label>Gender:</label>
                                    <label htmlFor='male' className='p-2'>Male</label>
                                    <Field type="radio" name="Gender" value="male" />
                                    {/* <ErrorMessage name="Gender" render={renderError}/> */}
                                    <label htmlFor='female' className='p-2'>Female</label>
                                    <Field type="radio" name="Gender" value="female" /><br />
                                </div>
                                <ErrorMessage name="Gender" />
                            </div>
                        </div>


                        <button type="submit" className="btn btn-primary  mb-2">Submit</button>
                    </div>
                </Form>
            </Formik>
           <div className='tabledata'>
            <table className='table table-responsive  table-bordered p-2'>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>lastName</th>
                        <th>PHN NO</th>
                        <th>DOB</th>
                        <th>Email</th>
                        <th>state</th>
                        <th>Gender</th>
                        {/* <th>check</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {array && array.map((a, i) => {
                            return <tr key={i + 1}>
                                <td>{a?.firstName}</td>
                                <td>{a?.lastName}</td>
                                <td>{a?.mobileNumber}</td>
                                <td>{a?.DOB}</td>
                                <td>{a?.Email}</td>
                                <td>{a?.select}</td>
                                <td>{a?.Gender}</td>
                                <td colSpan={2}><button className='btn btn-danger m-1 buttondata' onClick={()=>{Delete(i)
                                 const confirmBox = window.confirm(
                                    "Do you really want to delete this record:"
                                  )
                                  if (confirmBox === true) {
                                    Delete(i)
                                  }}}>Delete</button></td>
                               <td> <button className='btn btn-primary buttondata'  onClick={()=>{navigate('/Formedit',{state:{a,i}})}} >Edit</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>

        </div >
    )
}

export default FormValidation;
