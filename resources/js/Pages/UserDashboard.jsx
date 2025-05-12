import React, { useState, useEffect } from 'react';

const UserDashboard = ({ searchResults = [], success = null, error = null }) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(searchResults);

    return (
        <div>
            <h1>User Dashboard</h1>
        </div>
    );
};

export default UserDashboard;