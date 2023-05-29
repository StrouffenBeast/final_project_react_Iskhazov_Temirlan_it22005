import { useState } from "react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import './AddData.css';

const AddData = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState(0);
    const [about, setAbout] = useState("");
    const [gender_id, setGenderId] = useState("",0);
    const navigate = useNavigate();


    const submit = async (e) => {
        e.preventDefault();
        let newData = {
            mail,
            password,
            name,
            surname,
            age,
            about,
            gender_id
        };

        try {
            const response = await fetch("http://localhost:8080/api/add-user", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newData),
            });

            if (response.ok) {
                console.log("Added successfully.");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="addDataContainer">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={submit}>
                    <div className="card">
                        <div className="card-header">
                            <h3>Add User</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">

                                    <div className="form-group">
                                        <label>Mail</label>
                                        <input value={mail} onChange={e => setMail(e.target.value)} className="form-control"></input>
                                    </div>


                                    <div className="form-group">
                                        <label>Password </label>
                                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"></input>
                                    </div>


                                    <div className="form-group">
                                        <label>Name</label>
                                        <input value={name} onChange={e => setName(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Surname</label>
                                        <input value={surname} onChange={e => setSurname(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input value={age} onChange={e => setAge(e.target.value)} type="numeric" className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>About</label>
                                        <input value={about} onChange={e => setAbout(e.target.value)} className="form-control"></input>
                                    </div>


                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br></br>
                                        <input className="form-check" type="checkbox" checked={gender_id === 'male'} onChange={e => setGenderId(1)} name="gender" value="male"></input>
                                        <label>Male</label>
                                        <input className="form-check" type="checkbox" checked={gender_id === 'female'} onChange={e => setGenderId(2)} name="gender" value="female"></input>
                                        <label>Female</label>

                                </div>

                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-secondary">Add</button>
                            <br></br>
                            <br></br>
                            <button className="btn btn-dark"><Link to={'/'}></Link>Go Back</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AddData;