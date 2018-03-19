import React, { Component } from 'react';
import styled from 'styled-components';

import RouteAdd from './RouteAdd';
import Route from './Route';

import { getRoutesData } from './helpers';

const RoutesSection = styled.section`
    padding: 4em;
    background: papayawhip;
`;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        
        this.handleValidRoute = this.handleValidRoute.bind(this);
        this.getRoutesData = this.getRoutesData.bind(this);
    }
    
    handleValidRoute({start, end}) {
        this.state = {};
        this.setState({
            [start]: {
                [end]: true
            }
        });
        
        this.getRoutesData({start, end});
    }
    
    getRoutesData({start, end, depth = 5}) {
        this.setState({
            [start]: {
                [end]: true,
                routeData: getRoutesData({start, end, depth}),
                start,
                end
            }
        });
    }
    
    render() {
        console.log(this.state);
        const routes = Object.keys(this.state).map(r => <Route route={this.state[r]} />);
        return (
            <RoutesSection>
                <RouteAdd handleValidRoute={this.handleValidRoute} />
                {routes}
            </RoutesSection>
        );
    } 
};
