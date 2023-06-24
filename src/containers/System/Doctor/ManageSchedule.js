import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from 'react-select';
import { LANGUAGES, CRUB_ACTIONS, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify'
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';
import moment from 'moment';
class ManageSchedule extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            lisDoctor: [],
            selectedDoctor: {},
            date: '',
            rangTime: [],
            

        }

    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllcodeScheduleDate();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataCombobox(this.props.allDoctor)
            this.setState({
                lisDoctor: dataSelect
            })
        }
        if (prevProps.allScheduleDate !== this.props.allScheduleDate) {
            let data = this.props.allScheduleDate;
            if (data && data.length > 0) { 
                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item =>({ ...item,isSelected:false}))

            }
            this.setState({
                rangTime: data
            })
        }


    } 
    buildDataCombobox = (inputdata) => { 
        let result = [];
        let {language} = this.props;
        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let object = {};
                let labelVn = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVn : labelEn;
                object.value = item.id;
                result.push(object);

            })
           
        }
        return result;
    }
    handleChange = async  selectedOption => {
        this.setState({ selectedDoctor: selectedOption });

    }
    handleChangeDate = (date) => { 
        this.setState({
            date: date[0]
        });
    }
    handleClickDate = (time) => { 
        let { rangTime } = this.state;
        if (rangTime && rangTime.length > 0)
        {
            rangTime = rangTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({rangTime: rangTime});
            }

    }
    handleSaveSchedule = async() =>{
        let { rangTime, selectedDoctor, date } = this.state;
        let result = [];
        if (!date) {
            toast.error("Invalid date!")
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) { 
            toast.error("Invalid selected doctor!")
            return
        }
        let formatedDate = new Date(date).getTime();
        // let formatedDate = moment(date).unix();
        // let formatedDate = moment(date).format(dateFormat.SEND_TO_SERVERS);
        if (rangTime && rangTime.length>0) { 
            let selectedDate = rangTime.filter(item => item.isSelected === true);
            if (selectedDate && selectedDate.length > 0) {
                selectedDate.map((schedule,index) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);


                })
            }
                
             else {
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate,

        })
        if (res && res.errCode === 0)
        {
            toast.success(<FormattedMessage id="toast.manage-schedule.succeed" />)
           
        }
        else {
            toast.success(<FormattedMessage id="toast.manage-schedule.error-time" />)
        }
        
    }
    
    render() {
        let { rangTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        console.log(rangTime)
        return (
            <React.Fragment>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id ="manage-schedule.title"
                        />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "manage-schedule.choose-doctor" /></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChange}
                                    options={this.state.lisDoctor}
                                />                              </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "manage-schedule.choose-date" /></label>
                                <DatePicker
                                    onChange={this.handleChangeDate}
                                    className='form-control'
                                    value={this.state.date[0]}
                                    minDate={yesterday} // lấy gtri ngày hôm nay
                                   
                            
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {rangTime && rangTime.length > 0
                                    && rangTime.map((item, index) => {
                                        return (
                                            <button
                                                className={item.isSelected === true ? 'btn btn-date active' : 'btn btn-date'}
                                                key="index"
                                                onClick={() => this.handleClickDate(item)}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVN : item.valueEN}
                                            </button>
                                        )
                                    })}
                            </div>
                            <div className='col-12'>
                                <button
                                    className='btn btn-primary btn-save-schedule'
                                    onClick={( ) => this.handleSaveSchedule()}
                                >
                                    <FormattedMessage id = "manage-schedule.Save" />
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        allScheduleDate: state.admin.allScheduleDate

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllcodeScheduleDate: () => dispatch(actions.fetchAllcodeScheduleDate()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
