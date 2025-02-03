import React, { useEffect, useState } from 'react';
import { addStudent,getStudents, updateStudent } from '../Service.jsx/StudentServices';
import { useNavigate,useParams } from 'react-router-dom';

const StudentComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [qualification, setQualification] = useState('');
  const [branch, setBranch] = useState('');
  const [yearOfPassed, setYearOfPassed] = useState('');
  const [batchId, setBatchId] = useState('');
  const [status, setStatus] = useState('');

 const {id}=useParams();
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    qualification: '',
    branch: '',
    yearOfPassed: '',
    batchId: '',
    status: '',
  });

  useEffect(()=>{
    if(id){
     getStudents(id).then((response)=>{
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setMobile(response.data.mobile);
        setEmail(response.data.email);
        setQualification(response.data.qualification);
        setBranch(response.data.branch);
        setYearOfPassed(response.data.yearOfPassed);
        setBatchId(response.data.batchId);
        setStatus(response.data.status);
     })
    }
  },[])

  function saveOrupdateStudent(e) {
    e.preventDefault();

    if (validateForm()) {
        
      const student = {
        firstName,
        lastName,
        mobile,
        email,
        qualification,
        branch,
        yearOfPassed,
        batchId,
        status,
      };
      
      if(id){
        updateStudent(id,student).then((response)=>{
            console.log(response.data);
            navigator('/student')
        }).catch(error=>{
            console.error(error);
        })
      }
      else{
      addStudent(student).then((Response) => {
        console.log(Response.data);
        navigator('/student');
      }).catch(error=>{
        console.error(error);
      })
    }
}
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!firstName.trim()) {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    } else {
      errorsCopy.firstName = '';
    }

    if (!lastName.trim()) {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    } else {
      errorsCopy.lastName = '';
    }

    if (!mobile.trim()) {
      errorsCopy.mobile = 'Mobile is required';
      valid = false;
    } else {
      errorsCopy.mobile = '';
    }

    if (!email.trim()) {
      errorsCopy.email = 'Email is required';
      valid = false;
    } else {
      errorsCopy.email = '';
    }

    if (!qualification.trim()) {
      errorsCopy.qualification = 'Qualification is required';
      valid = false;
    } else {
      errorsCopy.qualification = '';
    }

    if (!branch.trim()) {
      errorsCopy.branch = 'Branch is required';
      valid = false;
    } else {
      errorsCopy.branch = '';
    }

    if (!yearOfPassed.trim()) {
      errorsCopy.yearOfPassed = 'Year of passing is required';
      valid = false;
    } else {
      errorsCopy.yearOfPassed = '';
    }

    if (!batchId.trim()) {
      errorsCopy.batchId = 'Batch ID is required';
      valid = false;
    } else {
      errorsCopy.batchId = '';
    }

    if (!status.trim()) {
      errorsCopy.status = 'Status is required';
      valid = false;
    } else {
      errorsCopy.status = '';
    }

    setErrors(errorsCopy);
    return valid;
  }
  function pageTitle(){
    if(id){
        return   <h2 className='text-center'>update Student</h2>
    }else{
        return   <h2 className='text-center'>Add Student</h2>
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='card'>
          {pageTitle()}
          <div className='card-body'>
            <form onSubmit={saveOrupdateStudent}>
              {/* First Name */}
              <div className='form-group mb-2'>
                <label className='form-label'>First Name:</label>
                <input
                  type='text'
                  placeholder='Enter the first name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>

              {/* Last Name */}
              <div className='form-group mb-2'>
                <label className='form-label'>Last Name:</label>
                <input
                  type='text'
                  placeholder='Enter the last name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>

              {/* Mobile */}
              <div className='form-group mb-2'>
                <label className='form-label'>Mobile:</label>
                <input
                  type='text'
                  placeholder='Enter the mobile'
                  name='mobile'
                  value={mobile}
                  className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                  onChange={(e) => setMobile(e.target.value)}
                />
                {errors.mobile && <div className='invalid-feedback'>{errors.mobile}</div>}
              </div>

              {/* Email */}
              <div className='form-group mb-2'>
                <label className='form-label'>Email:</label>
                <input
                  type='text'
                  placeholder='Enter the email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              {/* Qualification */}
              <div className='form-group mb-2'>
                <label className='form-label'>Qualification:</label>
                <input
                  type='text'
                  placeholder='Enter the qualification'
                  name='qualification'
                  value={qualification}
                  className={`form-control ${errors.qualification ? 'is-invalid' : ''}`}
                  onChange={(e) => setQualification(e.target.value)}
                />
                {errors.qualification && <div className='invalid-feedback'>{errors.qualification}</div>}
              </div>

              {/* Branch */}
              <div className='form-group mb-2'>
                <label className='form-label'>Branch:</label>
                <input
                  type='text'
                  placeholder='Enter the branch'
                  name='branch'
                  value={branch}
                  className={`form-control ${errors.branch ? 'is-invalid' : ''}`}
                  onChange={(e) => setBranch(e.target.value)}
                />
                {errors.branch && <div className='invalid-feedback'>{errors.branch}</div>}
              </div>

              {/* Year of Passed */}
              <div className='form-group mb-2'>
                <label className='form-label'>Year of Passing:</label>
                <input
                  type='text'
                  placeholder='Enter the year of passing'
                  name='yearOfPassed'
                  value={yearOfPassed}
                  className={`form-control ${errors.yearOfPassed ? 'is-invalid' : ''}`}
                  onChange={(e) => setYearOfPassed(e.target.value)}
                />
                {errors.yearOfPassed && <div className='invalid-feedback'>{errors.yearOfPassed}</div>}
              </div>

              {/* Batch ID */}
              <div className='form-group mb-2'>
                <label className='form-label'>Batch ID:</label>
                <input
                  type='text'
                  placeholder='Enter the batch ID'
                  name='batchId'
                  value={batchId}
                  className={`form-control ${errors.batchId ? 'is-invalid' : ''}`}
                  onChange={(e) => setBatchId(e.target.value)}
                />
                {errors.batchId && <div className='invalid-feedback'>{errors.batchId}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Status:</label>
                <select
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                >
                   <option value="">-- Select Status --</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.status && <div className="invalid-feedback">{errors.status}</div>}
              </div>
              <button className='btn btn-primary'  onSubmit={saveOrupdateStudent}>
                Submit
              </button>
            </form>
            <a href="/student" className="btn btn-dark mt-2"><button className='btn btn-info'>
                 Back to student List
                </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentComponent;
