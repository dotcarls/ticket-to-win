import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './Input';
import nodes from '../../data/nodes.json';

const RouteAddSection = styled.section`
    padding: 4em;
    background: papayawhip;
`;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {start: null, end: null};
        
        this.handleChange = this.handleChange.bind(this);
        this.validateNodes = this.validateNodes.bind(this);
        
        console.log(props);
        this.handleValidRoute = this.props && this.props.handleValidRoute || null;
    }
    
    handleChange(prop, val) {
        this.setState({
            ...this.state,
            [prop]: val
        });
        
        this.validateNodes({
            ...this.state,
            [prop]: val
        });
    }
    
    validateNodes({ start = null, end = null }) {
        if (!this.handleValidRoute) return;
        
        console.log(start, end);
        if (start && end && nodes.includes(start) && nodes.includes(end)) {
            this.handleValidRoute({start, end});
        }
    }
    
    render() {
        return (
            <RouteAddSection>
                <Input key="start" label="start" placeholder="kyiv" changeHandler={this.handleChange} />
                <Input key="end" label="end" placeholder="berlin" changeHandler={this.handleChange} />
            </RouteAddSection>
        );
    } 
};
