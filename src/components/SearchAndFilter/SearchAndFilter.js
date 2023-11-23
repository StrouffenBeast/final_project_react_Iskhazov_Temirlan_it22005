import React, { useEffect, useRef, useState } from 'react';

const SearchFilter = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const searchTermRef = useRef('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log("Failed to fetch users:", error);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = searchTermRef.current.value.toLowerCase();
        const filteredUsers = filterUsers(searchTerm);
        setFilteredUsers(filteredUsers);
    };

    const filterUsers = (searchTerm) => {
        return users.filter((user) => {
            return (
                searchTerm === '' ||
                user.mail.toLowerCase().includes(searchTerm) ||
                user.password.toLowerCase().includes(searchTerm) ||
                user.name.toLowerCase().includes(searchTerm) ||
                user.surname.toLowerCase().includes(searchTerm) ||
                user.age.toString().includes(searchTerm) ||
                user.gender.toString().includes(searchTerm) ||
                user.rolesList[0].role.toLowerCase().includes(searchTerm) ||
                user.regularCustomer.id.toString().includes(searchTerm) ||
                user.about.toLowerCase().includes(searchTerm)
            );
        });
    };

    return (
        <div className="safContainer">
            <form onSubmit={handleSearch}>
                <input type="text" ref={searchTermRef} placeholder="Search" />
                <button type="submit">Search</button>
            </form>
            {filteredUsers.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Mail</th>
                        <th>Password</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Role</th>
                        <th>Reg. Customer</th>
                        <th>About</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.mail}</td>
                            <td>{user.password}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.age}</td>
                            <td>{user.gender}</td>
                            <td>{user.rolesList[0].role}</td>
                            <td>{user.regularCustomer.id}</td>
                            <td>{user.about}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default SearchFilter;