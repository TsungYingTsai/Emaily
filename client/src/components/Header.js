import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments'

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return 'null';
            case false:
                return <li><a href="/auth/google"> Login with Google </a></li>;
            default:
                return [
                    <li key="1">< Payments /></li>,
                    <li key="3" style={{ margin: '0 10px'}}> Credits: {this.props.auth.credits} </li>,
                    <li key="2"><a href="/api/logout"> LOGOUT </a></li>
            ];

        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    };
}

function mapStateToProps({auth}) {
    // console.log(auth);
    return { auth };
}

// original code
// function mapStateToProps(state) {
//     return { auth: state.auth };
// }

// why when we pay the money, the credit will display uptodate info? logically, when our backend finish the payment task, it just send the response
// ANS: the source of credits is from this.props.auth, which is produced from (reducer, action, handleToken(), action.payload chain)
// redux will update the state to the new state
export default connect(mapStateToProps)(Header);
