import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addToCartAction, showToastFunction } from '../../actions/actions';
import { connect } from 'react-redux';

const styles = {
    card: {
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        width: '235px',
        height: '250px',
        display: 'inline-block',
        marginRight: '15px',
        marginTop: '20px'
    },
    container: {
        padding: '2px 16px',
        position: 'relative',
        backgroundColor: '#efefef'

    },
    image: {
        minHeight: '140px',
        minWidth: '140px',
        width: '100%',
        textAlign: 'center'
    },
    price: {
        display: 'inline-block'
    },
    priceWithDiscount: {
        display: 'inline-block',
        textDecoration: 'line-through'
    },
    discount: {
        display: 'inline-block',
        color: 'red',
        paddingLeft: '20px'
    },
    discountTag: {
        position: 'absolute',
        top: '-90px',
        left: '0px',
        padding: '2px',
        backgroundColor: '#70c35d',
        color: 'white',
        fontSize: 12.5
    },
    cardButton: {
        float: 'right',
        marginTop: '17px',
        backgroundColor: 'white',
        color: '#0099ff',
        borderColor: '#0099ff',
        ":hover": {
            backgroundColor: '#0099ff',
            color: '#white',
            borderColor: 'white',
        }
    }

};

class Card extends Component {

    constructor(props) {
        super(props);
        this.handleCartAdd = this.handleCartAdd.bind(this);
    }

    handleCartAdd() {
        this.props.addToCartAction({
            product: this.props.product
        });
        this.props.showToastFunction();

    }

    render() {
        return (
            <React.Fragment>
                <div style={styles.card}>
                    <img src={this.props.product.img_url} alt="Item" style={styles.image} />
                    <div style={styles.container}>
                        <h4><b>{this.props.product.name}</b></h4>
                        {(this.props.product.discount) > 0 &&
                            (<React.Fragment>
                                <div style={styles.discountTag}>{this.props.product.discount}% OFF</div>
                                <p style={styles.priceWithDiscount}>${this.props.product.price}</p>
                                <p style={styles.discount}>${this.props.product.price - this.props.product.discount * this.props.product.price / 100}</p></React.Fragment>)
                        }
                        {(this.props.product.discount) <= 0 &&
                            (<React.Fragment><p style={styles.price}>${this.props.product.price}</p></React.Fragment>)
                        }
                        <button style={styles.cardButton} onClick={this.handleCartAdd}><span>Add to Cart</span></button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


Card.propTypes = {
    addToCartAction: PropTypes.func.isRequired,
    showToastFunction: PropTypes.func.isRequired,
};
function mapDispatchToProps(dispatch) {
    return {
        addToCartAction: details => dispatch(addToCartAction(details)),
        showToastFunction: () => dispatch(showToastFunction()),
    };
}

export default connect(null, mapDispatchToProps)(Card);
