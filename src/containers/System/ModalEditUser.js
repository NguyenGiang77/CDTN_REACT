
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import _ from 'lodash';

class ModalEditUser extends Component {
    //props: là thuộc tính
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
        }

    }


    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
            })
        }
    }

    toggle = () => {
        this.props.toggerFromParent();
    }
    handleOnChangeInput= (event,id) => { 

        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => { 
        })
    }
    checkValideCreateUser = () => { 
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender'];
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

    handleSaveEdit = () => { 
        let isValid = this.checkValideCreateUser();
        if (isValid===true) {
            this.props.editUserReact(this.state);
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
                <ModalHeader toggle={()=>{ this.toggle() }}>Edit user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-children'>
                        <div className='input-container max-width-input'>
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                                disabled
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
                       
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3'
                        onClick={() => { this.handleSaveEdit() }}>Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
