import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableUserRedux.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css'
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
}

class TableUserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        if (prevProps.user !== this.props.user) { 
            this.setState({ 
                userRedux: this.props.user
             })
        }
    }
    handleDeleteRedux = (user) => { 
        this.props.deleteUserStart(user.id);

    }
    handleEditUserRedux = (user) => { 
        this.props.handleEditUserFromParent(user);
    }
    render() {
        let arrUsers = this.state.userRedux;
        return (
            <React.Fragment>
                <table id = "TableUserRedux">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Phone number</th>
                            <th>Actions</th>    
                        </tr>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                            return(
                                <tr key ={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>
                                        <button
                                            onClick={()=> this.handleEditUserRedux(item)}
                                            className='btn-edit' ><i className="fas fa-pencil-alt"></i></button>
                                        <button
                                            onClick={() => this.handleDeleteRedux(item)}
                                            className='btn-delete' ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                            })
                        }
                        
                    </tbody>
                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        user: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserStart: (id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserRedux);
