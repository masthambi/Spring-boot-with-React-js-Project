import React, { useState, useEffect } from 'react';
import { listAdmin, deleteAdmin, fetchAdminsWithSorting } from '../Service.jsx/AdminService';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListAdminComponent = () => {
  const [admin, setAdmin] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [adminToDelete, setAdminToDelete] = useState(null); 
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState("firstName");
  const [totalPages, setTotalPages] = useState(0);
  const navigator = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAdmin(currentPage, pageSize, sortField);
  }, [currentPage, pageSize, sortField]); // Refetch data when pagination or sorting changes

  const loadAdmin = async (offset, size, field) => {
    setLoading(true);
    try {
      const response = await fetchAdminsWithSorting(offset, size, field);
      setAdmin(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  function addNewAdmin() {
    navigator('/add');
  }

  function updateAdmin(id) {
    navigator(`/admin/${id}`);
  }

  function handleDeleteClick(id) {
    setAdminToDelete(id); 
    setShowModal(true); 
  }

  function removeAdmin() {
    if (adminToDelete !== null) {
      deleteAdmin(adminToDelete)
        .then(() => {
          loadAdmin(currentPage, pageSize, sortField); // Re-fetch after delete
          setShowModal(false); 
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1); // Increment page
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1); // Decrement page
    }
  };

  const handleSortChange = (field) => {
    setSortField(field); 
    setCurrentPage(0); // Reset to first page when sorting changes
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="container-fluid">
      <h2>List of Admins</h2>
      <button className="btn btn-primary mb-2" onClick={addNewAdmin}>
        Add Admin
      </button>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th onClick={() => handleSortChange("id")}>Admin ID</th>
            <th onClick={() => handleSortChange("firstName")}>First Name</th>
            <th onClick={() => handleSortChange("lastName")}>Last Name</th>
            <th onClick={() => handleSortChange("mobile")}>Mobile</th>
            <th onClick={() => handleSortChange("email")}>Email</th>
            <th onClick={() => handleSortChange("dateOfJion")}>Date of Join</th>
            <th onClick={() => handleSortChange("status")}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admin.length === 0 ? (
            <tr>
              <td colSpan="8">No admins found for this page.</td>
            </tr>
          ) : (
            admin.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.firstName}</td>
                <td>{admin.lastName}</td>
                <td>{admin.mobile}</td>
                <td>{admin.email}</td>
                <td>{admin.dateOfJoin}</td>
                <td>{admin.status}</td>
                <td>
                  <button className="btn btn-info" onClick={() => updateAdmin(admin.id)}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(admin.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div>
        <button onClick={() => handlePageChange("prev")} disabled={currentPage === 0} className="btn btn-success">
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages - 1}
          className="btn btn-success"
        >
          Next
        </button>
      </div>

      <div>
        <label>
          Page Size:
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this admin?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={removeAdmin}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListAdminComponent;
