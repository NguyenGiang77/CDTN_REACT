import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
//import {changeLanguageApp} from '../../store/actions'
import { LANGUAGES , USER_ROLE} from '../../utils';
import _ from 'lodash';
class Header extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => { 
        this.props.changeLanguageAppRedux(language);
    }
    componentDidMount() {
        let { UserInfo } = this.props;
        let menuApp = [];
        if (UserInfo && !_.isEmpty(UserInfo)) { 
            let role = UserInfo.roleId;
            if (role === USER_ROLE.ADMIN)
            {       
                menuApp = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR)
            {
                menuApp = doctorMenu;
            }
            
        }
        this.setState({ menuApp: menuApp });
    }

    render() {
        const { processLogout, language, UserInfo } = this.props;
        return (
            
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='languages'>
                    <span className='welcome'><FormattedMessage id="home-header.welcome"></FormattedMessage> ,
                        {UserInfo && UserInfo.lastName ? UserInfo.lastName : ''} !
                    </span>
                    <span className={language === LANGUAGES.VI ? 'language-vi active': 'language-vi'} onClick={()=> this.handleChangeLanguage(LANGUAGES.VI)}>Vietnamese</span>
                    <span className={language === LANGUAGES.EN ? 'language-en active': 'language-en'} onClick={()=> this.handleChangeLanguage(LANGUAGES.EN)}>English</span>                   
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
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
        UserInfo: state.user.UserInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
