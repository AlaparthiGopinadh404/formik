import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from "yup";



function Formikvalidation() {
    const [array, setarray] = useState([]);
   
    const validationSchema = Yup.object({
        firstName:Yup.string().min(2, 'Too Short!')
        .max(15, 'Too Long!').required(), 
        lastName: Yup.string().min(3).max(10).required(),
        mobileNumber: Yup.number().min(1000000000, 'phonenumber 10 digits').max(9999999999, 'phonenuumber 10 digits').required(),
        gender: Yup.string().required(),
        email: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email').required(),
        state: Yup.string().required(),
        agreecheck:Yup.bool().oneOf([true],'check the confirmation box').required()
    });
    const initialValues = {
        firstName: '',
        lastName: '',
        mobileNumber: '',
        gender: '',
        email: '',
        state: '',
        agreecheck:false

    };
    // const onSubmit = (values) => {
    //     console.log(values)
    //     // setarray(values)
    // }
    const onSubmit = (values) => {
        console.log(values);
        const ar = [...array,values];
        setarray(ar)
        
        console.log('res',ar)
        localStorage.setItem('array',JSON.stringify(ar))
        
    }
    useEffect(()=>{
        const str= JSON.parse(localStorage.getItem('str'));
        if(str){
            setarray(str)
        }
    })
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values)
                    resetForm();
                }}
            >
                <Form>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label htmlFor='firstName' >FirstName:</label>
                                <Field type="text" name="firstName" className='form-control' placeholder="enter firstname" />
                                <ErrorMessage name="firstName" />
                            </div>
                            <div className='col-md-6 '>
                                <label htmlFor='lastName'>LastName:</label>
                                <Field type="text" name="lastName" className="form-control text-danger" placeholder="enter last name" />
                                <ErrorMessage name="lastName" />
                            </div>
                        </div>
                        <div className='row '>
                            <div className='col-md-6'>
                                <label htmlFor='mobilenumber'>PHN NO:</label>
                                <Field type="number" name="mobileNumber" placeholder="enter phone number" className="form-control" />
                                <ErrorMessage name="mobileNumber" />
                            </div>
                            <div className='col-md-6 '>
                                <label htmlFor='gender'>Gender</label>
                                <div>
                                    <label>
                                        <Field type="radio" name="gender" className="p-2 m-2" value="male" />
                                        Male
                                    </label>
                                    <label>
                                        <Field type="radio" name="gender"className="m-2" value="female" />
                                        Female
                                    </label>
                               
                                </div>
                                <ErrorMessage name="gender"/>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-md-6 text-danger'>
                                <label htmlFor='email' className='text-dark'>Email:</label>
                                <Field type="email" name="email" placeholder="enter email" className="form-control" />
                                <ErrorMessage name='email' />
                            </div>
                            <div className='col-md-6 mt-4 text-danger'>
                                {/* // <label htmlFor='state'>State</label> */}
                                <Field as="select" name="state" className="form-control " placeholder="please select state" >
                                   <option>....please select state....</option>
                                    <option value="Andhrapradesh">A.p</option>
                                    <option value="Telagana">T.S</option>
                                    <option value="Tamilnadu">Chennai</option>
                                    <option value="Bangolore">karantaka</option>
                                </Field>
                                <ErrorMessage name="state" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 '>
                                {/* <label htmlFor='checkbox'>Checkbox:</label> */}
                                <Field type="checkbox" name="agreecheck" className="text-dark" />
                                <p>I agree the confirmation box</p>
                                <ErrorMessage name="agreecheck" />
                            </div>
                        </div>
                        <button type="submit" className='btn btn-primary'>submit</button>

                    </div>
                </Form>
            </Formik>
            <table className='table table-striped table-responsive'>
                <thead>
                    <tr>
                    <th>FirstName</th>
                    <th>lastName</th>
                    <th>PHN NO</th>
                    <th>Gender</th>
                    <th>email</th>
                    <th>State</th>
                    </tr>
                   
                </thead>
                <tbody>
                  {array && array.map((a,i)=>{
                        return<tr key={i+1}>
                            <td>{a?.firstName}</td>
                            <td>{a?.lastName}</td>
                            <td>{a?.mobileNumber}</td>
                            <td>{a?.gender}</td>
                            <td>{a?.email}</td>
                            <td>{a?.state}</td>
                        </tr>
                    })
                  }
                </tbody>
            </table>

        </div>


    )
}

export default Formikvalidation