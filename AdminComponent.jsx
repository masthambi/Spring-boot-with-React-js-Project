import React, { useState, useEffect } from 'react';
import { createAdmin, getAdmins, updateAdmin } from '../Service.jsx/AdminService';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfJoin, setDateOfJoin] = useState('');
    const [status, setStatus] = useState('');
     
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setError] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        dateOfJoin: '',
        status: '',
    });

    useEffect(() => {
        if (id) {
            getAdmins(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setMobile(response.data.mobile);
                    setEmail(response.data.email);
                    setDateOfJoin(response.data.dateOfJoin);
                    setStatus(response.data.status);
                })
                .catch((error) => {
                    console.error("Error fetching admin data:", error);
                });
        }
    }, [id]);

    function saveorupdateAdmin(e) {
        e.preventDefault();

        if (validateForm()) {
            const Admin = { firstName, lastName, mobile, email, dateOfJoin, status };
            console.log(Admin);
            if (id) {
                updateAdmin(id, Admin)
                    .then((response) => {
                        console.log(response.data);
                        navigate('/admins');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                createAdmin(Admin)
                    .then((response) => {
                        console.log(response.data);
                        navigate('/admins');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors }

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'first name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'last Name is required';
            valid = false;
        }

        if (mobile.trim()) {
            errorsCopy.mobile = '';
        } else {
            errorsCopy.mobile = 'mobile is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'email is required';
            valid = false;
        }

        if (dateOfJoin.trim()) {
            errorsCopy.dateOfJoin = '';
        } else {
            errorsCopy.dateOfJoin = 'dateOfJoin is required';
            valid = false;
        }

        if (status.trim()) {
            errorsCopy.status = '';
        } else {
            errorsCopy.status = 'status is required';
            valid = false;
        }
        setError(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update Admin</h2>
        } else {
            return <h2 className="text-center">Add Admin</h2>
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="card">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter the first name"
                                    name="firstName"
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter the last name"
                                    name="lastName"
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Mobile</label>
                                <input
                                    type="text"
                                    placeholder="Enter the mobile"
                                    name="mobile"
                                    value={mobile}
                                    className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                                {errors.mobile && <div className='invalid-feedback'>{errors.mobile}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter the email"
                                    name="email"
                                    value={email}
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Date of Join</label>
                                <DatePicker
                                    selected={dateOfJoin ? new Date(dateOfJoin) : null}
                                    onChange={(date) => setDateOfJoin(date.toISOString().split("T")[0])}
                                    dateFormat="yyyy-MM-dd"
                                    className={`form-control ${errors.dateOfJoin ? "is-invalid" : ""}`}
                                />
                                {errors.dateOfJoin && <div className="invalid-feedback">{errors.dateOfJoin}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Status</label>
                                <select
                                    name="status"
                                    value={status}
                                    className={`form-control ${errors.status ? "is-invalid" : ""}`}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">-- Select Status --</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                            </div>

                            <button className="btn btn-success" onClick={saveorupdateAdmin}>
                                Submit
                            </button>
                            
                            
                        </form>
                           
                        <a href="/admins" className="btn btn-dark mt-2"><button className='bnt btn-info'>
                            Back to Admin List
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminComponent;
