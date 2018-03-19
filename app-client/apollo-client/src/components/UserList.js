import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import User from './User';

const UserList = ({ data: { loading, error, getConnections } }) => {
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            {getConnections.map(connection => {
                return <User key={connection.id} connection={connection} />
            })}
            
        </div>
    );
};

UserList.propTypes = {
    data: PropTypes.any.isRequired, // eslint-disable-line
};

export const UserQuery = gql`
query ConnectionsQuery {
    getConnections{
        cities
        color
        length
        tunnel
        wilds
        id
    }
}
`;

export default graphql(UserQuery, {
    options: () => ({
        variables: {},
        pollInterval: 10000,
    }),
})(UserList);
