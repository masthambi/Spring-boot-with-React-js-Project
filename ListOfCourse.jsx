import React, { useEffect, useState } from 'react';
import { deletecourse, getCourse, listCourse } from '../Service.jsx/CourseService';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
 
import 'bootstrap/dist/css/bootstrap.min.css';


const ListOfCourse = () => {
  const [course, setCourse] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [courseToDelete, setCourseToDelete] = useState(null); 
  const navigator = useNavigate();

  useEffect(() => {
    getAllCourses();
  }, []);

  function addCourse() {
    navigator('/addCourse');
  }

  function updateCourse(courseId) {
    console.log('Navigating to update course with ID:', courseId);
    navigator(`/updateCourse/${courseId}`);
  }

  function getAllCourses() {
    listCourse()
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeCourse(courseId) {
    
    deletecourse(courseId)
      .then((response) => {
        getAllCourses(); 
        setShowModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteClick(courseId) {
 
    setCourseToDelete(courseId);
    setShowModal(true);
  }

  function handleCloseModal() {
   
    setShowModal(false);
  }

  return (
    <div className="container">
      <h2>List of Courses</h2>
      <button className="btn btn-success md-2" onClick={addCourse}>
        ADD COURSE
      </button>
      <br />
      <br />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Course Duration</th>
            <th>Course Fee</th>
            <th>Course Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {course.map((course) => (
            <tr key={course.courseId}>
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>{course.courseDuration}</td>
              <td>{course.courseFee}</td>
              <td>{course.courseStatus}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => updateCourse(course.courseId)}
                >
                  Update
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(course.courseId)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this course?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => removeCourse(courseToDelete)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListOfCourse;
