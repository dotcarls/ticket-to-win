import React, { Component } from 'react';
import styled from 'styled-components';

const RouteSection = styled.section`
    padding: 1em;
    background: papayawhip;
`;

const Span = styled.span`
    font-family: HelveticaNeue;
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
    width: 100%;
    display: block;
`;

export default ({route}) => {
    const { start, end, routeData } = route;
    console.log(routeData);

    const opts = routeData.map(r => {
        return (
            <RouteSection key={r.route.map(rr => rr.join('-')).join('-')}> 
                <Span>Total Length: {r.totalLength}</Span>
                <Span>Total Points: {r.totalPoints}</Span>
                <Span>Total Moves: {r.route.length}</Span>
            </RouteSection>
        );
    });

    return (
        <RouteSection key={[start, end].join('-')}>
            {opts}
        </RouteSection>
    );
};
