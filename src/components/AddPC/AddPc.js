import { useState } from "react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import './AddPC.css';

const AddPc = () => {
    const [pc, setPc] = useState([]);
    const [error, setError] = useState(null);
    const [cpu, setCpu] = useState('');
    const [motherboard, setMotherboard] = useState('');
    const [ram, setRam] = useState('');
    const [drive, setDrive] = useState('');
    const [psu, setPsu] = useState('');
    const [gpu, setGpu] = useState('');
    const [display, setDisplay] = useState('');
    const [mouse, setMouse] = useState('');
    const [keyboard, setKeyboard] = useState('');
    const [headphones, setHeadphones] = useState('');
    const [users, setUsers] = useState({ "id": "" });
    const navigate = useNavigate();


    const submit = async (e) => {
        e.preventDefault();
        let newData = {
            cpu,
            motherboard,
            ram,
            drive,
            psu,
            gpu,
            display,
            mouse,
            keyboard,
            headphones,
            users
        };

        try {
            const response = await fetch("http://localhost:8000/api/add-pc", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newData),
            });

            if (response.ok) {
                console.log("Added successfully.");
                navigate("/pc");
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
                            <h3>Add PC</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">

                                    <div className="form-group">
                                        <label>Cpu</label>
                                        <input value={cpu} onChange={e => setCpu(e.target.value)} className="form-control"></input>
                                    </div>


                                    <div className="form-group">
                                        <label>Motherboard </label>
                                        <input value={motherboard} onChange={e => setMotherboard(e.target.value)} className="form-control"></input>
                                    </div>

                                    <div className="form-group">
                                        <label>RAM</label>
                                        <input value={ram} onChange={e => setRam(e.target.value)} className="form-control"></input>
                                    </div>

                                    <div className="form-group">
                                        <label>Drive</label>
                                        <input value={drive} onChange={e => setDrive(e.target.value)} className="form-control"></input>
                                    </div>

                                    <div className="form-group">
                                        <label>PSU</label>
                                        <input value={psu} onChange={e => setPsu(e.target.value)}  className="form-control"></input>
                                    </div>

                                    <div className="form-group">
                                        <label>GPU</label>
                                        <input value={gpu} onChange={e => setGpu(e.target.value)} className="form-control"></input>
                                    </div>

                                    <div className="form-group">
                                    <label>Display</label>
                                    <input value={display} onChange={e => setDisplay(e.target.value)} className="form-control"></input>
                                     </div>

                                     <div className="form-group">
                                    <label>Mouse</label>
                                    <input value={mouse} onChange={e => setMouse(e.target.value)} className="form-control"></input>
                                     </div>

                                    <div className="form-group">
                                    <label>Keyboard</label>
                                    <input value={keyboard} onChange={e => setKeyboard(e.target.value)} className="form-control"></input>
                                     </div>

                                     <div className="form-group">
                                    <label>Headphones</label>
                                    <input value={headphones} onChange={e => setHeadphones(e.target.value)} className="form-control"></input>
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
export default AddPc;