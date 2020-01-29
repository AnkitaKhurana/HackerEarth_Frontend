import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
    container :{
        minWidth:'100%',
        padding:'2px',
        borderStyle:'groove',
        alignItems: 'center',
        position: '-webkit-sticky sticky'

    },
    containerBody:{
        minWidth:'100%',
        backgroundColor:'#fbfbfb',
        minHeight:'100px'
    },
    containerFooter:{
        minWidth:'100%',
        backgroundColor:'#efefef',
        minHeight:'50px'
    },
    content :{
        marginLeft:'3.5%',
        marginRight:'10%'
    }
}

class TotalBox extends Component {
    render() {
        return (
            <React.Fragment >
               <div style={styles.container}>
                <div style={styles.containerBody}>
                    <div style={styles.content}>
                        <h4>
                            Total
                           
                        </h4>
                        <h5>Items {this.props.cartCost} :
                             <span style={{float:'right'}}>${this.props.cartTotal}</span>
                        </h5>
                        <h5>Discount :
                              <span  style={{float:'right'}}>- ${this.props.discount}%</span>
                        </h5>
                        <h5>TypeDiscount :
                             <span  style={{float:'right'}}>- ${this.props.typeDiscount}%</span>
                        </h5>
                    </div>
                </div>

                <div style={styles.containerFooter}>
                <div style={styles.content}>
                        <h4>Order Total
                        <span  style={{float:'right'}}> ${this.props.orderTotal}</span>
                        </h4>
                       
                    </div>
                </div>
               </div>
            </React.Fragment>
        );
    }
}


TotalBox.propTypes = {
     cartCost: PropTypes.number.isRequired,
     discount: PropTypes.number.isRequired,
     typeDiscount: PropTypes.number.isRequired,
     cartTotal: PropTypes.number.isRequired,
     orderTotal: PropTypes.number.isRequired,

};

const mapStateToProps = (state, dispatch) => {
    return {
        cartCost: state.reducer.cartCost,
        discount: state.reducer.discount, 
        typeDiscount: state.reducer.typeDiscount, 
        cartTotal: state.reducer.cartTotal,
        orderTotal: state.reducer.orderTotal
    }
}

export default connect(mapStateToProps, { })(TotalBox);