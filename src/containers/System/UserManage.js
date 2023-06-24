import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createrNewUserFromReact, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditUser: false,
            isOpenDeleteUser: false,
            userEdit: {},
            userDelete: {},

        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
                
            })
        }
    }
    handleAddNewUser = () => { 
        this.setState({
            isOpenModalUser: true,
        })
    }
    
    toggleUserModal = () => { 
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleEditUserModal = () => { 
        this.setState({
            isOpenEditUser: !this.state.isOpenEditUser,
        })
    }
    toggleDeleteUserModal = () => {
        this.setState({
            isOpenDeleteUser: !this.state.isOpenDeleteUser,
        })
    }
    createNewUser = async (data) => { 
        try {
            let reponse = await createrNewUserFromReact(data);
            if (reponse && reponse.errCode !== 0) { 
                alert(reponse.errMessage);
            }
            else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser:false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e)
        {
            console.log(e);
        }
        
    }
    /** Vòng đời của React 
     * khi Run componet:
     * 1. Run consstruct => init state: init các biến mà mk thêm vào
     * 2. Did mount  => khi muốn gán gtri vào 1 biến state bất kỳ trước khi render ra màn hình
     * 3. Render // đưa ra màn hình re-render: render ra nhiều lần
     * state có nhiệm vụ lưu trữ giá trị 
     */
    handleDeleteUserFE = (user) => { 
        this.setState({
            isOpenDeleteUser: true,
            userDelete:user
        })
    }

    doDeleteUser = async(user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenDeleteUser: false
                });
                await this.getAllUserFromReact();
            }
            else {
                alert(res.errMessage);
            }
        } catch (e) { 
            console.log(e);
        }
    }
// click vào button Edit thì sẽ mở lên modal edit
    handleEditUser = (user) => {
        this.setState({
            isOpenEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async (user) => { 
        
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0)
            {
                this.setState({
                    isOpenEditUser:false,
                });
                await this.getAllUserFromReact()
            }
            else {
                alert(res.errCode)
            }
        } catch (e) {
            console.log(e);
        }

        
    }
    render() {
        
        let arrUsers = this.state.arrUsers;
        //prop lấy dữ liệu từ các componet khác
        return (
            <div className='user-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggerFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEditUser}
                        toggerFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUserReact={this.doEditUser}
                   
                    />
                }
                {this.state.isOpenDeleteUser &&
                    <ModalDeleteUser
                        isOpen={this.state.isOpenDeleteUser}
                        toggerFromParent={this.toggleDeleteUserModal}
                        DeleteUser={this.state.userDelete}
                        DeleteUserReact={this.doDeleteUser}
                    />
                    
                }
                
                
                <div className='title text-center'>Manage user with Hospital</div>
                <div className='mx-1'>
                    <button className='btn btn-sign-in px-3' onClick={() =>this.handleAddNewUser()}>
                        <i className="fas fa-user-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className='users-table mt-4 mx-3'>
                    <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>    
                        </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr key = {index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={()=>this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete' onClick={()=> this.handleDeleteUserFE(item)}><i className="fas fa-trash"></i></button>
                                            </td>
                                       </tr>
                                   )
                                })
                            }
                            </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
