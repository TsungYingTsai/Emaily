import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header'
import Landing from './Landing'
const DashBoard = () => <h2>DashBoard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render () {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={DashBoard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};
// adding routee between <BrowserRouter> and can have ONLY MOST "ONE" child
// exact === exact={true}, new style syntax for JSX. If we do not put the exact, URL system will greedily match the path
export default connect(null, actions)(App);
// connect(mapstatetoprops, mapdispatchtoprops)  to make these actions as the props to app
