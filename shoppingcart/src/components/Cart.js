import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addToCartAction, reduceFromCartAction, deleteFromCartAction,showToastFunction } from '../actions/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TotalBox from '../components/TotalBox';

const styles = {
    listArea: {
        width: "1000px",
        margin: 'auto'
    },
    head: {
        fontSize: 'larger',
        fontFamily: 'initial',
        color: '#4c4848',
        display: 'inline-block'
    },
    leftPanel: {
        minWidth: "70%",
        display: "inline-flex"
    },
    rightPanel: {
        minWidth: '30%',
        display: "inline-flex"

    },
    label:{
        display:'inline',
        margin:'14px'
    },
    tab:{
        textAlign: "center",
        border: '0.5px groove',
        margin:'2px'
    }
}

class Cart extends Component {

    constructor(props) {
        super(props);
        this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleReduceFromCart = this.handleReduceFromCart.bind(this);
    }
    handleDeleteFromCart(e) {
        let p = this.props.products[(e.target.getAttribute('product'))];
        this.props.deleteFromCartAction({
            product: p
        });
    }
    handleAddToCart(e) {
        let p = this.props.products[(e.target.getAttribute('product'))];
        this.props.addToCartAction({
            product: p
        });
        this.props.showToastFunction();

    }
    handleReduceFromCart(e) {
        let p = this.props.products[(e.target.getAttribute('product'))];
        this.props.reduceFromCartAction({
            product: p
        });
    }
    render() {
        return (
            <div style={styles.listArea}>
                <Link to="/"> <p component={Link}>Back</p></Link>
                <div style={styles.head}>Order Summary</div>
                <hr></hr>
                <div style={styles.leftPanel}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Items({this.props.cartCost})</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(this.props.res).length > 0 ?

                                    Object.keys(this.props.res).map((item, i) =>
                                        <tr product={item} key={i}>
                                            <td style={styles.tab}>
                                                <img style={{width:'20px', height:'20px', float:'left'}} src={this.props.products[item].img_url} alt="Product"/>
                                                {this.props.products[item].name}
                                                <button style={{ float: 'right' }} product={item} onClick={this.handleDeleteFromCart.bind(item)}>X</button>
                                               
                                            </td>
                                            <td style={{ width:'15%'}}>
                                                <button style={{float:'left'}} product={item} onClick={this.handleReduceFromCart.bind(item)}>-</button>
                                                <div style={styles.label}>{this.props.res[item]}</div>
                                                <button style={{float:'right'}} product={item} onClick={this.handleAddToCart.bind(item)}>+</button>
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                ${this.props.res[item] * (this.props.products[item].price - this.props.products[item].price * this.props.products[item].discount / 100)}
                                            </td>
                                        </tr>
                                    )
                                    : (
                                        <tr>
                                            <td>
                                                <Link to="/"> <p component={Link}>No Items in the cart right, continue shopping!</p></Link>
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
                <div style={styles.rightPanel}>
                    <TotalBox />
                </div>
            </div>
        );
    }
}

Cart.propTypes = {
    res: PropTypes.object,
    products: PropTypes.object,
    addToCartAction: PropTypes.func.isRequired,
    cartCost: PropTypes.number.isRequired,
    reduceFromCartAction: PropTypes.func.isRequired,
    deleteFromCartAction: PropTypes.func.isRequired,
    showToastFunction: PropTypes.func.isRequired,

};

const mapStateToProps = (state, dispatch) => {
    return {
        res: state.reducer.cartItems,
        products: state.reducer.products,
        cartCost: state.reducer.cartCost,
        reduceFromCartAction: details => dispatch(reduceFromCartAction(details)),
        addToCartAction: details => dispatch(addToCartAction(details)),
        deleteFromCartAction: details => dispatch(deleteFromCartAction(details)),
        showToastFunction: () => dispatch(showToastFunction())

    }
}

export default connect(mapStateToProps, { addToCartAction, reduceFromCartAction, deleteFromCartAction,showToastFunction })(Cart);
