import commonAPI from "./commonAPI";
import serverURL from "./serverURL";


export const saveEmpDetailsAPI = async (employeeDetails)=>{
    return await commonAPI("POST",`${serverURL}/employeeData`,employeeDetails)
}

export const getEmpDetailsAPI = async ()=>{
    return await commonAPI("GET",`${serverURL}/employeeData`,{})
}

export const deleteEmpDetailsAPI = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/employeeData/${id}`,{})
}

export const editEmpDetailsAPI = async (employeeDetails,id)=>{
    return await commonAPI("PUT",`${serverURL}/employeeData/${id}`,employeeDetails)
}