import React, { useEffect, useState } from 'react';
import { createCourse, getCourse, updateCourse, getCourses } from '../Service.jsx/CourseService'; 
import { useNavigate, useParams } from 'react-router-dom';

const CourseComponent = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseFee, setCourseFee] = useState(0);
  const [courseStatus, setCourseStatus] = useState('');
  const [existingCourses, setExistingCourses] = useState([]); 

  const { courseId } = useParams();
  const navigate = useNavigate();

  const [errors, setError] = useState({
    courseId: '',
    courseName: '',
    courseDuration: '',
    courseFee: '',
    courseStatus: '',
  });

  useEffect(() => {
    if (courseId) {
      getCourse(courseId)
        .then((response) => {
          setCourseName(response.data.courseName);
          setCourseDuration(response.data.courseDuration);
          setCourseFee(response.data.courseFee);
          setCourseStatus(response.data.courseStatus);
        })
        .catch((error) => {
          console.error('Error fetching course data:', error);
        });
    }
    getCourses()
      .then((response) => {
        setExistingCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, [courseId]);

  function saveOrUpdateCourse(e) {
    e.preventDefault();

    if (validateForm()) {
      const course = { courseName, courseDuration, courseFee, courseStatus };

      if (courseId) {
        updateCourse(courseId, course)
          .then(() => {
            navigate('/listOfCourse');
          })
          .catch((error) => console.error('Error updating course:', error));
      } else {
        createCourse(course)
          .then(() => {
            navigate('/listOfCourse');
          })
          .catch((error) => console.error('Error creating course:', error));
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (courseName.trim()) {
      errorsCopy.courseName = '';
    } else {
      errorsCopy.courseName = 'Course name is required';
      valid = false;
    }

    if (courseDuration.trim()) {
      errorsCopy.courseDuration = '';
    } else {
      errorsCopy.courseDuration = 'Course duration is required';
      valid = false;
    }

    if (courseFee.toString().trim()) {
      errorsCopy.courseFee = '';
    } else {
      errorsCopy.courseFee = 'Course fee is required';
      valid = false;
    }

    if (courseStatus.trim()) {
      errorsCopy.courseStatus = '';
    } else {
      errorsCopy.courseStatus = 'Course status is required';
      valid = false;
    }
    

    setError(errorsCopy);
    return valid;
  }

  function pageTitle() {
    return <h2 className="text-center">{courseId ? 'Update Course' : 'Add Course'}</h2>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="card">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={saveOrUpdateCourse}>
              <div className="form-group mb-2">
                <label className="form-label">Course Name</label>
                <select
                  name="courseName"
                  value={courseName}
                  className={`form-control ${errors.courseName ? 'is-invalid' : ''}`}
                  onChange={(e) => setCourseName(e.target.value)}
                >
                  <option value="">Select a course</option>
                  {existingCourses.map((course) => (
                    <option key={course.id} value={course.courseName}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
                {errors.courseName && <div className="invalid-feedback">{errors.courseName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Course Duration</label>
                <input
                  type="text"
                  placeholder="Enter course Duration"
                  name="courseDuration"
                  value={courseDuration}
                  className={`form-control ${errors.courseDuration ? 'is-invalid' : ''}`}
                  onChange={(e) => setCourseDuration(e.target.value)}
                />
                {errors.courseDuration && <div className="invalid-feedback">{errors.courseDuration}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Course Fee</label>
                <input
                  type="text"
                  placeholder="Enter course Fee"
                  name="courseFee"
                  value={courseFee}
                  className={`form-control ${errors.courseFee ? 'is-invalid' : ''}`}
                  onChange={(e) => setCourseFee(e.target.value)}
                />
                {errors.courseFee && <div className="invalid-feedback">{errors.courseFee}</div>}
              </div>

              <div className="form-group mb-2">
             <label className="form-label">Course Status</label>
              <select
                name="courseStatus"
                value={courseStatus}
                className={`form-control ${errors.courseStatus ? 'is-invalid' : ''}`}
                onChange={(e) => setCourseStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.courseStatus && <div className="invalid-feedback">{errors.courseStatus}</div>}
            </div>

              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </form>
            <a href="/listOfCourse" className="btn btn-dark mt-2"><button className='bnt btn-info'>
                 Back to Course List
                </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
