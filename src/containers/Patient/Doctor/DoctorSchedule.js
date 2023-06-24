import React, { Component } from 'react';
import { connect } from "react-redux";
// import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import moment from 'moment';
import {getSchDoctorByDate} from '../../../services/userService'
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataSchedule: {}
        }
    }
     async componentDidMount() {
        let { language } = this.props;
         let allDays = this.setArrDays(language)
         if (this.props.inforDoctorCheck)
         {
             let res = await getSchDoctorByDate(this.props.inforDoctorCheck, allDays[0].value)
             this.setState({
                 allAvalableTime: res.data? res.data : []
             })
             }
        if (allDays && allDays.length > 0) { 
      
            this.setState({
                allDays: allDays,
            });
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setArrDays =  (language) => { 
        let allDays = []
        for (let i = 0; i < 7; i++){
            let object = {};
            if (language === LANGUAGES.VI) { 
                if (i === 0)
                {
                    let labelVi = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${labelVi}`;
                    object.label = today;
                }
                else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)    
                }
            }
            else {
                if (i === 0)
                {
                    let labelVi = moment(new Date()).format('DD/MM');
                    let today = `Today - ${labelVi}`;
                    object.label = today;
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');                
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }
    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

            let allDays = this.setArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.inforDoctorCheck !== prevProps.inforDoctorCheck) {
            let allDays = this.setArrDays(this.props.language);        
            let res = await getSchDoctorByDate(this.props.inforDoctorCheck, allDays[0].value);   
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.inforDoctorCheck && this.props.inforDoctorCheck !==-1) {
            let doctorId = this.props.inforDoctorCheck;
            let date = event.target.value;
            let res = await getSchDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data: []
                })
            }
        }   
        
    }
    handleClickTime = (time) => { 
        this.setState({
            isOpenModalBooking: true,
            dataSchedule: time
        })
        console.log(time);
    }
    closeModalBooking = () => { 
        this.setState({
            isOpenModalBooking:false
        })
    }
    render() {
        let { allDays, allAvalableTime, isOpenModalBooking,dataSchedule} = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0
                            && allDays.map((item,index) => {
                                return (
                                    <option
                                        value={item.value} 
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                        
                    </select>
                </div>
                <div className='all-time'>
                    <div className='text-celendar'>
                        <i class="fas fa-calendar"><span><FormattedMessage id = "manage-schedule.calendar" /></span></i>
                    </div>
                    <div className='time-content'>
                        {allAvalableTime && allAvalableTime.length > 0 ?
                            <>
                                <div className='time-celendar'>
                                    {allAvalableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ?
                                            item.timeTypeData.valueVN : item.timeTypeData.valueEN;
                                        return (
                                            <button key={index} 
                                                className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                onClick={()=>this.handleClickTime(item)}
                                                
                                            >
                                                {timeDisplay}
                                            </button> 
                                    ) 
                                    })}
                                </div>
                                <div className='book'>
                                    <span>
                                        <FormattedMessage id="manage-schedule.choose" />
                                        <i className="far fa-hand-point-up"></i>
                                        <FormattedMessage id="manage-schedule.book" /></span>
                                </div>
                            </>
                            :
                            <div className='no-data'><FormattedMessage id = "manage-schedule.Message" />
                                 </div>
                        }
                        
                    </div>
                </div>
                </div>
                <BookingModal
                    
                    isOpenModalBooking={isOpenModalBooking}
                    closeModalBooking={this.closeModalBooking}
                    dataSchedule ={dataSchedule}
                />
            </>    
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
