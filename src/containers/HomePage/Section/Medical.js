import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllClinic } from '../../../services/userService';
import Slider from 'react-slick';
import { withRouter } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Medical extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataClinic: []
        }
    }
   async componentDidMount () {
        let res = await getAllClinic();
        if(res && res.errCode === 0)
        {
            this.setState({
                dataClinic: res.data ? res.data: []
            })
        }
    }
    handleDetailClinic = (clinic) => {
        if (this.props.history)
        {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    
    }
    render() {
       let {dataClinic} = this.state
        return (
            <div className='section-share section-medical'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            {dataClinic && dataClinic.length> 0
                                && dataClinic.map((item,index) => {
                                    return(
                                        <div 
                                            className='section-customize' 
                                            key = {index}
                                            onClick={() =>this.handleDetailClinic(item)}
                                        >
                                            <div className='customize-no-border'>
                                                <div className='image-container'>
                                                    <div className='image section-medical'
                                                    style={{backgroundImage: `url(${item.image})`}}
                                                    />
                                                </div>
                                                     
                                                <div className='position-medical text-center'>
                                                    <div>{item.name}</div>
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
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Medical));
