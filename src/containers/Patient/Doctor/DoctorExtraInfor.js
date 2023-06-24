import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import NumberFormat from 'react-number-format';
import { getExtraInforDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
class DoctorExtraInfor extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}

        }
    }
    async componentDidMount() {
         if (this.props.inforDoctorCheck)
         {
             let res = await getExtraInforDoctorById(this.props.inforDoctorCheck);
             if (res && res.errCode === 0) {
                 this.setState({
                     extraInfor: res.data
                 })
             }
            }
    }
    
    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }
        if (this.props.inforDoctorCheck !== prevProps.inforDoctorCheck)
        {
            let res = await getExtraInforDoctorById(this.props.inforDoctorCheck);
            if (res && res.errCode === 0)
            {
                this.setState({
                    extraInfor: res.data
                })
                }
            
            
        }
    }
    showHideDetailInfor = (status) => { 
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let {language} = this.props
        return (
            <div className='doctor-infor-conteiner'>
                <div className='content-up'>
                    <div className='title-address'>
                        <FormattedMessage id = "extra-infor-doctor.address" />
                    </div>

                </div>
                <div className='content-down'>
                    
                    {isShowDetailInfor === false ?
                        <>
                            <div className='title-cash'>
                                <FormattedMessage id = "extra-infor-doctor.price-1" />
                                {extraInfor && extraInfor.priceData && language === LANGUAGES.VI &&
                                    <NumberFormat
                                    className='currency'
                                        value={extraInfor.priceData.valueVN }
                                        displayType={'text' }
                                        thousandSeparator={true}
                                        suffix={'VNĐ'}
                                    />
                                }
                                {extraInfor && extraInfor.priceData && language === LANGUAGES.EN &&
                                    <NumberFormat
                                    className='currency'
                                        value={extraInfor.priceData.valueEN }
                                        displayType={'text' }
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />
                                }
                            </div>    
                            <div className='detail'>
                                    <span  onClick={() => this.showHideDetailInfor(true)}>
                                        <FormattedMessage id = "extra-infor-doctor.more" />
                                    </span>
                            </div>    
                         </>   
                        
                        :
                        <>
                            <div className='title-cash-hide'>
                                <div className='cash'>
                                    <div className='price'>
                                        <span className='price-left'>
                                            <FormattedMessage id="extra-infor-doctor.price-2" />
                                        </span>
                                        <span className='price-right'>
                                            {extraInfor && extraInfor.priceData && language === LANGUAGES.VI &&
                                                <NumberFormat
                                                className='currency'
                                                    value={extraInfor.priceData.valueVN }
                                                    displayType={'text' }
                                                    thousandSeparator={true}
                                                    suffix={'VNĐ'}
                                                />
                                            }
                                            {extraInfor && extraInfor.priceData && language === LANGUAGES.EN &&
                                                <NumberFormat
                                                className='currency'
                                                    value={extraInfor.priceData.valueEN }
                                                    displayType={'text' }
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                />
                                            }
                                        </span>
                                    </div>
                                    </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note: ''}
                                </div>
                                <div className='payment'>
                                    <FormattedMessage id = "extra-infor-doctor.payment" />
                                    {extraInfor && extraInfor.paymentData && language === LANGUAGES.VI
                                        ? extraInfor.paymentData.valueVN: ''}
                                    {extraInfor && extraInfor.paymentData && language === LANGUAGES.EN
                                        ? extraInfor.paymentData.valueEN: ''}   
                                </div>
                            </div> 
                            <div className='hide'>
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    <FormattedMessage id = "extra-infor-doctor.hide" />
                                </span>
                            </div>
                            
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
