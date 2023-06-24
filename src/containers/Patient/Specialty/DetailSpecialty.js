import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import './DetailSpecialty.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import HomeHeader from '../../HomePage/HomeHeader';
import NumberFormat from 'react-number-format';
import ProfieDoctor from '../Doctor/ProfieDoctor';
import { getAllCodeService, getDetailSpecialtyById } from '../../../services/userService';
// import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayDoctorId: [],
            dataSpecialty: {},
            listProvince: []

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailSpecialtyById({
                id: id,
                location: "ALL"
            });
            let resProvince = await getAllCodeService('PROVINCE')

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrayDoctorId = []

                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrayDoctorId.push(item.doctorId);
                        })
                    }
                }
                let dataProvince = resProvince.data;

                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEN: "ALL",
                        valueVN: "Toàn quốc"

                    })
                }
                this.setState({
                    dataSpecialty: res.data,
                    arrayDoctorId: arrayDoctorId,
                    listProvince: dataProvince ? dataProvince : ''
                })
            }
        }
    }
    getDataSpecialty = () => { 

    }
    handleSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            });

            if (res && res.errCode === 0 ) {
                let data = res.data;
                let arrayDoctorId = []

                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrayDoctorId.push(item.doctorId);
                        })
                    }
                }

                
                this.setState({
                    dataSpecialty: res.data,
                    arrayDoctorId: arrayDoctorId,
                })
            }
        }
    }
    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
    }
    render() {
        let { arrayDoctorId, dataSpecialty, listProvince } = this.state;
        let { language } = this.props;

        return (
            <div className="specialty-container">
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className="description-specialty">
                        {dataSpecialty && !_.isEmpty(dataSpecialty)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataSpecialty.descriptionHTML }}>
                            </div>
                        }
                    </div>
                    <div className='search-sp'>
                        <select onChange={(event) => this.handleSelect(event)}>
                            {listProvince && listProvince.length > 0
                                && listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVN : item.valueEN}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrayDoctorId && arrayDoctorId.length > 0 &&
                        arrayDoctorId.map((item, index) => {
                            return (
                                <div className='infor-doctor' key={index}>
                                    <div className='ds-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfieDoctor
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetail={true}
                                                isShowPrice = {false}
                                            // dataSchedule={dataSchedule}
                                            />
                                        </div>
                                    </div>
                                    <div className='ds-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                inforDoctorCheck={item}
                                            />
                                        </div>
                                        <div className='doctor-extra'>
                                            <DoctorExtraInfor
                                                inforDoctorCheck={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
