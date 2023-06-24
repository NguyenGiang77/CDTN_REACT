
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
    //props: là thuộc tính
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: ''         
        }
        this.listenToEmitter();

    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',  
                phoneNumber: '',
                gender: '',
                roleId: ''
            })
        })
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggerFromParent();
    }
    handleOnChangeInput= (event,id) => { 
        // bad code
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.setState
        // }, () => { 
        //     console.log('check bad',this.state);
        // })
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => { 
        })
    }
    checkValideCreateUser = () => { 
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'roleId'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]])
            {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
                }
        }
        return isValid;
    }

    handleSave = () => { 
        let isValid = this.checkValideCreateUser();
        if (isValid===true) {
            this.props.createNewUser(this.state,'acv');
        }

    }
    render() {
        return (
//toggle click ra modal (đóng, mở modal)
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'Modal-user'}
                size="lg"
            >
                <ModalHeader toggle={()=>{ this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-children'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value = {this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value = {this.state.password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Phone number</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber") }}
                                value={this.state.phoneNumber}
                            />
                        </div>
                        <div className='form-group col-md-2'>
                            <label>Sex</label>
                            <select
                                className='form-control'
                                onChange={(event) => {this.handleOnChangeInput(event, "gender")}}
                                value={this.state.gender}
                                >
                                <option value={1}>Male</option>
                                <option value={2}>Female</option>
                                <option value={3}>Other</option>
                            </select>
                        </div>
                        <div className='form-group col-md-2'>
                            <label>Role</label>
                            <select
                                className='form-control'
                                onChange={(event) => { this.handleOnChangeInput(event, "roleId") }}
                                value={this.setState.roleId}
                            >
                                <option value={1}>Admin</option>
                                <option value={2}>Doctor</option>
                                <option value={3}>Patient</option>
                            </select>
                        </div> 
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3'
                        onClick={() => { this.handleSave() }}>Save change
                    </Button> {' '}
                    <Button color='secondary' className='px-3' onClick={()=>{ this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
