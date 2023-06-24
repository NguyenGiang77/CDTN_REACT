import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Select from 'react-select';
import * as actions from '../../../../store/actions';
import DatePicker from '../../../../components/Input/DatePicker';
import ProfieDoctor from '../ProfieDoctor';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { postBookingAppointment } from '../../../../services/userService';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            selectedGenders: '',
            doctorId: '',
            timeType: '',
            


        }
    }
    componentDidMount() {
        this.props.getGenderStart();

    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVN : item.valueEN;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            });
        }
        if (this.props.genders !== prevProps.genders) {
            if (this.props.genders.length > 0) {
                this.setState({
                    genders: this.buildDataGender(this.props.genders)
                });
            }
        }
        if (this.props.dataSchedule !== prevProps.dataSchedule) {
            if (this.props.dataSchedule && !_.isEmpty(this.props.dataSchedule)) {
                console.log('dataSchedule', this.props.dataSchedule)
                let doctorId = this.props.dataSchedule.doctorId;
                let timeType = this.props.dataSchedule.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                })
            }
        }
    }
        handleOnChangeInput = (event, id) => {
            let valueInput = event.target.value;
            let stateCopy = { ...this.state } // dùng {} sẽ hiểu biến là 1 object, ... copy lại tên state hiện tại
            stateCopy[id] = valueInput;
            this.setState({ ...stateCopy });
        }
        handleOnChangeInputDate = (date) => {
            this.setState({
                birthday: date[0]
            });
        }
        handleChangeGenders = (selectedOption) => {
            this.setState({ selectedGenders: selectedOption });
            
        }
    
    buildTimeBooking = (dataSchedule) => { 
        let { language } = this.props
        if (dataSchedule && !_.isEmpty(dataSchedule)) {
            let time = language === LANGUAGES.VI ? dataSchedule.timeTypeData.valueVN : dataSchedule.timeTypeData.valueEN;
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataSchedule.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataSchedule.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return ''
    }
    buildDoctorName = (dataSchedule) => { 
        let { language } = this.props
        if (dataSchedule && !_.isEmpty(dataSchedule)) {
            let name = language === LANGUAGES.VI ?
                `${dataSchedule.doctorData.lastName} ${dataSchedule.doctorData.firstName}`
                :
                `${dataSchedule.doctorData.firstName} ${dataSchedule.doctorData.lastName}`
            return name
        }
        return ''
    }
    handleSave = async () => {
            
        // !data.email || !data.doctorId || !data.timeType || !data.date
        let doctorName = this.buildDoctorName(this.props.dataSchedule);
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataSchedule)
            let res = await postBookingAppointment({
                Name: this.state.Name,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                date: date,
                selectedGenders: this.state.selectedGenders.value,
                doctorId: this.state.doctorId,
                timeType: this.state.timeType,
                language: this.props.language,
                timeString: timeString,
                doctorName: doctorName,
            })
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.booking-modal.comfirm-success" />)
                this.props.closeModalBooking();
            }
            else {
                toast.error(<FormattedMessage id="toast.booking-modal.comfirm-warning" />)
        }
        console.log(this.state)

    }
        render(){
            let { isOpenModalBooking, closeModalBooking, dataSchedule } = this.props;
            let doctorId = '';
            // // cách 1
            //  if(dataSchedule && _.isEmpty(dataSchedule)) {
            //     doctorId = dataSchedule.doctorId
            // }
            // Cách 2
            
            doctorId = dataSchedule && !_.isEmpty(dataSchedule) ? dataSchedule.doctorId : '';
            console.log(dataSchedule)
            return (
                <Modal
                    isOpen={isOpenModalBooking}
                    className={'booking-container'}
                    size="lg"
                    centered
                >
                    <div className='booking-content'>
                        <div className='booking-header'>
                            <span className='left'>Thông tin đặt lịch khám bệnh</span>
                            <span className='right' onClick={closeModalBooking}>
                                <i class="fas fa-times-circle"></i>
                            
                            </span>
                        </div>
                        <div className='booking-body'>
                            <div className='infor-doctor'>
                                <ProfieDoctor
                                    doctorId={doctorId}
                                    isShowDescription={false}
                                    dataSchedule={dataSchedule}
                                    isShowLinkDetail={true}
                                    isShowPrice = {true}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.email" /></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.name" /></label>
                                    <input className='form-control'
                                        value={this.state.Name}
                                        onChange={(event) => this.handleOnChangeInput(event, 'Name')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.sex" /></label>
                                    <Select
                                        value={this.state.selectedGenders}
                                        onChange={this.handleChangeGenders}
                                        options={this.state.genders}
                                    />

                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.birthday" /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeInputDate}
                                        className="form-control"
                                        value={this.state.birthday}
                                    
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.number" /></label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.address" /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    />
                                </div>
                            
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="bookings-modal.reasons" /></label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-footer'>
                            <button className='btn btn-primary save'
                                onClick={() => this.handleSave()}
                            ><FormattedMessage id="bookings-modal.save" /></button>
                            <button className='btn btn-primary cancel'
                                onClick={closeModalBooking}
                            ><FormattedMessage id="bookings-modal.cancel" /></button>
                        </div>
                    </div>
                
                </Modal>
    
            );
        }
    }

const mapStateToProps = state => {
    return {
        genders: state.admin.genders, // truyền tham số genderss từ reducer vào react
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
   
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
