import React, {useContext, useState, useEffect, useCallback, useMemo, useRef} from 'react';
import './Data.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteUser as deleteUserAction } from '../Data/dataActions';
import AnotherHOC from '../HOC/AnotherHOC';
import withLogger from "../HOC/withLogger";

const DataContext = React.createContext();

const Data = ({ deleteUser }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [updMail, setUpdMail] = useState('');
    const [updPassword, setUpdPassword] = useState('');
    const [updName, setUpdName] = useState('');
    const [updSurname, setUpdSurname] = useState('');
    const [updAge, setUpdAge] = useState(0);
    const [updAbout, setUpdAbout] = useState('');
    const [updGender_id, setUpdGenderId] = useState(0);
    const [updUser_id, setUpdUserId] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        // Имитация componentDidUpdate()
        if (prevUsers.current !== users) {

            console.log('Component updated:', users);
            prevUsers.current = users;
        }
    });

    const prevUsers = useRef(users);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users');
            const data = await response.json();
            setUsers(data);
            setError(null);
            setUpdMail(data[0].mail);
            setUpdPassword(data[0].password);
            setUpdName(data[0].name);
            setUpdSurname(data[0].surname);
            setUpdAge(data[0].age);
            setUpdAbout(data[0].about);
            setUpdGenderId(data[0].gender.id);
            setUpdUserId(data[0].id);
        } catch (error) {
            setError(error);
        }
    }, []);

    const deleteData = useCallback(
        (id) => {
            deleteUser(id);
            fetch(`http://localhost:8080/api/delete-user/${id}`, {
                method: 'DELETE',
            }).then((response) => {
                if (response.ok) {
                    const updatedUsers = users.filter((user) => user.id !== id);
                    setUsers(updatedUsers);
                }
            });
        },
        [deleteUser, users]
    );

    const selectUser = useCallback(
        (id) => {
            const selectedUser = users.find((user) => user.id === id);
            setUpdMail(selectedUser.mail);
            setUpdPassword(selectedUser.password);
            setUpdName(selectedUser.name);
            setUpdSurname(selectedUser.surname);
            setUpdAge(selectedUser.age);
            setUpdAbout(selectedUser.about);
            setUpdGenderId(selectedUser.gender.id);
            setUpdUserId(selectedUser.id);
        },
        [users]
    );

    const updateData = useCallback(() => {
        const mail = updMail;
        const password = updPassword;
        const name = updName;
        const surname = updSurname;
        const age = updAge;
        const about = updAbout;
        const gender_id = updGender_id;
        console.log(gender_id)
        const updateThisUser = updUser_id;
        const newData = { mail, password, name, surname, age, about, gender_id };

        fetch(`http://localhost:8080/api/update-user/${updateThisUser}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newData),
        }).then((response) => {
            response.json().then((resp) => {
                fetchData();
            });
        });
    }, [updMail, updPassword, updName, updSurname, updAge, updAbout, updGender_id, updUser_id, fetchData]);

    const contextValue = useMemo(() => ({
        users,
        deleteData,
        selectUser,
        updateData,
        updMail,
        updPassword,
        updName,
        updSurname,
        updAge,
        updAbout,
        updGender_id,
    }), [users, deleteData, selectUser, updateData, updMail, updPassword, updName, updSurname, updAge, updAbout, updGender_id]);

    if (error) {
        throw error;
    }

    return (
        <div className="dataContainer">
            <h2>Users</h2>
            <table className="table table-dark">
                <thead>
                <tr>
                    <th>Mail</th>
                    <th>Password</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Role</th>
                    <th>RC</th>
                    <th>About</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.mail}</td>
                        <td>{user.password}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.age}</td>
                        <td>{user.gender.gender}</td>
                        <td>{user.rolesList[0].role}</td>
                        <td>{user.regularCustomer.id}</td>
                        <td>{user.about}</td>
                        <td>
                            <button onClick={() => deleteData(user.id)} className="btn btn-danger">
                                Delete
                            </button>
                        </td>
                        <td>
                            <button onClick={() => selectUser(user.id)} className="btn btn-light">
                                Update
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="container-sm">
                <div className="card">
                    <div className="card-header">
                        <h3>Updating User</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group">
                                <label>Mail</label>
                                <input name="updMail" value={updMail} onChange={(e) => setUpdMail(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input name="updPassword" value={updPassword} onChange={(e) => setUpdPassword(e.target.value)} type="" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Name</label>
                                <input name="updName" value={updName} onChange={(e) => setUpdName(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Surname</label>
                                <input name="updSurname" value={updSurname} onChange={(e) => setUpdSurname(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input name="updAge" value={updAge} onChange={(e) => setUpdAge(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>About</label>
                                <input name="updAbout" value={updAbout} onChange={(e) => setUpdAbout(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select
                                    name="updGender_id"
                                    value={updGender_id}
                                    onChange={(e) => setUpdGenderId(e.target.value)}
                                    className="form-control"
                                >
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={updateData} className="btn btn-warning">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            deleteUser: deleteUserAction,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(AnotherHOC(withLogger((Data))));

