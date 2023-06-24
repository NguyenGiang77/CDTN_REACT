import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader'
import Specialty from './Section/Specialty';
import Medical from './Section/Medical';
import HandBook from './Section/HandBook';
import About from './Section/About';
import './HomePage.scss';
import Doctor from './Section/Doctor';
import HomeFooter from './HomeFooter';
class HomePage extends Component {
    // handleAfterChange = (index, dontAnimate) => {
    //     console.log(index);
    // }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slideToScroll: 1,
            // slickGoTo: this.handleAfterChange,
        }
        
        return (
            <div>
                <HomeHeader isShowBanner ={true} />
                <Specialty settings = {settings} />
                <Medical settings={settings} />
                <Doctor settings = {settings} />
                <HandBook settings={settings} />
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
