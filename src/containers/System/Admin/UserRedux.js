import React, { Component } from 'react';
 import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUB_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableUserRedux from './TableUserRedux';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            imgURL: '',
            isOpen: false,
            // dữ liệu
            email: '',
            password: '',
            lastName: '',
            firstName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            role: '',
            position: '',
            image: '',
            action: '',
            userEditId: ''
            


            
        }
     }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
        this.props.getPositionStart();
        
    }
    //prev: so sánh props hiện tại và props sắp tới ntn
    componentDidUpdate(prevProps, prevState, snapshot) { 
        //sau khi hàm render chạy thì sẽ chạy đến componentDidUpdate
        // nó sẽ so sánh giữa hiện tại ( this) vafquas khứ (prev)
        // quá khứ của nó là mảng rỗng [], còn hiện tại đã nạp đủ phần tử
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            });
            //
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap: ''
            });
            //
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap: ''
            });
            //
        }
        if (prevProps.user !== this.props.user)
        {
            let arrGender = this.props.genderRedux;
            let arrRole = this.props.roleRedux;
            let arrPosition = this.props.positionRedux;
            this.setState({
                email: '',
                password: '',
                lastName: '',
                firstName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap: '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap: '',
                image: '',
                action: CRUB_ACTIONS.CREATE,
                imgURL: ''
            })
            }
    }
    
    handleImageChange =  async (event) => { 
        let datafile = event.target.files;
        let file = datafile[0];
        if (file)
        {
            let base64 = await CommonUtils.getBase64(file);            
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                imgURL: objectUrl,
                image: base64
            })
            
                
            
        }
    }

    openImg = () => { 
        if (!this.state.imgURL) return;
    
        this.setState({ isOpen: true })
    }
    handleSaveUserFE = () => { 
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUB_ACTIONS.CREATE)
        {
            this.props.createUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,           
            positionId: this.state.position,
            image: this.state.image,
            })
            
        }
        if (action === CRUB_ACTIONS.EDIT) {
            this.props.editUserStart({
                id:this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                
                positionId: this.state.position,
                image: this.state.image,
            })
        }
        
    }
    checkValidateInput = () => { 
        let isValid = true;
        let arrCheck = ['email', 'password', 'lastName', 'firstName',
            'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) { 
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Please enter '+ arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => { 
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        
    }
    handleEditUserFromParent = (user) => { 
        let imageBase64 = '';
        if (user.image) { 
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            role: user.roleId,
            
            position: user.positionId,
            imgURL: imageBase64,
            image: '',
            action: CRUB_ACTIONS.EDIT,
            userEditId: user.id
            })
    }
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let { email, password, lastName, firstName,
            phoneNumber, address, role, gender,position 
        } = this.state;
        let language = this.props.language;
        let isLoadingGenderReact = this.props.isLoadingGender;
        return (
            <div className='user-redux-contanier'>
                <div className='title'>
                    User Redux
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            
                            <div className='col-12 my-3'><FormattedMessage id ="manage-user.add" /></div>
                            <div className='col-12'>{isLoadingGenderReact === true ? "Loading Gender" : ''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.email" /></label>
                                <input className="form-control" type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUB_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.password" /></label>
                                <input className="form-control" type='password'
                                    value={password}
                                    disabled={this.state.action === CRUB_ACTIONS.EDIT ? true : false}
                                    onChange ={(event) =>{ this.onChangeInput(event,'password')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.last" /></label>
                                <input className="form-control" type='text'
                                    value={lastName}
                                    onChange ={(event) =>{ this.onChangeInput(event,'lastName')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.first" /></label>
                                <input className="form-control" type='text'
                                    value={firstName}
                                    onChange ={(event) =>{ this.onChangeInput(event,'firstName')}}
                                />
                            </div>
                            
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.phone" /></label>
                                <input className="form-control" type='text'
                                    value={phoneNumber}
                                    onChange ={(event) =>{ this.onChangeInput(event,'phoneNumber')}}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id ="manage-user.address" /></label>
                                <input className="form-control" type='text'
                                    value={address}
                                    onChange ={(event) =>{ this.onChangeInput(event,'address')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.gender" /></label>
                                <select className="form-control"
                                    value={gender}
                                    onChange ={(event) =>{ this.onChangeInput(event,'gender')}}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{
                                                    language === LANGUAGES.VI ? item.valueVN : item.valueEN}</option>
                                            )
                                         })
                                    }
                                    
                                    
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.roleid" /></label>
                                <select className="form-control"
                                    
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    value ={role}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => { 
                                            return (
                                                <option key={index} value={item.keyMap}>{
                                                    language === LANGUAGES.VI ? item.valueVN : item.valueEN
                                                }</option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.position" /></label>
                                <select className="form-control"
                                    value={position}
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{
                                                    language === LANGUAGES.VI ? item.valueVN : item.valueEN}</option>
                                            )
                                         })
                                    }
                                    
                                    
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='img-container'>
                                    <input id='previewImg' type="file" hidden
                                        onChange={(event) =>this.handleImageChange(event)}
                                    
                                    />
                                    <label className='label-img' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i> </label>
                                    <div className='image'
                                        style={{ backgroundImage: `url(${this.state.imgURL})`}}
                                        onClick={() => this.openImg()}
                                    >
                                        
                                    </div>
                                </div>
                                
                            </div>
                            <div className='col-12 my-3'>
                                <button
                                    className={this.state.action === CRUB_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => { this.handleSaveUserFE() }}
                                >
                                    {this.state.action === CRUB_ACTIONS.EDIT ? 
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                         <FormattedMessage id="manage-user.save" />
                                    }
                               </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableUserRedux
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action = {this.state.action}
                                />
                                    
                            </div>
                        </div>

                    </div>
                
                </div>
                
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.imgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    
                    />
                }



            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        
        language: state.app.language,
        genderRedux: state.admin.genders, // truyền tham số genders từ reducer vào react
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        user: state.admin.users,

        isLoadingGenderReact: state.admin.isLoadingGender,
    };

};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createUser: (data) => dispatch(actions.createUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserStart: (data) => dispatch(actions.editUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
