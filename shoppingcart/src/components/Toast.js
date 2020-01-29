import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showToastFunction } from '../actions/actions';

const styles = {
    toast: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        width: '11em',
        height: '2em',
        marginTop: '-5em',
        marginLeft: '-5em',
        border: '2px solid black',
        zIndex: '100',
        background: 'rgb(20, 198, 255)',
        color: 'white',
        padding: "1px"
    }
}

class Toast extends Component {
    render() {

        return (
            <React.Fragment>
                {(this.props.productName === "") ? <React.Fragment></React.Fragment> : <div style={styles.toast}> {this.props.productName} added to Cart!</div>}
            </React.Fragment>
        );
    }
}


Toast.propTypes = {
    productName: PropTypes.string.isRequired,
    showToastFunction: PropTypes.func.isRequired
};

const mapStateToProps = (state, dispatch) => {
    return {
        productName: state.reducer.lastItemAdded,
        showToastFunction: () => dispatch(showToastFunction()),

    }
}

export default connect(mapStateToProps, {})(Toast);
