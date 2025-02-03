import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidenav from './components/Sidenav'; // Importing Sidenav
import AdminComponent from './components/AdminComponent';
import ListAdminComponent from './components/ListAdminComponent';
import ListOfCourse from './components/ListOfCourse';
import CourseComponent from './components/CourseComponent';
import ListOfBatch from './components/ListOfBatch';
import BatchComponent from './components/BatchComponent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import ListOfStudent from './components/ListOfStudent';
import StudentComponent from './components/StudentComponent';
import Home from './components/Home';



function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Sidebar navigation */}
        <Sidenav />
        
        {/* Main Content */}
        <div className="main-content-container">
          {/* Navbar */}
          <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />  
        {/* <Route path="/about" element={<About />} />  
        <Route path="/services" element={<Services />} />  
        <Route path="/contact" element={<Contact />} />   */}
      </Routes>
          
          {/* Main content section */}
          <div className="content-wrapper">
            <Routes>
              {/* Admin Routes */}
              <Route path="/admins" element={<ListAdminComponent />} />
              <Route path="/add" element={<AdminComponent />} />
              <Route path="/admin/:id" element={<AdminComponent />} />
              
              {/* Course Routes */}
              <Route path="/listOfCourse" element={<ListOfCourse />} />
              <Route path="/addCourse" element={<CourseComponent />} />
              <Route path="/updateCourse/:courseId" element={<CourseComponent />} />
              
              {/* Batch Routes */}
              <Route path="/listofbatches" element={<ListOfBatch />} />
              <Route path="/AddBatch" element={<BatchComponent />} />
              <Route path="/editBatch/:batchId" element={<BatchComponent />} />

              {/* student*/}
              <Route path="/student" element={<ListOfStudent />} />
              <Route path="/addStudent" element={<StudentComponent />} />
              <Route path='updateStudent/:id' element={<StudentComponent/>}></Route>
            </Routes>
          </div>
        </div>
       
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}


export default App;
