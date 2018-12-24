// interface for stripe
import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render () {
        return (
            <StripeCheckout
                name = "Emaily"
                description = "$5 for 5 email credits"
                amount = {500}
                token = {token => this.props.handleToken(token)}
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add CREDITS
                </button>
            </StripeCheckout>
        );
    }
}
// StripeCheckout defult setting is US dollar (cents)
// token is a callback object from stripe, representing the charge. not the tradition token we thought
// the process.env.REACT_APP_STRIPE_KEY is determined by the env you stand (development or production)
export default connect(null,actions)(Payments);
