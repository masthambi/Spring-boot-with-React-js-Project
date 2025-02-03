import React, { useEffect, useState } from 'react';
import { createBatch,UpdateBatch, getBatch } from '../Service.jsx/BatchService';
import { useNavigate,useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BatchComponent = () => {
    const [batchName, setBatchName] = useState('');
    const [batchStartDate, setBatchStartDate] = useState(null); 
    const [batchStatus, setBatchStatus] = useState(''); 
    const [courseId, setCourseId] = useState(''); 
   
    const navigate = useNavigate();

    const {batchId}=useParams();

   

    const [errors,setErrors]=useState({
        batchName:'',
        batchStartDate:'',
        batchStatus:'',
        courseId:''
    })
  
    useEffect(() => {
        if (batchId) {
            getBatch(batchId).then((response) => {
                setBatchName(response.data.batchName);
                setBatchStartDate(new Date(response.data.batchStartDate)); // Convert string to Date object
                setBatchStatus(response.data.batchStatus);
                setCourseId(response.data.courseId);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [batchId]);
    


     
    
    function saveorUpdateBatch(e) {
        e.preventDefault();
        if(validateForm()){
        const batch = { batchName, batchStartDate, batchStatus, courseId };
        console.log(batch);
        if(batchId){
            UpdateBatch(batchId,batch).then((response)=>{
                console.log(response.data);
                navigate('/listofbatches')
            }).catch(error=>{
                console.error(error);
            })
        }
        else{
            createBatch(batch).then((response) => {
                console.log(response.data);
                navigate('/listofbatches');
            }).catch(error=>{
                console.error(error);
            })
        }    
    }
}
function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (batchName.trim()) {
        errorsCopy.batchName = '';
    } else {
        errorsCopy.batchName = 'Batch name is required';
        valid = false;
    }

    if (batchStartDate) {
        errorsCopy.batchStartDate = '';
    } else {
        errorsCopy.batchStartDate = 'Batch start date is required';
        valid = false;
    }

    if (batchStatus.trim()) {
        errorsCopy.batchStatus = '';
    } else {
        errorsCopy.batchStatus = 'Batch status is required';
        valid = false;
    }

    if (typeof courseId === 'string' && courseId.trim()) {
        errorsCopy.courseId = '';
    } else {
        errorsCopy.courseId = 'Course ID is required';
        valid = false;
    }

    setErrors(errorsCopy);
    return valid;
}

    function pageTitle(){
        if(batchId){
            return <h2 className='text-center'>update Batch</h2>
        }
        else{
             return <h2 className='text-center'>Add Batch</h2>   
        }
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='card'>
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>BatchName</label>
                                <input
                                    type='text'
                                    placeholder='Enter batch name'
                                    name='batchName'
                                    value={batchName}
                                    className={`form-control ${errors.batchName ? 'is-invalid':''}`}
                                    onChange={(e) => setBatchName(e.target.value)}
                                />
                                {errors.batchName && <div className='invalid-feedback'></div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>BatchStartDate</label>
                                <DatePicker
                                    selected={batchStartDate}
                                    onChange={(date) => setBatchStartDate(date)}
                                    className={`form-control ${errors.batchStartDate ? 'is-invalid':''}`}
                                    dateFormat="yyyy/MM/dd"
                                    placeholderText="Click to select a date"
                                />
                                 {errors.batchStartDate && <div className='invalid-feedback'></div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Batch Status</label>
                                <select
                                    className={`form-control ${errors.batchStatus ? 'is-invalid':''}`}
                                    name='batchStatus'
                                    value={batchStatus}
                                    onChange={(e) => setBatchStatus(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                {errors.batchStatus && <div className='invalid-feedback'></div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Course ID</label>
                                <input
                                    type='text'
                                    placeholder='Enter course ID'
                                    name='courseId'
                                    value={courseId}
                                    className={`form-control ${errors.courseId ? 'is-invalid':''}`}
                                    onChange={(e) => setCourseId(e.target.value)} 
                                />
                                  {errors.courseId && <div className='invalid-feedback'></div>}
                            </div>
                            <button className='btn btn-success' onClick={saveorUpdateBatch}>Submit</button>
                        </form>
                            <a href="/listofbatches" className="btn btn-dark mt-2"><button className='bnt btn-info'>
                                Back to Batch List
                                </button>
                            </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BatchComponent;
