import React, { Component } from 'react';
import { connect } from "react-redux";
import './DefaultClass.scss';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
class DefaultClass extends Component {
    constructor(props) { 
        super(props);
        this.state = {


        }
    }
     componentDidMount() {

    }
    
    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
    }
    render() {

        return (
           <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
