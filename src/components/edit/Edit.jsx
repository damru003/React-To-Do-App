import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


export const Edit = () => {

    const [state, setState] = useState({
        title: "",
        description: ""
    });

    const _useNavigate = useNavigate();

    const { id } = useParams()
    console.log(id);

    useEffect(() => {
        axios.get("http://localhost:3004/to-do/" + id)
            .then((res) => {
                setState(res.data);
            })
    }, [])


    const handler = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    }


    const updateData = (event) => {
        event.preventDefault();
        axios.put("http://localhost:3004/to-do/" + id, state)
            .then((res) => {
                _useNavigate("/");
            })
    }

    return (
    <>
            <div className="container dark-bg">
                <h2 className='text-center fw-bold mt-3 display-5'>My To-Do </h2>
            </div>

            <div className='container bg-secondary text-white p-5 mt-5' style={{ maxWidth: '1000px' }}>
                <div className="row"></div>

                <div className='container'>
                    <div className="col-md-12">
                        <form method='post' onSubmit={updateData} >
                            <div className="row">
                                <div className="col-md-2"></div>

                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label fw-bold">Title :</label>
                                        <input type="text" className="form-control" onChange={handler} id="title" name='title' value={state.title} placeholder='What the title of your To-Do ?' />

                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label for="description" className="form-label fw-bold">Description :</label>
                                        <input type="text" className="form-control"
                                            name='description' id="description" value={state.description} onChange={handler}
                                            placeholder='What the description of your To-Do?' />
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <button type="submit" className="Submit-btn">Edit</button>
                                </div>

                            </div>
                        </form>
                        <hr />
                    </div>
                </div>
            </div>
    </>
            )
}