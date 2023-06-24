import actionTypes from './actionTypes';
import { FormattedMessage } from 'react-intl';
import {
    getAllCodeService, createrNewUserFromReact,
    getAllUsers, deleteUserService, editUserService, getTopDoctorService,
    getAllDoctorService, postInfoDoctors, getAllSpecialty

} from '../../services/userService';
import {toast} from 'react-toastify'
// export const  fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })
//LẤY BIẾN GENDER TỪ BE
export const fetchGenderStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            dispatch({
                type :actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
        }
    }
}
export const  fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})
export const  fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL,
})

// LẤY BIẾN ROLE TỪ BE
export const fetchRoleStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFail());
            }
        } catch (e) {
            dispatch(fetchRoleFail());
        }
    }
}

export const  fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})
export const  fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
})

// LẤY BIẾN POSITION TỪ BE
export const fetchPositionStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFail());
            }
        } catch (e) {
            dispatch(fetchPositionFail());
        }
    }
}
export const  fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL,
}) 

// TẠO USER CỦA TAB CRUB REDUX
export const createUser = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await createrNewUserFromReact(data);
            if (res && res.errCode === 0) {
            //                 ,
            // 
            // admin-action.
            // admin-action.error-delete-user
            // admin-action.
            // admin-action.
            // admin-action.
            // admin-action.error-post-doctor
                toast.success(<FormattedMessage id="toast.admin-action.success-create-user" />)
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-create-user" />)
                dispatch(createUserFail());
            }
        } catch (e) {
            dispatch(createUserFail());
            console.log(e);
        }
    }
}

export const createUserSuccess = () => ({ 
    type: actionTypes.CREATE_USER_SUCCESS

})
export const createUserFail = () => ({ 
    type: actionTypes.CREATE_USER_FAIL
})

// HIỂN KHI TẤT CẢ USER CỦA TAB CRUB REDUX
export const fetchAllUserStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            }
            else {
                dispatch(fetchAllUserFail());
            }
        } catch (e) {
            dispatch(fetchAllUserFail());
            console.log(e);
        }
    }
}
export const  fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data,
})
export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL,
})
// XÓA USER CỦA TAB CRUB REDUX
export const deleteUserStart = (userId) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-delete-user" />)
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-delete-user" />)
                dispatch(deleteUserFail());
            }
        } catch (e) {
            toast.error(<FormattedMessage id="toast.admin-action.error-delete-user" />)
            dispatch(deleteUserFail());
            console.log(e);
        }
    }
}

export const deleteUserSuccess = () => ({ 
    type: actionTypes.DELETE_USER_SUCCESS

})
export const deleteUserFail = () => ({ 
    type: actionTypes.DELETE_USER_FAIL
})

export const editUserStart = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-update-user" />)
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-user" />)
                dispatch(editUserFail());
            }
        } catch (e) {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-user" />)
            dispatch(editUserFail());
            console.log(e);
        }
    }
}

export const editUserSuccess = () => ({ 
    type: actionTypes.EDIT_USER_SUCCESS

})
export const editUserFail = () => ({ 
    type: actionTypes.EDIT_USER_FAIL
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getTopDoctorService('10');
            if (res && res.errCode === 0) {
                dispatch ({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,

                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
            })
        }
    }    
}

export const fetchAllDoctor = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataAllDoctor: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAIL,

                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
            })
        }
    }
}
export const fetchPostDoctor = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await postInfoDoctors(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-post-doctor" />)
                dispatch({
                    
                    type: actionTypes.FETCH_POST_DOCTOR_SUCCESS,
                    // dataAllDoctor: res.data,
                })
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-post-doctor" />)
                dispatch({
                    type: actionTypes.FETCH_POST_DOCTOR_FAIL,

                })
            }
        } catch (e) {
                toast.error(<FormattedMessage id="toast.admin-action.error-post-doctor" />)
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_POST_DOCTOR_FAIL,
            })
        }
    } 
}

export const fetchAllcodeScheduleDate= () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_DATE_SUCCESS,
                    dataDate: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_DATE_FAIL,

                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_DATE_FAIL,
            })
        }
    } 
}

// thông tin chi tiết bác sĩ
export const getInforDoctor = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            dispatch({
                type :actionTypes.FETCH_INFOR_DOCTOR_START
            })
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty();
            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0
            ) 
            {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data
                }
                dispatch(getInforDoctorSuccess(data));
            }
            else {
                dispatch(getInforDoctorFail());
            }
        } catch (e) {
            dispatch(getInforDoctorFail());
        }
    }
}
export const  getInforDoctorSuccess = (allData) => ({
    type: actionTypes.FETCH_INFOR_DOCTOR_SUCCESS,
    data: allData,
})
export const  getInforDoctorFail = () => ({
    type: actionTypes.FETCH_INFOR_DOCTOR_PRICE_FAIL,
})

