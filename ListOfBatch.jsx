import React, { useEffect, useState } from 'react';
import { deleteBatch, listOfBatchs } from '../Service.jsx/BatchService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const ListOfBatch = () => {
  const [batches, setBatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState(null);
  
  
  const navigator = useNavigate();

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await listOfBatchs(); // Assuming this function fetches batch data
      setBatches(response.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };
  

  

  
  const handleDelete = async () => {
    if (batchToDelete !== null) {
      try {
        await deleteBatch(batchToDelete);
        setShowModal(false);
    
      } catch (error) {
        console.error("Error deleting batch:", error);
      }
    }
  };

  return (
    <div>
      <h2>List of Batches</h2>
      <button className="btn btn-info mb-2" onClick={() => navigator('/AddBatch')}>
        Add Batch
      </button>
      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th onClick={() => handleSortChange("BatchId")}>Batch ID</th>
            <th onClick={() => handleSortChange("BatchName")}>Batch Name</th>
            <th onClick={() => handleSortChange("BatchStartDate")}>Batch Start Date</th>
            <th onClick={() => handleSortChange("BatchStatus")}>Batch Status</th>
            <th onClick={() => handleSortChange("CourseID")}>Course ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {batches.length > 0 ? (
            batches.map((batch) => (
              <tr key={batch.batchId}>
                <td>{batch.batchId}</td>
                <td>{batch.batchName}</td>
                <td>{batch.batchStartDate}</td>
                <td>{batch.batchStatus}</td>
                <td>{batch.courseId}</td>
                <td>
                  <button className="btn btn-info" onClick={() => navigator(`/editBatch/${batch.batchId}`)}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setBatchToDelete(batch.batchId)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No batches available</td>
            </tr>
          )}
        </tbody>
      </table>

      
          

      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this batch?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListOfBatch;
