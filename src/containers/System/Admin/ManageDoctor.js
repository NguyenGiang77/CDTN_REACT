import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss'; 
import './TableUserRedux.scss';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css'
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { getInforDoctor } from '../../../services/userService';
import { CRUB_ACTIONS} from '../../../utils';
const mdParser = new MarkdownIt();
class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            lisDoctor: [],
            specialtyId: '',
            clinicId: '',
            hasOldData: false,
            //Lưu thông tin chi tiết bác sĩ
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',

            note: '',
            

            
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getInforDoctor();
    }
    buildDataCombobox = (inputdata,type) => { 
        let result = [];
        let {language} = this.props;
        if (inputdata && inputdata.length > 0) {
            if (type === "USERS")
            {
                inputdata.map((item, index) => {
                    let object = {};
                    let labelVn = `${item.lastName} ${item.firstName}` ;
                    let labelEn = `${item.lastName} ${item.firstName}`;
                    object.label = language === LANGUAGES.VI ? labelVn : labelEn;
                    object.value = item.id;
                    result.push(object);

                })
            }
            if (type === 'PRICE')
            {
                inputdata.map((item, index) => {
                    let object = {};
                    let labelVn = `${item.valueVN}` ;
                    let labelEn = `${item.valueEN}`;
                    object.label = language === LANGUAGES.VI ? labelVn : labelEn;
                    object.value = item.keyMap;
                    result.push(object);

                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE')
            {
                inputdata.map((item, index) => {
                    let object = {};
                    let labelVn = `${item.valueVN}` ;
                    let labelEn = `${item.valueEN}`;
                    object.label = language === LANGUAGES.VI ? labelVn : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'SPECITALTY')
            {
                inputdata.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);

                })
            }
            
           
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataCombobox(this.props.allDoctor, "USERS")
            this.setState({
                lisDoctor: dataSelect
            })
        }
        if (prevProps.allData !== this.props.allData)
        {
            let {resPrice, resPayment, resProvince,resSpecialty} = this.props.allData;
            let dataSelectPrice = this.buildDataCombobox(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataCombobox(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataCombobox(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataCombobox(resSpecialty, 'SPECITALTY');
                       
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty
            })
        }
        if (prevProps.language !== this.props.language) { 
            let dataSelect = this.buildDataCombobox(this.props.allDoctor, "USERS")
            let {resPrice, resPayment, resProvince} = this.props.allData;
            let dataSelectPrice = this.buildDataCombobox(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataCombobox(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataCombobox(resProvince, 'PROVINCE');
            this.setState({
                lisDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                
            })
        }

    }   
    handleEditorChange = ({ html, text }) => {
        this.setState ({
            contentMarkdown: text,
            contentHTML: html,
            
        })
    }
    handleSaveContentMarkdown = () => { 
        let {hasOldData} = this.state
        this.props.fetchPostDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUB_ACTIONS.EDIT : CRUB_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            note: this.state.note,
            // clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value

        });
    }


    handleChange = async  (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let {listPayment,listPrice,listProvince, listSpecialty, listClinic} = this.state
        let res = await getInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let note = '',
                paymentId = '', priceId = '', provinceId = '', specialtyId ='',
                selectedPrice = '', selectedPayment = '', selectedProvince = '',
                selectedSpecialty = '', selectedClinic = ''
                ;
            if (res.data.InforDoctor) { 
                note = res.data.InforDoctor.note;
                priceId = res.data.InforDoctor.priceId;
                paymentId = res.data.InforDoctor.paymentId;
                provinceId = res.data.InforDoctor.provinceId;
                specialtyId = res.data.InforDoctor.specialtyId;
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId;
                })
                 selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId;
                })
                 selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId;
                 })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId;
                 })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic

            
            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                note: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedPrice: '',
                selectedSpecialty: '',
                selectedClinic: ''

            })
        }
    }
    handleChangeSelecDoctor = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy,
        });
    }
    handleOnChangeDesc = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    }

    render() {
        let { hasOldData, listSpecialty } = this.state
        console.log(this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id = "manage-doctor.title" />
                </div>
                <div className='more-info'>
                    <div className='more-info-content-left'>
                       <label><FormattedMessage id = "manage-doctor.choose-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.lisDoctor}
                            placeholder={<FormattedMessage id = "manage-doctor.choose-doctor" />}
                        />
                    </div>
                    <div className='more-info-content-right'>
                         <label>
                            <FormattedMessage id = "manage-doctor.details" />
                        </label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeDesc(event, 'description')}
                            value ={this.state.description}
                        >
                        </textarea>
                    </div>                  
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id = "manage-doctor.choose-price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelecDoctor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id = "manage-doctor.choose-price" />}
                            name = "selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'> 
                        <label><FormattedMessage id = "manage-doctor.choose-payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelecDoctor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id = "manage-doctor.choose-payment" />}
                            name = "selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'> 
                        <label><FormattedMessage id = "manage-doctor.choose-province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelecDoctor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id = "manage-doctor.choose-province" />}
                            name = "selectedProvince"
                        />
                    </div>
                    
                    
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id = "manage-doctor.specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelecDoctor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id = "manage-doctor.specialty" />}
                            name = "selectedSpecialty"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id = "manage-doctor.clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelecDoctor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id = "manage-doctor.clinic" />}
                            name = "selectedClinic"
                        />
                    </div>
                    <div className='col-4 form-group'> 
                        <label><FormattedMessage id = "manage-doctor.note" /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnChangeDesc(event, 'note')}
                            value ={this.state.note}
                        />
                    </div>
                </div>
                
                <div className='manage-doctor-edit'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                         value ={this.state.contentMarkdown}
                    />
                </div>
                
                <button
                    className={hasOldData === true ? 'btn btn-primary' : "btn btn-primary create"}
                    onClick={()=> this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ? 
                        <span><FormattedMessage id="manage-doctor.save" /></span>
                        :
                        <span><FormattedMessage id="manage-doctor.create" /></span>
                    }
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        allData: state.admin.allData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getInforDoctor: () => dispatch(actions.getInforDoctor()),

        fetchAllDoctor: (id) => dispatch(actions.fetchAllDoctor()),
        fetchPostDoctor: (data) => dispatch(actions.fetchPostDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
