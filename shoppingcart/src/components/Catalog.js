import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProductsAction } from '../actions/actions';
import Card from './common/Card';
import Button from './common/Button';

const styles = {
    catalog: {
        width: "1000px",
        margin: 'auto',
        paddingTop: '5%'
    },
    head: {
        fontSize: 'larger',
        fontFamily: 'initial',
        color: '#4c4848',
        display: 'inline-block'
    }
}

class Catalog extends Component {

    componentDidMount() {
        this.props.fetchProductsAction();
    }

    render() {
        let button = "", total = "";
        if (this.props.enabled)
            button = <Button name="Go To Cart" status={this.props.enabled} />;
        if (this.props.cartCost > 0)
            total = <span style={{float: 'right'}}>{this.props.cartCost}</span>;

        return (
            <div style={styles.catalog}>
                <div style={styles.head}>All Items</div>
                {total}{button}

                <hr></hr>
                {this.props.res ?
                    Object.keys(this.props.res).map((item, i) => <Card product={this.props.res[item]} key={i}></Card>)
                    : (
                        <p>Fetching Products...........</p>
                    )}
            </div>
        );
    }
}

Catalog.propTypes = {
    fetchProductsAction: PropTypes.func.isRequired,
    res: PropTypes.object,
    cartCost: PropTypes.number.isRequired,
    enabled: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
    return {
        res: state.reducer.products,
        enabled: (Object.entries(state.reducer.cartItems).length > 0 ? 1 : 0),
        cartCost: state.reducer.cartCost
    }
}

export default connect(mapStateToProps, { fetchProductsAction })(Catalog);