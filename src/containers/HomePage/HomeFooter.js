import React, { Component } from 'react';
import { connect } from 'react-redux';


class HomeFooter extends Component {

    render() {
       // let settings = this.props.settings
        return (
            <div className='home-footer'>
                <p>&copy;Your heart.
                    {/* <a target='_blank' href='đường link'></a> */}
                </p>
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
