import React from 'react';
import { useNavigate } from 'react-router-dom';


function Sidenav() {
  const navigate = useNavigate();

  return (
    <div className="sidenav">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <button onClick={() => navigate('/admins')} className="sidenav-button">
          List Admins
        </button>
      </div>
      <div>
        <button onClick={() => navigate('/add')} className="sidenav-button">
          Add New Admin
        </button>
      </div>
      <div>
        <button onClick={() => navigate('/listOfCourse')} className="sidenav-button">
          List of Courses
        </button>
      </div>
      <div>
        <button onClick={() => navigate('/listofbatches')} className="sidenav-button">
          Batch List
        </button>
      </div>
      <div>
        <button onClick={() => navigate('/addCourse')} className="sidenav-button">
          Add Course
        </button>
      </div>
      <div>
        <button onClick={() => navigate('/AddBatch')} className="sidenav-button">
          Add Batch
        </button>
      </div>

      <div>
        <button onClick={() => navigate('/student')} className="sidenav-button">
           List Of Students
        </button>
      </div>

      <div>
        <button onClick={() => navigate('/addStudent')} className="sidenav-button">
          Add New Student
        </button>
      </div>

    </div>
  );
}

export default Sidenav;
