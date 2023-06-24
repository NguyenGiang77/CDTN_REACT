import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor: [],
    allDoctor: [],
    allScheduleDate: [],
    allData: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.genders = [];
            
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAIL:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.dataDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.topDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.dataAllDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.allDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_DATE_SUCCESS:
            state.allScheduleDate = action.dataDate;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_DATE_FAIL:
            state.allScheduleDate = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_INFOR_DOCTOR_SUCCESS:
            state.allData = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_INFOR_DOCTOR_PRICE_FAIL:
            state.allData = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;