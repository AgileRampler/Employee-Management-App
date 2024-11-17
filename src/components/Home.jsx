import React, { useEffect, useState } from 'react'
import { deleteEmpDetailsAPI, editEmpDetailsAPI, getEmpDetailsAPI, saveEmpDetailsAPI } from '../services/allAPI'
import { Modal,Button,Form,FloatingLabel } from 'react-bootstrap'
import './home.css'


const Home = () => {
  const [empDetails,setEmpDetails] = useState('')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('active');gi
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentEmployeeId,setCurrentEmployeeId] = useState(null)
  

  useEffect(()=>{
    getEmployee()
  },[empDetails])

  // add employee
  const addEmployee = async () => {
    const employeeDetails= {"name":name,"email":email,"status":status};
    if(name && email && status) {
      try {
        await saveEmpDetailsAPI(employeeDetails)  
      } 
      catch (err) {
        console.log(err);
      }
    }
    else {
      alert("Please enter details")
    }
    }
    

  // get employee
  const getEmployee = async () =>{
    const result = await getEmpDetailsAPI()
    setEmpDetails(result.data)
  }
  
  // delete employee
  const deleteEmployee = async (id) =>{
    try {
      await deleteEmpDetailsAPI(id)
    } 
    catch (err) {
      console.log(err);
      
    }
  }


  // edit employee modal
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
      <h1 className='text-center m-5 p-5'>Employee Management App</h1>
      <div className='d-flex justify-content-center'>
        <table>
            <thead>
                <tr className='fs-3'>
                    <th className='px-4'>ID</th>
                    <th className='px-5'>Username</th>
                    <th className='px-5'>Email</th>
                    <th className='px-4'>Status</th>
                    <th className='px-3'>..</th>
                    <th className='px-3'>..</th>
                </tr>
            </thead>
            <tbody>
              {
                empDetails?.length>0? 
                empDetails.map((data,index)=>(
                  <tr key={index}>
                    <td className='px-4 text-center'>{index+1}</td>
                    <td className='px-4 text-center'>{data.name}</td>
                    <td className='px-4 text-center'>{data.email}</td>
                    <td className='px-4 text-center'>{data.status}</td>
                    <td><button onClick={()=> deleteEmployee(data.id)}><i className='fa-solid fa-trash'></i></button></td>
                    <td><button onClick={()=> editEmployee(data)}><i className='fa-solid fa-edit'></i></button></td>
                  </tr>

                )) :
                <div className="fw-bolder text-danger text-center">No data</div>
              }
            </tbody>
        </table>
      </div>
      <>
        <form className='text-center mt-5'>
          <h2 className='mb-3'>Add Employee</h2>
          <div className='d-flex justify-content-center gap-3'>
              <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
              <select onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button onClick={addEmployee} type="submit">Add Employee</button>
          </div>
        </form>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-3">
          <FloatingLabel controlId="floatingPassword" label="Username">
           <Form.Control onChange={(e) => setName(e.target.value)} className='mt-2' type="text" placeholder="Username" />
          </FloatingLabel>   
          <FloatingLabel controlId="floatingPassword" label="Email">
           <Form.Control onChange={(e) => setEmail(e.target.value)} className='mt-2' type="text" placeholder="Email" />
          </FloatingLabel> 
          <FloatingLabel controlId="floatingPassword" label="">
             <select className='ms-1 mt-3' onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
          </FloatingLabel>    
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={saveEditedEmployee} className='btn btn-success'>Submit</Button>
        </Modal.Footer>
        </Modal>
      </>
      
    </>
  )
}

export default Home

                
