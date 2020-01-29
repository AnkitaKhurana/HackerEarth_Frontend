import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './common/Header';
import Footer from './common/Footer';
import Cart from './Cart';
import Catalog from './Catalog';
import Toast from './Toast';

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <Router>
                    <Toast/>
                    <Route path="/(catalog|)/" component={Catalog} />
                    <Route path="/cart" component={Cart} />
                </Router>
                <Footer/>
            </React.Fragment>
        );
    }
}


export default Dashboard;