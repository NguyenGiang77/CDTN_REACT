import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { withRouter } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from '../../../services/userService';
class Specialty extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            
            dataSpecialty: []
        }
    }
    handleViewInforDoctor = (item) => { 
        if (this.props.history)
        {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    }
    async componentDidMount() { 
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) { 
            this.setState({
                dataSpecialty: res.data ? res.data: []
            });
        }
    }
     
    render() {
        let { dataSpecialty } = this.state;
        console.log(this.state)
    //    let settings = this.props.settings
        return (
            <div className='section-share section-specialty'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            {dataSpecialty && dataSpecialty.length > 0
                                && dataSpecialty.map((item, index) => {
                                    // let imageBase64 = '';
                                    // if (item.image) {
                                    //     imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    // }
                                    return (
                                        <div className='section-customize' key={index}
                                            onClick={() => this.handleViewInforDoctor(item) }>
                                            <div className='customize-no-border'>
                                                    <div className='image section-specialty'
                                                        style={{ backgroundImage: `url(${item.image})`}}
                                                    ></div>     
                                                    <div>{item.name}</div>
                                            </div>
                                        </div>  
                                )
                            })}
                            
                            
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
