import axios from '../axios';
const handleLoginApi = (UserEmail,UserPassword) => { 
    return axios.post('/api/login', {email: UserEmail, password: UserPassword} );
}
const getAllUsers = (inputId) =>
{
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`);
}
const createrNewUserFromReact = (data) =>
{
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        }
    });

}

const editUserService = (inputdata) => { 
    return axios.put('/api/edit-user', inputdata);
}
const getAllCodeService = (inputtype) => { 
    return axios.get(`/api/allcode?type=${inputtype}`)
}

const getTopDoctorService = (limit) => { 
    return axios.get(`/api/top-doctor?limit=${limit}`) 
}

const getAllDoctorService = () => { 
    return axios.get(`/api/all-doctor`) 
}

const postInfoDoctors = (data) => {
    return axios.post(`/api/save-infor-doctor`, data)  
}
const getInforDoctor = (inputId) => { 
    return axios.get(`/api/get-doctor-by-id?id=${inputId}`) 

}
const saveBulkScheduleDoctor = (data) => { 
    return axios.post(`/api/bulk-create-schedule`, data) 

}
const getSchDoctorByDate = (doctorId, date) => { 
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`) 
}
const getExtraInforDoctorById = (doctorId) => { 
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`) 
}
const getProfileDoctorById = (doctorId) => { 
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`) 
}
const postBookingAppointment = (data) => { 
    return axios.post(`/api/patient-book-appointment`, data) 
}
const postVerifyBook = (data) => { 
    return axios.post(`/api/verify-book-appointment`, data) 
}
const createSpecialty = (data) => { 
    return axios.post(`/api/create-new-specialty`, data) 
}
const getAllSpecialty = () => { 
    return axios.get(`/api/get-specialty`) 
}
const getDetailSpecialtyById = (data) => { 
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`) 
}
const getAllClinicService = (inputId) =>
{
    //template string
    return axios.get(`/api/get-all-clinic?id=${inputId}`);
}
const createClinic = (data) => { 
    return axios.post(`/api/create-new-clinic`, data) 
}
const deleteClinicService = (ClinicId) => {
    return axios.delete('/api/delete-clinic', {
        data: {
            id: ClinicId,
        }
    });
}


const editClinicService = (inputdata) => { 
    return axios.put('/api/edit-clinic', inputdata);
}
const getAllClinic = () => { 
    return axios.get(`/api/get-clinic`) 
}
const getDetailClinicById = (data) => { 
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`) 
}
export {
    handleLoginApi, getAllUsers,
    createrNewUserFromReact, deleteUserService,
    editUserService, getAllCodeService,
    getTopDoctorService, getAllDoctorService,
    postInfoDoctors, getInforDoctor, saveBulkScheduleDoctor,
    getSchDoctorByDate, getExtraInforDoctorById,
    getProfileDoctorById, postBookingAppointment, postVerifyBook,
    createSpecialty,getAllSpecialty, getDetailSpecialtyById,
    createClinic,getAllClinic,getDetailClinicById,
    deleteClinicService, editClinicService,getAllClinicService
}