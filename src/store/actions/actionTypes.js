const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',


    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //ADMIN
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL: 'FETCH_GENDER_FAIL',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIL: 'FETCH_ROLE_FAIL',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL: 'CREATE_USER_FAIL',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAIL: 'EDIT_USER_FAIL',
    
    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAIL: 'FETCH_ALL_USER_FAIL',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIL: 'DELETE_USER_FAIL',
   //lấy ra top bác sĩ nổi bật
    FETCH_TOP_DOCTOR_SUCCESS: 'FETCH_TOP_DOCTOR_SUCCESS',
    FETCH_TOP_DOCTOR_FAIL: 'FETCH_TOP_DOCTOR_FAIL',
 // lấy ra dữ liệu tất cả các bác sĩ
    FETCH_ALL_DOCTOR_SUCCESS: 'FETCH_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAIL: 'FETCH_ALL_DOCTOR_FAIL',
    // post thông tin chi tiết bác si
    FETCH_POST_DOCTOR_SUCCESS: 'FETCH_POST_DOCTOR_SUCCESS',
    FETCH_POST_DOCTOR_FAIL: 'FETCH_POST_DOCTOR_FAIL',

    FETCH_ALLCODE_SCHEDULE_DATE_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_DATE_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_DATE_FAIL: 'FETCH_ALLCODE_SCHEDULE_DATE_FAIL',

    // khai báo thông tin chi tiết bác sĩ
    FETCH_INFOR_DOCTOR_START: 'FETCH_INFOR_DOCTOR_START',
    FETCH_INFOR_DOCTOR_SUCCESS: 'FETCH_INFOR_DOCTOR_SUCCESS',
    FETCH_INFOR_DOCTOR_PRICE_FAIL: 'FETCH_INFOR_DOCTOR_PRICE_FAIL'
})

export default actionTypes;