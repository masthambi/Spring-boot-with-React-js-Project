import React, { useState, useEffect } from 'react';
import { deleteStudents, listOfStudents } from '../Service.jsx/StudentServices';
import { useNavigate } from 'react-router-dom';

const ListOfStudent = () => {
   const [students, setStudents] = useState([]);
   const [showModal, setShowModal] = useState(false); // State for modal visibility
   const [studentToDelete, setStudentToDelete] = useState(null); // Store the student id to be deleted
   
   const navigator = useNavigate();

   const refreshStudents = () => {
      listOfStudents()
         .then(response => {
            console.log("API Response:", response.data);
            setStudents(response.data);
         })
         .catch(error => {
            console.error("Error fetching students:", error);
         });
   };

   useEffect(() => {
      refreshStudents();
   }, []);

   function addNewStudent() {
      navigator('/addStudent');
   }

   function updateStudent(id) {
      navigator(`/updateStudent/${id}`);
   }

   function deleteStudent(id) {
      // Show the modal and set the student id to be deleted
      setStudentToDelete(id);
      setShowModal(true);
   }

   function handleDeleteConfirm() {
      if (studentToDelete) {
         deleteStudents(studentToDelete).then((response) => {
            refreshStudents(); // Refresh the student list
            setShowModal(false); // Close the modal
         }).catch((error) => {
            console.error(error);
         });
      }
   }

   function handleDeleteCancel() {
      setShowModal(false); // Close the modal without deleting
   }

   return (
      <div>
         <h2>List of Students</h2>
         <button className='btn btn-primary mb-2' onClick={addNewStudent}>Add Student</button>
         <table className='table table-striped table-bordered'>
            <thead>
               <tr>
                  <th>id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Qualification</th>
                  <th>Branch</th>
                  <th>Year of Passed</th>
                  <th>Batch ID</th>
                  <th>Status</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {students.map((student) => (
                  <tr key={student.id}>
                     <td>{student.id}</td>
                     <td>{student.firstName}</td>
                     <td>{student.lastName}</td>
                     <td>{student.mobile}</td>
                     <td>{student.email}</td>
                     <td>{student.qualification}</td>
                     <td>{student.branch}</td>
                     <td>{student.yearOfPassed}</td>
                     <td>{student.batchId}</td>
                     <td>{student.status}</td>
                     <td>
                        <button className='btn btn-info' onClick={() => updateStudent(student.id)}>Update</button>
                        <button className='btn btn-danger' onClick={() => deleteStudent(student.id)} style={{marginBottom:'10px'}}>Delete</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         {/* Modal */}
         {showModal && (
            <div className="modal show" style={{ display: 'block', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
               <div className="modal-dialog" style={{ marginTop: '100px' }}>
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title">Confirm Deletion</h5>
                        <button type="button" className="close" onClick={handleDeleteCancel}>
                           <span>&times;</span>
                        </button>
                     </div>
                     <div className="modal-body">
                        <p>Are you sure you want to delete this student?</p>
                     </div>
                     <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={handleDeleteCancel}>Cancel</button>
                        <button className="btn btn-danger" onClick={handleDeleteConfirm}>Delete</button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ListOfStudent;
