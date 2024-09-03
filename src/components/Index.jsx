import React, { useState, useEffect, useLoca } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


export const Index = () => {

    const [state, setState] = useState({
        title: "",
        description: ""
    });

    const handler = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const sendData = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3004/to-do/", state)
            .then((res) => {
                if (res.status === 201) {
                    toast.success('Data Send Successfully');
                    console.log(res);
                    window.location.reload(false);     
                }
                else {
                    toast.error('Data Send Successfully');
                }
                
            })
    }


    const [data, setData] = useState([]);

    const getAllData = () => {
        axios.get("http://localhost:3004/to-do")
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            });
    }

    useEffect(() => {
        getAllData();
    }, [])

    const deleteRecord = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        .then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:3004/to-do/" + id)
                    .then((res) => {
                        // console.log(res);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        getAllData();
                    })
            }
        });
    }

    return (
        <>
            <div className="container dark-bg">
                <h2 className='text-center fw-bold mt-3 display-5 text-white'>My To-Do </h2>
            </div>

            <div className='container bg-secondary text-white p-5 mt-5' style={{ maxWidth: '1000px' }}>
                <div className="row">


                    <div className="col-md-12">
                        <form method='post' onSubmit={sendData} >
                            <div className="row">
                                <div className="col-md-2"></div>

                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label fw-bold">Title :</label>
                                        <input type="text" className="form-control" onChange={handler} id="title" name='title' placeholder='What the title of your To-Do ?' />

                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label for="description" className="form-label fw-bold">Description :</label>
                                        <input type="text" className="form-control"
                                            name='description' id="description" onChange={handler}
                                            placeholder='What the description of your To-Do?' />
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <button type="submit" className="Submit-btn">ADD</button>
                                    <Toaster />
                                </div>

                            </div>
                        </form>
                        <hr />
                    </div>

                </div>

                <div className="container mt-2">
                    <p className='d-inline-block p-3 fs-6' style={{ backgroundColor: 'rgb(71, 71, 71)' }}>Tasks</p>
                </div>

                {
                    data.map((item) =>
                        <div className="container d-flex justify-content-between align-items-center mt-4" style={{ backgroundColor: 'rgb(71, 71, 71)' }}>

                            <div className="text-start mt-2">
                                <p className='fs-3 mx-3 fw-bold'>{item.title}</p>
                                <p className='fs-6 mx-3'>{item.description}</p>
                            </div>

                            <div className='text-end d-flex'>
                                <Link to={`/edit/${item.id}`} className='edit'><i class="fa-solid fa-pen-to-square fs-3"></i></Link>
                                <a className='mx-4 delete' onClick={() => { deleteRecord(item.id) }}><i class="fa-solid fa-trash fs-3"></i></a>
                            </div>

                        </div>
                    )
                }

            </div>

        </>
    )
}