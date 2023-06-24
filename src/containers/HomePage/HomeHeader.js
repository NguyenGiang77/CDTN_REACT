import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
// import logo from '../../assets/images/bookingcare.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import {changeLanguageApp} from '../../store/actions'
import { withRouter } from 'react-router';

class HomeHeader extends Component {
    changeLanguage = (language) => { 
        this.props.changeLanguageAppRedux(language);
        //fire redux event: actions

    }
    returnHome = () => {
        if (this.props.history)
        {
            this.props.history.push(`/home`);
        }
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left'>
                            <div className='left-content'>
                                <div className='left-content-child'>
                                    <i className="fas solid fa-bars"></i>
                                    <div className='image logo-home'
                                        onClick={ () => this.returnHome()}></div>
                                </div>
                            </div>
                            <ul className='center-content'>
                                <li className='home-children'>
                                    <div><b><FormattedMessage id="home-header.specialty"/></b></div>
                                    <div className='subs-title'><FormattedMessage id="home-header.infor"/></div>
                                </li>
                                <li className='home-children'>
                                    <div><b><FormattedMessage id="home-header.hospital"/></b></div>
                                    <div className='subs-title'><FormattedMessage id="home-header.choose-hospital"/></div>
                                </li>
                                <li className='home-children'>
                                    <div><b><FormattedMessage id="home-header.doctor"/></b></div>
                                    <div className='subs-title'><FormattedMessage id="home-header.choose-doctor"/></div>
                                </li>
                                <li className='home-children'>
                                    <div><b><FormattedMessage id="home-header.medical"/></b></div>
                                    <div className='subs-title'><FormattedMessage id="home-header.choose-medical"/></div>
                                </li>
                            </ul>
                        </div>
                        <div className='right-content'>
                            <div className='help-home'>
                                <i className="fas fa-question-circle"></i>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active': 'language-vi'}><span onClick={()=> this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active': 'language-en'}><span onClick={()=> this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='banner-up'>
                            <div className='tile-text1'><FormattedMessage id="banner.title1" /></div>
                            <div className='tile-text2'><b><FormattedMessage id="banner.title2" /></b></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm kiếm chuyên khoa' />
                            </div>
                        </div>
                        <div className='banner-down'>
                            <div className='options'>
                                <div className='options-specialist'>
                                    <div className='icon-child'>
                                        <i className="fas fa-hospital-alt"></i>
                                    </div>
                                    <div className='text-child'><b><FormattedMessage id="banner.specialty" /></b></div>
                                </div>
                                <div className='options-specialist'>
                                    <div className='icon-child'>
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className='text-child'><b><FormattedMessage id="banner.faraway" /></b></div>
                                </div>
                                <div className='options-specialist'>
                                    <div className='icon-child'>
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className='text-child'><b><FormattedMessage id="banner.generality" /></b></div>
                                </div>
                                <div className='options-specialist'>
                                    <div className='icon-child'>
                                        <i className="fas fa-flask"></i>
                                    </div>
                                    <div className='text-child'><b><FormattedMessage id="banner.test" /></b></div>
                                </div>
                                <div className='options-specialist'>
                                    <div className='icon-child'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='text-child'><b><FormattedMessage id="banner.nerve" /></b></div>
                                </div>
                                <div className='options-specialist'>
                                    <div className='icon-child'>
                                        <i className="fas fa-stethoscope"></i>
                                    </div>
                                    <div className='text-child'><b><FormattedMessage id="banner.dental" /></b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        UserInfo: state.user.UserInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
