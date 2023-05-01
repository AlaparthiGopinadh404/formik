import React, { useState } from 'react';
import { useFormik } from 'formik';
import { array } from 'yup';
function checkForm(values) {
    // console.log(values)
    var errors = {};
    if (!values.firstName) {
        errors.firstName = 'firstname is mandatory'
    }
    if (!values.lastName) {
        errors.lastName = 'lastname is mandatory'
    }
    if (!values.mobileNumber) {
        errors.mobileNumber = 'mobilenumber is mandatory'
    }
    if (!values.DOB) {
        errors.DOB = 'dateofbirth is manadatory'
    }
    if (!values.Email) {
        errors.Email = 'email is manadatory'
    }
    if (!values.Gender) {
        errors.Gender = 'Gender is manadatory'
    }
    if (!values.select) {
        errors.select = 'state is manadatory'
    }
    return errors;
}
function Form() {
    const [array,setArray]=useState([])
    var formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            DOB: '',
            Email: '',
            Gender: '',
            checked: '',
            // check: '',
            // checkedd: '',
            select: '',
            mobileNumber: ''

        },
        validate: checkForm,
        onSubmit: (values) => {
            console.log("submit", values)
            const ar=array;
            ar.push(values);
            console.log('forms',ar)
            setArray=[...ar]
        }
    })
    //    console.log(formik)
    return (
        <div className=" p-2 m-2">
            <form onSubmit={formik.handleSubmit} className='p-3 '>
                <div className='container'>
                    <div className='row m-1'>
                        <div className='col-md-6 '>
                            <label htmlFor='firstname'>FirstName:</label>
                            <input type="text" name="firstName" className='form-control' value={formik.values.firstName} onChange={formik.handleChange} /><br />
                            {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                        </div>
                        <div className='col-md-6 '>
                            <label htmlFor='lastname'>LastName:</label>
                            <input type="text" name="lastName" className='form-control' value={formik.values.lastName} onChange={formik.handleChange} /><br />
                            {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                        </div>
                    </div>
                    <div className='row m-1'>
                        <div className='col-md-6 '>
                            <label htmlFor='mobileNumber'>PhnNO:</label>
                            <input type="text" name="mobileNumber" className='form-control' value={formik.values.mobileNumber} onChange={formik.handleChange} minLength={10} maxLength={12} /><br />
                            {formik.errors.mobileNumber ? <div>{formik.errors.mobileNumber}</div> : null}
                        </div>
                        <div className='col-md-6  '>
                            <label htmlFor='Dateofbirth'>DOB:</label>
                            <input type="date" name="DOB" className='form-control' value={formik.values.DOB} onChange={formik.handleChange} /><br />
                            {formik.errors.DOB ? <div>{formik.errors.DOB}</div> : null}
                        </div>
                    </div>
                    <div className='row m-1'>
                        <div className='col-md-6 '>
                            <label htmlFor='email'>Email:</label>
                            <input type="email" name="Email" className='form-control' value={formik.values.Email} onChange={formik.handleChange} pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$' /><br />
                            {formik.errors.Email ? <div>{formik.errors.Email}</div> : null}
                        </div>
                       
                        <div className='col-md-6 mt-4'>
                            <select className="form-select form-control" name='select'  aria-label="Default select example" onChange={formik.handleChange}>
                                <option >please select state </option>
                                <option value="A.P">Andhrapradesh</option>
                                <option value="U.P">uttarpradesh</option>
                                <option value="US">Unitedstates</option>
                            </select>
                            {formik.errors.select ? <div>{formik.errors.select}</div> : null}
                        </div>
                    </div>
                    <div className='row m-1'>
                        <div className='col-md-6 mt-4'>
                            
                            <label>
                                <input type="checkbox" name="checked" className='p-2' value="html" onChange={formik.handleChange} />
                                HTML
                            </label>
                            <label>
                                <input type="checkbox" name="checked"   className='p-2'value="reactjs" onChange={formik.handleChange} />
                                ReactJs
                            </label>
                            <label>
                                <input type="checkbox" name="checked"  className='p-2' value="css" onChange={formik.handleChange} />
                                CSS
                            </label><br />
                        </div>
                        <div className='col-md-6 '>
                            
                            <div className=' mt-3 p-2'>
                            <label>Gender:</label>
                            <label htmlFor='male' className='p-2'>Male</label>
                            <input type="radio" name="Gender"  onChange={formik.handleChange} value="male" />
                            {formik.errors.Gender ? <div>{formik.errors.Gender}</div> : null}
                            <label htmlFor='female' className='p-2'>Female</label>
                            <input type="radio" name="Gender"  onChange={formik.handleChange} value="female" /><br />
                            {formik.errors.Gender ? <div>{formik.errors.Gender}</div> : null}
                            </div>
                            
                        </div>
                    </div>

                    <button type="submit" className='btn btn-primary m-2'>Submit</button>
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>DOB</th>
                        <th>PHNNo</th>
                        <th>Email</th>
                        <th>State</th>
                        <th>Check</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        array.map((a,i)=>{
                            return <tr>
                                <td>{a.firstName}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>


    )
}

export default Form;