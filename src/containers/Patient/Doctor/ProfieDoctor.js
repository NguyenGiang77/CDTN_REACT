import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfieDoctor.scss';
import _ from 'lodash';
import localization from 'moment/locale/vi';
import moment from 'moment';
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import {Link} from 'react-router-dom'
class ProfieDoctor extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            dataProfile: {},

        }
    }
    async componentDidMount() {
        let data = await this.getdataProfile(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }
    getdataProfile =  async(id) => { 
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            result = res.data;
        }
        return result;
    }
    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevState.doctorId) {
            let data = await this.getdataProfile(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
            // this.getdataProfile(this.props.doctorId)
         }

    }
    renderTimeBooking = (dataSchedule) => { 
        let { language } = this.props
        if (dataSchedule && !_.isEmpty(dataSchedule)) {
            let time = language === LANGUAGES.VI ? dataSchedule.timeTypeData.valueVN : dataSchedule.timeTypeData.valueEN;
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataSchedule.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataSchedule.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id = "bookings-modal.booking" /></div>
                </>
            )
        }
        return <></>
        
    }
    render() {
        let { language, isShowDescription,  dataSchedule,
             isShowLinkDetail, isShowPrice, doctorId} = this.props;
        let { dataProfile } = this.state;

        let nameVn = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVn = `${dataProfile.positionData.valueVN}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEN}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='infor-doctor-content'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ''})` }}>
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVn : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescription === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataSchedule)}
                                </>
                            }
                            
                        </div>
                    </div>
                    
                </div> 
                {isShowLinkDetail === true && 
                <div className='view-detail-doctor'>
                <Link to = {`/infor-doctor/${doctorId}`}><FormattedMessage id = "bookings-modal.more" /></Link>
                   
                    
                </div>}
                {}
                {isShowPrice ===true && 
                    <div className='price'>
                        <FormattedMessage id="bookings-modal.price" />
                        {dataProfile && dataProfile.InforDoctor && language === LANGUAGES.VI ?
                            <NumberFormat
                                className='currency'
                                value={dataProfile.InforDoctor.priceData.valueVN}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VNĐ'}
                            />
                            : ''
                        }
                        {dataProfile && dataProfile.InforDoctor && language === LANGUAGES.EN ?
                       
                            <NumberFormat
                                className='currency'
                                value={dataProfile.InforDoctor.priceData.valueEN}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                            : ''
                        }
                    </div>
                }
            </div>  
            
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfieDoctor);
