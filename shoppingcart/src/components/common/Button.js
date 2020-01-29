import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const styles = {
    button: {
        backgroundColor: '#0099ff',
        color: 'white',
        ':disabled': {
            backgroundColor: 'black'
        },
        float: 'right'
    }


}

class Button extends Component {

    render() {
        return (
            <React.Fragment>
                <Link to="/cart">
                    <button component={Link} id="cartButton" style={styles.button} disabled={this.props.status == 1 ? false : true}>{this.props.name}</button>
                </Link>
            </React.Fragment>
        );
    }
}


export default Button;