import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import './DetailClinic.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import HomeHeader from '../../HomePage/HomeHeader';
import NumberFormat from 'react-number-format';
import ProfieDoctor from '../Doctor/ProfieDoctor';
import { getAllCodeService, getDetailClinicById } from '../../../services/userService';
// import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayDoctorId: [],
            dataClinic: {},

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailClinicById({
                id: id,
            });

            if (res && res.errCode === 0 ) {
                let data = res.data;
                let arrayDoctorId = []

                if (data && !_.isEmpty(res.data)) {
                    let arr = data.dataClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrayDoctorId.push(item.doctorId);
                        })
                    }
                }
                this.setState({
                    dataClinic: res.data,
                    arrayDoctorId: arrayDoctorId,
                })
            }
        }
    }

    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
    }
    render() {
        let { arrayDoctorId, dataClinic } = this.state;
        let { language } = this.props;

        return (
            <div className="specialty-container">
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className="description-specialty">
                        {dataClinic && !_.isEmpty(dataClinic)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataClinic.descriptionHTML }}>
                            </div>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
