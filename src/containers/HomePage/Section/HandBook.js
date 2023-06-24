import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HandBook extends Component {

    render() {
       // let settings = this.props.settings
        return (
            <div className='section-share section-handBook'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-handBook'></div>
                                    <div>Triệu chứng</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-handBook'></div>
                                    <div>Triệu chứng</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-handBook'></div>
                                    <div>Triệu chứng</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='image section-handBook'></div>
                                <div>Triệu chứng</div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-handBook'></div>
                                    <div>Triệu chứng</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-handBook'></div>
                                    <div>Triệu chứng</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-handBook'></div>
                                    <div>Triệu chứng</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-handBook'></div>
                                    <div>Triệu chứng</div>
                                </div>
                            </div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
