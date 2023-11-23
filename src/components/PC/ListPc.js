import React, {useContext, useState, useEffect, useCallback, useMemo, useRef} from 'react';
import './ListPc.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePC as deletePCAction } from '../PC/PCAction';
import AnotherHOC from '../HOC/AnotherHOC';
import withLogger from "../HOC/withLogger";

const PCContext = React.createContext();

const ListPc = ({ deletePC }) => {
    const [pc, setPc] = useState([]);
    const [error, setError] = useState(null);
    const [updCPU, setUpdCPU] = useState('');
    const [updMotherboard, setUpdMotherboard] = useState('');
    const [updRam, setUpdRam] = useState('');
    const [updDrive, setUpdDrive] = useState('');
    const [updPsu, setUpdPsu] = useState('');
    const [updGpu, setUpdGpu] = useState('');
    const [updDisplay, setUpdDisplay] = useState('');
    const [updMouse, setUpdMouse] = useState('');
    const [updKeyboard, setUpdKeyboard] = useState('');
    const [updHeadphones, setUpdHeadphones] = useState('');
    const [Users, setUsers] = useState(0);
    const [updPC_id, setUpdPC_id] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        // Имитация componentDidUpdate()
        if (prevPC.current !== pc) {

            console.log('Component updated:', pc);
            prevPC.current = pc;
        }
    });

    const prevPC = useRef(pc);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8000/api/pc');
            const data = await response.json();
            setPc(data);
            setError(null);
            setUpdCPU(data[0].cpu);
            setUpdMotherboard(data[0].motherboard);
            setUpdRam(data[0].ram);
            setUpdDrive(data[0].drive);
            setUpdPsu(data[0].psu);
            setUpdGpu(data[0].gpu);
            setUpdDisplay(data[0].display);
            setUpdMouse(data[0].mouse);
            setUpdKeyboard(data[0].keyboard);
            setUpdHeadphones(data[0].headphones);
            setUsers(data[0].users);
            setUpdPC_id(data[0].pc_Id);
        } catch (error) {
            setError(error);
        }
    }, []);

    const deleteData = useCallback(
        (id) => {
            console.log(id)
            deletePC(id);
            fetch(`http://localhost:8000/api/delete-pc/${id}`, {
                method: 'DELETE',
            }).then((response) => {
                if (response.ok) {
                    const updatedPC = pc.filter((pces) => pces.pc_Id !== id);
                    setPc(updatedPC);
                }
            });
        },
        [deletePC, pc]
    );

    const selectPC = useCallback(
        (pc_Id) => {
            const selectedPC = pc.find((pces) => pces.pc_Id === pc_Id);
            setUpdCPU(selectedPC.cpu);
            setUpdMotherboard(selectedPC.motherboard);
            setUpdRam(selectedPC.ram);
            setUpdDrive(selectedPC.drive);
            setUpdPsu(selectedPC.psu);
            setUpdGpu(selectedPC.gpu);
            setUpdDisplay(selectedPC.display);
            setUpdMouse(selectedPC.mouse);
            setUpdKeyboard(selectedPC.keyboard);
            setUpdHeadphones(selectedPC.headphones);
            setUsers(selectedPC.users);

            setUpdPC_id(selectedPC.pc_Id);
        },
        [pc]
    );

    const updateData = useCallback(() => {
        const cpu = updCPU;
        const motherboard = updMotherboard;
        const ram = updRam;
        const drive = updDrive;
        const psu = updPsu;
        const gpu = updGpu;
        const display = updDisplay;
        const mouse = updMouse;
        const keyboard = updKeyboard;
        const headphones = updHeadphones;
        const user_id = Users;
        console.log(user_id)
        const updateThisPC = updPC_id;
        const newData = { cpu, motherboard, ram, drive, psu, gpu, display, mouse, keyboard, headphones, user_id };
        console.log(newData)
        fetch(`http://localhost:8000/api/update-pc/${updateThisPC}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newData),
        }).then((response) => {
            response.json().then((resp) => {
                fetchData();
            });
        });
    }, [updCPU, updMotherboard, updRam, updDrive, updPsu, updGpu, updDisplay, updMouse,updKeyboard,updHeadphones,Users, fetchData]);

    const contextValue = useMemo(() => ({
        pc,
        deleteData,
         selectPC,
        updateData,
        updCPU,
        updMotherboard,
        updRam,
        updDrive,
        updPsu,
        updGpu,
        updDisplay,
        updMouse,
        updKeyboard,
        updHeadphones,
        Users,
    }), [pc, deleteData, selectPC, updateData, updCPU, updMotherboard, updRam, updDrive,
        updPsu, updGpu, updDisplay,updMouse,updKeyboard,updHeadphones,Users ]);

    if (error) {
        throw error;
    }

    return (
        <div className="dataContainer">
            <h2>PC</h2>
            <table className="table table-dark">
                <thead>
                <tr>
                    <th>CPU</th>
                    <th>Motherboard</th>
                    <th>RAM</th>
                    <th>Drive</th>
                    <th>PSU</th>
                    <th>GPU</th>
                    <th>Display</th>
                    <th>Mouse</th>
                    <th>Keyboard</th>
                    <th>Headphones</th>
                    <th>Users</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
                </thead>
                <tbody>
                {pc.map((pces) => (
                    <tr key={pces.pc_Id}>
                        <td>{pces.cpu}</td>
                        <td>{pces.motherboard}</td>
                        <td>{pces.ram}</td>
                        <td>{pces.drive}</td>
                        <td>{pces.psu}</td>
                        <td>{pces.gpu}</td>
                        <td>{pces.display}</td>
                        <td>{pces.mouse}</td>
                        <td>{pces.keyboard}</td>
                        <td>{pces.headphones}</td>
                        <td>{pces.users?.id}</td>
                        <td>
                            <button onClick={() => { console.log(pces.pc_Id); deleteData(pces.pc_Id); }} className="btn btn-danger">
                                Delete
                            </button>

                        </td>
                        <td>
                            <button onClick={() => selectPC(pces.pc_Id)} className="btn btn-light">
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
                        <h3>Updating PC</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group">
                                <label>CPU</label>
                                <input name="updCPU" value={updCPU} onChange={(e) => setUpdCPU(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Motherboard</label>
                                <input name="updMotherboard" value={updMotherboard} onChange={(e) => setUpdMotherboard(e.target.value)} type="" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>RAM</label>
                                <input name="updRam" value={updRam} onChange={(e) => setUpdRam(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Drive</label>
                                <input name="updDrive" value={updDrive} onChange={(e) => setUpdDrive(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>PSU</label>
                                <input name="updPsu" value={updPsu} onChange={(e) => setUpdPsu(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>GPU</label>
                                <input name="updGpu" value={updGpu} onChange={(e) => setUpdGpu(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Display</label>
                                <input name="updDisplay" value={updDisplay} onChange={(e) => setUpdDisplay(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Mouse</label>
                                <input name="updMouse" value={updMouse} onChange={(e) => setUpdMouse(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Keyboard</label>
                                <input name="updKeyboard" value={updKeyboard} onChange={(e) => setUpdKeyboard(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Headphones</label>
                                <input name="updHeadphones" value={updHeadphones} onChange={(e) => setUpdHeadphones(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Users</label>
                                <input
                                    name="Users"
                                    value={Users?.id}
                                    onChange={(e) => setUsers(e.target.value)}
                                    className="form-control"
                                />
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
            deletePC: deletePCAction,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(AnotherHOC(withLogger((ListPc))));

