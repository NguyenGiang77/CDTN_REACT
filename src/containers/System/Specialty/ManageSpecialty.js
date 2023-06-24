import React, { Component } from 'react';
 import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify'
import { createSpecialty } from '../../../services/userService';
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            isOpen: false,
            // dữ liệu
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkown: '',
            


            
        }
     }

    async componentDidMount() {

        
    }
    //prev: so sánh props hiện tại và props sắp tới ntn
    componentDidUpdate(prevProps, prevState, snapshot) { 
        //sau khi hàm render chạy thì sẽ chạy đến componentDidUpdate
        // nó sẽ so sánh giữa hiện tại ( this) vafquas khứ (prev)
        // quá khứ của nó là mảng rỗng [], còn hiện tại đã nạp đủ phần tử
        
        // if (prevProps.user !== this.props.user)
        // {
        //     let arrGender = this.props.genderRedux;
        //     let arrRole = this.props.roleRedux;
        //     let arrPosition = this.props.positionRedux;
        //     this.setState({
        //         email: '',
        //         password: '',
        //         lastName: '',
        //         firstName: '',
        //         phoneNumber: '',
        //         address: '',
        //         gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
        //         role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap: '',
        //         position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap: '',
        //         image: '',
        //         action: CRUB_ACTIONS.CREATE,
        //         imgURL: ''
        //     })
        //     }
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
    handleOnChangeInput = (event,id) =>{
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        
    }
     handleEditChange= ({ html, text }) => {
        this.setState ({
            descriptionHTML: html,
            descriptionMarkown: text,
            
        })
        
    }
    handleSaveSpecialtyFE = async () => { 
        let res = await createSpecialty(this.state)
        
        if (res && res.errCode === 0)
        {
            toast.success(<FormattedMessage id="toast.manage-specialty.succeed" />)
            this.setState({
                 name: '',
                image: '',
                descriptionHTML: '',
                descriptionMarkown: '',
            })
        }
        else {
            toast.error(<FormattedMessage id="toast.manage-specialty.error" />)
            console.log(res)
            
        }
    }
 
    render() {
        
        // let language = this.props.language;
        return (
            <div className='user-redux-contanier'>
                <div className='title'>
                    Quản lý chuyên khoa
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            
                            <div className='col-6'>
                                <label><FormattedMessage id ="manage-specialty.name" /></label>
                                <input className="form-control" type='text'
                                    value={this.state.name} 
                                    onChange={(event) => { this.handleOnChangeInput(event, 'name') }}
                                />
                            </div>
                            <div className='col-6 my-3'>
                                <label><FormattedMessage id="manage-specialty.image" /></label>
                                <div className='img-container'>
                                    <input id='previewImg' type="file" hidden
                                        onChange={(event) =>this.handleImageChange(event)}
                                    
                                    />
                                    <label className='label-img' htmlFor='previewImg'><FormattedMessage id="manage-specialty.file" /><i className="fas fa-upload"></i> </label>
                                    <div className='image'
                                        style={{ backgroundImage: `url(${this.state.imgURL})`}}
                                        onClick={() => this.openImg()}
                                    >
                                        
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className='col-12 manage-doctor-edit'>
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditChange}
                                    value ={this.state.descriptionMarkown}
                                />
                            </div>
                            <div className='col-12 my-3'>
                                <button
                                    className='btn btn-primary'
                                    onClick={() => { this.handleSaveSpecialtyFE() }}
                                >
                                         <FormattedMessage id="manage-specialty.save" />
                               </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
