import React, { Component } from 'react';
import { connect } from 'react-redux';


class About extends Component {

    render() {
       // let settings = this.props.settings
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Giới thiệu về YourHeart
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                            title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>

                    </div>
                    <div className='content-right'>
                        <p>Website giúp mọi người có thể đặt thực hiện đặt lịch khám bệnh một cách dễ dàng không mất nhiều thời gian so với cách khám bệnh truyền thống</p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
