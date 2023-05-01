import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";

import { useNavigate,useLocation } from 'react-router-dom';

function Formedit() {
    const [array, setArray] = useState([])
     const navigate =useNavigate(); 
     const data = useLocation() ; 
    const validiationSchema = Yup.object({
        firstName: Yup.string().min(2, 'Too Short!')
            .max(15, 'Too Long!').required(),
        lastName: Yup.string().min(3).required(),
        mobileNumber: Yup.number().min(10).required(),
        DOB: Yup.date().required(),
        Email: Yup.string().email().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email').required(),
        Gender: Yup.string().required(),
        //  checked:Yup.bool().oneOf([true], 'course is selected'),
    
        select: Yup.string().required(),
    });

    var index=data.state.i

    console.log("index",index);
    const initialValues = {
        firstName:data.state.a.firstName,
        lastName: data.state.a.lastName,
        mobileNumber: data.state.a.mobileNumber,
        DOB: data.state.a.DOB,
        Email: data.state.a.Email,
        Gender: data.state.a.Gender,
        checked: data.state.a.checked,
        // check:'',
        // checkedd:'',
        select: data.state.a.select

    };
    const onSubmit = (values) => {
        console.log(values);
        navigate('/')
        let temp=[...array]
        temp[data?.state?.i]=values; 
        let ar=[...temp]
        setArray(ar)
        localStorage.setItem('items', JSON.stringify(ar));
        
    };
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'));
        if(items){
            setArray(items)
        }
        
    },[])
    // const Delete = (i)=>{
    //     var temp=[...array]
    //     temp.splice(i,1)
        
    //     setArray(temp)
    //     console.log('temp',temp)
        
    // }  
     
   


    // const renderError = (message) => <p className='helpis-danger'>{message}</p>
    return (
        <div className='p-2 m-2'>

            <Formik
                initialValues={initialValues}
                validationSchema={validiationSchema}
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values)
                    resetForm();
                }}
            >
                <Form >
                    <div className='container'>

                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <label htmlFor='firstName'>FirstName:</label>
                                <Field type="text" name="firstName" className="form-control" placeholder="firstname" />
                                <ErrorMessage name="firstName" />
                            </div>
                            <div className="col-md-6 col-sm-12 ">
                                <label htmlFor='lastName'>LastName:</label>
                                <Field type="text" name="lastName" className="form-control input input-bordered" placeholder="lastname" />
                                <ErrorMessage name='lastName' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mt-3 col-sm-12">
                                <label htmlFor='phoneno'>PHN NO:</label>
                                <Field type="text" name="mobileNumber" className="form-control" placeholder="mobileno" />
                                <ErrorMessage name="mobileNumber" />
                            </div>
                            <div className="col-md-6 mt-3 col-sm-12">
                                <label htmlFor='DOB'>DOB:</label>
                                <Field type="date" name="DOB" className="form-control" placeholder="DOB" />
                                <ErrorMessage name='DOB' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mt-3 col-sm-12">
                                <label htmlFor='email'>Email:</label>
                                <Field type="email" name="Email" className="form-control" placeholder="Enter email id" />
                                <ErrorMessage name="Email" />
                            </div>

                            <div className='col-md-6 mt-4 p-3 col-sm-12'>
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
                            <div className='col-md-6 mt-4 col-sm-12'>

                                <label>
                                    <Field type="checkbox" name="checked" className='p-2' value="html" />
                                    HTML

                                </label>
                                

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


                        <button type="submit" className="btn btn-primary"  >Update</button>
                    </div>
                </Form>
            </Formik>

            <table className='table table-responsive table-bordered p-2'>
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
                        {/* <th>Actions</th> */}
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
                                {/* <td>{a.checked}</td> */}
                                {/* <td colSpan={2}><button className='btn btn-danger m-1' >Update</button>
                                <button className='btn btn-primary'  >Cancel</button></td> */}
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div >
    )
}

export default Formedit;
