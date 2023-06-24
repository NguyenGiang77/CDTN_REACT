import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
class Doctor extends Component {
    // history = useHistory();
    constructor(props) { 
        super(props);
        this.state = {
            arrDoctor: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorRedux
            })
        }
    }
    componentDidMount() { 
        this.props.loadTopDoctor();
    }
    handleViewInforDoctor = (doctor) => { 
        if (this.props.history)
        {
            this.props.history.push(`/infor-doctor/${doctor.id}`);
        }
    }
    render() {
        let { language } = this.props;
        // let settings = this.props.settings
        let arrDoctor = this.state.arrDoctor;
        //arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor)
        
        return (
            
            <div className='section-share section-doctor'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.doctor"></FormattedMessage>
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id ="homepage.More"></FormattedMessage>
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            {arrDoctor && arrDoctor.length > 0 &&
                                arrDoctor.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVn = `${item.positionData.valueVN}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEN}, ${item.lastName} ${item.firstName}`;
                                    
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleViewInforDoctor(item) }
                                    >
                                        <div className='customize-border'>
                                            <div className='outer-background'>
                                                <div className='image section-doctor'
                                                    style={{ backgroundImage: `url(${imageBase64})`}}
                                                />
                                            </div>
                                            <div className='position-doctor text-center'>
                                                <div>{ language === LANGUAGES.VI ? nameVn: nameEn}</div>
                                                <div>Da liễu</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                })
                            }
                        </Slider>
                    </div>
                    
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorRedux: state.admin.topDoctor

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
