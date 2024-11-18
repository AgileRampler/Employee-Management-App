import React, { useEffect, useState } from 'react';
import { deleteEmpDetailsAPI, editEmpDetailsAPI, getEmpDetailsAPI, saveEmpDetailsAPI } from '../services/allAPI';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import './home.css';

const Home = () => {
  const [empDetails, setEmpDetails] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('active');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);

  useEffect(() => {
    getEmployee();
  }, []);

  // Add employee
  const addEmployee = async (e) => {
    e.preventDefault();
    const employeeDetails = { name, email, status };
    if (name && email && status) {
      try {
        await saveEmpDetailsAPI(employeeDetails);
        getEmployee();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Please enter all details');
    }
  };

  // Get employees
  const getEmployee = async () => {
    try {
      const result = await getEmpDetailsAPI();
      setEmpDetails(result.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      await deleteEmpDetailsAPI(id);
      getEmployee();
    } catch (err) {
      console.log(err);
    }
  };

  // Edit employee modal
  const editEmployee = (employee) => {
    handleShow();
    setCurrentEmployeeId(employee.id);
    setName(employee.name);
    setEmail(employee.email);
    setStatus(employee.status);
  };

  // Save edited employee details
  const saveEditedEmployee = async () => {
    const updatedEmployeeDetails = { name, email, status };
    try {
      await editEmpDetailsAPI(updatedEmployeeDetails, currentEmployeeId);
      getEmployee();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="text-center m-5">Employee Management App</h1>

      {/* Employee Cards */}
      <div className="employee-container">
        {empDetails.length > 0 ? (
          empDetails.map((employee, index) => (
            <div className="employee-card" key={index}>
              <h3>{employee.name}</h3>
              <p>Email: {employee.email}</p>
              <p>Status: <strong>{employee.status}</strong></p>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => editEmployee(employee)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No employees found</p>
        )}
      </div>

      {/* Add Employee Form */}
      <form className="add-employee-form" onSubmit={addEmployee}>
        <h2>Add Employee</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit">Add Employee</button>
      </form>

      {/* Edit Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingStatus" label="Status">
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={saveEditedEmployee}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
