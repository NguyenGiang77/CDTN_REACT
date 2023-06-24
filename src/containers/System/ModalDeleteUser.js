
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import _ from 'lodash';

class ModalDeleteUser extends Component {
    //props: là thuộc tính
    constructor(props) {
        super(props);
        this.state = {
            id:''
        }

    }


    componentDidMount() {
        let user = this.props.DeleteUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id
            })
        }
    }

    toggle = () => {
        this.props.toggerFromParent();
    }


    handleSaveDelete = () => { 
        this.props.DeleteUserReact(this.state);

    }
    render() {
        return (
//toggle click ra modal (đóng, mở modal)
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'Modal-user'}
                size="sm"
                centered
            >
                <ModalHeader toggle={()=>{ this.toggle() }}>Delete user</ModalHeader>
                <ModalBody>
                    <div>Are you sure to delete?</div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3'
                        onClick={() => { this.handleSaveDelete() }}>Yes
                    </Button> {' '}
                    <Button color='secondary' className='px-3' onClick={()=>{ this.toggle() }}>No</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteUser);
