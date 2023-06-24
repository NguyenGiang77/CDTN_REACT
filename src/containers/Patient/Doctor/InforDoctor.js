import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './InforDoctor.scss';
import DoctorExtraInfor from './DoctorExtraInfor';
import DoctorSchedule from './DoctorSchedule';
import { LANGUAGES } from '../../../utils';
import {getInforDoctor} from '../../../services/userService';
class InforDoctor extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            inforDoctor: {},
            currentDoctorId: -1,
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) { 
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            });
            let res = await getInforDoctor(id);
            if (res && res.errCode === 0)
            {
                this.setState({
                    inforDoctor: res.data,                   
                })
            }
        }
    }
    //để biets được khi nào prop thay đổi
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { language } = this.props;
        let { inforDoctor } = this.state;
        let nameVn = '', nameEn = '';
        if (inforDoctor && inforDoctor.positionData) {
            nameVn = `${inforDoctor.positionData.valueVN}, ${inforDoctor.lastName} ${inforDoctor.firstName}`;
            nameEn = `${inforDoctor.positionData.valueEN}, ${inforDoctor.firstName} ${inforDoctor.lastName}`;
        }
        
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='infor-doctor-container'>
                    <div className='infor-doctor-content'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${inforDoctor.image ? inforDoctor.image: ''})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVn : nameEn}
                            </div>
                            <div className='down'>
                                { inforDoctor && inforDoctor.Markdown && inforDoctor.Markdown.description
                                    && 
                                    <span>
                                        {inforDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                inforDoctorCheck = {this.state.currentDoctorId}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor
                                inforDoctorCheck = {this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {inforDoctor && inforDoctor.Markdown && inforDoctor.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: inforDoctor.Markdown.contentHTML }}>
                                
                            </div>
                        }
                    </div>
                    <div className="comment-doctor">
                        
                    </div>
                </div>
            </>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        // systemMenuPath: state.app.systemMenuPath,
        // isLoggedIn: state.user.isLoggedIn,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InforDoctor);
