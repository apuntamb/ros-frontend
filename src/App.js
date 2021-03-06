import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import './App.scss';

import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { systemRecsReducer, systemDetailReducer } from './store/reducers';
import { register } from './store';
import Cookies from 'js-cookie';

class App extends Component {

    componentDidMount () {
        const params = new URLSearchParams(this.props.location.search);
        if (params.get('cs_ros_beta_enable')) {
            Cookies.set('cs_ros_beta_enable', 1);
            params.delete('cs_ros_beta_enable');
            location.href = `${location.pathname}?${params.toString()}`;
        }

        register({
            notifications: notificationsReducer,
            systemDetailReducer,
            systemRecsReducer });
        insights.chrome.init();
        // TODO change this to your appname
        insights.chrome.identifyApp('ros');

        this.appNav = insights.chrome.on('APP_NAVIGATION', event => this.props.history.push(`/${event.navId}`));
    }

    componentWillUnmount () {
        this.appNav();
    }

    render () {
        return (
            <React.Fragment>
                <NotificationsPortal />
                <Routes childProps={ this.props } />
            </React.Fragment>
        );
    }
}

App.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object
};

/**
 * withRouter: https://reacttraining.com/react-router/web/api/withRouter
 * connect: https://github.com/reactjs/react-redux/blob/master/docs/api.md
 *          https://reactjs.org/docs/higher-order-components.html
 */
export default withRouter (connect()(App));
