import React, { useState } from 'react'
import Layout from './Layout'
import { Modal, Button } from "react-bootstrap";
import { Formik, useFormik } from 'formik'
import * as Yup from "yup";
import firebaseApp from './firebase/firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import article from "./assets/Articles.png";
import categori from "./assets/category.png";
import subcate from "./assets/Subcategories.png";
import users from "./assets/users.png";
import MUIDataTable from "mui-datatables";


let GlobalImage = ''

export default function Dashboard() {

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [Value, SetValue] = useState('')

    useEffect(() => {
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        setID(id)
        getCat()
    }, [])

    const [oldCate, setoldCate] = useState([])

    const [ID, setID] = useState('')





    const columns = [
        {
            name: "Category",
            label: "Category",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "status",
            label: "status",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "id",
            label: "View",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button className='btn btn-primary' onClick={() => SubCategories(value)}> View Sub Category</button>
                )
            }
        },

    ];

    const SubCategories = (value) => {
        console.log(value, "Asd")
        SetValue(value)
        handleShow()

    }


    const getCat = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('Category').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                x.push(doc.data())
                x.sort(compares)
                setoldCate(x)

            })
        }).catch(err => {
            console.error(err)
        });
    }

    const compares = (a, b) => {
        if (a.Number < b.Number) {
            return -1;
        }
        if (a.Number > b.Number) {
            return 1;
        }
        return 0;
    }






    // const [Gudetail, setGUDetail] = useState('')
    const [Categories, setcateGories] = useState('')
    const [Number, setNumber] = useState("0")





    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);


    const navigate = useNavigate();







    const makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }



    const SaveCategory = () => {
        let obj = {
            Category: Categories,
            id: makeid(6),
            status: 0,
            CatNumber: String(Number),
        }
        console.log(obj)

        let registerQuery = new Promise((resolve, reject) => {
            let db = firebaseApp.firestore();
            db.collection("Category").add(obj)

                .then((docRef) => {
                    console.log("Document written with ID: ", docRef);
                    toast.success('Category Added Sucessfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    getCat()
                    handleClose1()
                    setcateGories('')
                })
                .catch((error) => {
                    console.error("Please check form again ", error);
                    reject(error);
                });
        });
        registerQuery.then(result => {
            console.warn('register successful')
        }).catch(error => {
            console.error(error)
        })

    }

    const options = {
        selectableRows: false
    };

    return (
        <>
            <Layout />
            <div className="MarginContent">
                <div className="d-flex justify-content-between ">
                    <h1>Categories</h1>
                    <button type="submit" class=" me-3 category " onClick={handleShow1} >Add Post</button>
                </div>


                <div className="container-fluid">
                    <div className="row mt-4">
                        <div className="col-lg-3 col-md-6 " style={{ backgroundColor: "#f7f7f7" }}>
                            <img src={users} className='img-fluid' />
                            <h4>1356</h4>
                            <h6>Total Users</h6>
                        </div>
                        <div className="col-lg-3  col-md-6" style={{ backgroundColor: "#f7f7f7" }}>
                            <img src={categori} className='img-fluid' />
                            <h4>1356</h4>

                            <h6>Total Categories</h6>
                        </div>
                        <div className="col-lg-3  col-md-6" style={{ backgroundColor: "#f7f7f7" }}>
                            <img src={subcate} className='img-fluid' />
                            <h4>1356</h4>

                            <h6>Total Sub Categories</h6>
                        </div>
                        <div className="col-lg-3  col-md-6" style={{ backgroundColor: "#f7f7f7" }}>
                            <img src={article} className='img-fluid' />
                            <h4>1356</h4>

                            <h6>Total Articles</h6>
                        </div>
                    </div>
                </div>





                <Modal show={showModal1} onHide={handleClose1}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Categories</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="forml">
                            <label htmlFor="category">Add Category Name *</label>
                            <input type="text" className='form-control' onChange={(e) => setcateGories(e.target.value)} />
                        </div>

                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="success" className='w-100' onClick={SaveCategory}>
                            Upload
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>View</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>{Value}</h1>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-lg-12">
                            <MUIDataTable
                                title={"Categories List"}
                                data={oldCate}
                                columns={columns}
                                options={options}
                            />
                        </div>
                    </div>
                </div>

            </div >


            <ToastContainer />
        </>

    )
}
