import React from 'react'
import Layout from './Layout'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import MUIDataTable from "mui-datatables";
import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import firebaseApp from './firebase/firebase';
import parse from 'html-react-parser';
import "./index.css"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { GujaratiWords, EnglishWords } from './Video/Language';
import { useContext } from 'react';
import { Context } from './Context/LanguageContext';

export default function Post() {

    const { language, } = useContext(Context)


    useEffect(() => {
        getdata()


    }, [])

    const navigate = useNavigate();


    const [data, setData] = useState([])




    const getdata = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('SubCategory').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {


                console.log(doc.data())
                x.push(doc.data())
                setData(x)


            })
        }).catch(err => {
            console.error(err)
        });
    }

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })


    const options = {

        selectableRowsHideCheckboxes: true,
        filterType: "dropdown",
        direction: 'desc',
    };

    const columns = [
        {
            name: "id",
            label: "id",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Image",
            label: "Image",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img src={value} width={100} />
                )

            }
        },

        {
            name: "Description",
            label: "Description",
            options: {
                filter: true,
                sort: false,
            }
        },
        {

            name: language == 'english' ? "Detail" : "Detail",
            label: language === 'english' ? EnglishWords.Detail : GujaratiWords.Detail,
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "Detail",
            label: "Detail",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <p className='details'>{parse(value)}</p>
                    </>
                )
            }
        },
        {
            name: "status",
            label: "status",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <label class="switch">
                        <input type="checkbox" checked={value} onChange={(e) => changetoggle(e, tableMeta)} />
                        <span class="slider round"></span>
                    </label>
                )
            }
        },
        {
            name: "id",
            label: "action",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item >Preview</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDelete(value, tableMeta)}>Delete</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleedit(value)}>Edit</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </>
                )
            }
        },
    ];

    const handleDelete = (value, tableMeta) => {
        console.log(value, tableMeta)
        let filterdata = data.filter((i) => i.id != value)
        console.log(filterdata)
        updateproducts(filterdata, value)
    }

    const updateproducts = (filterdata, value) => {
        const db = firebaseApp.firestore();
        db.collection('SubCategory').where("id", "==", value).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                db.collection("SubCategory").doc(doc.ref.id).delete().then(() => {
                    getdata()
                    toast.success('Post Deleted Sucessfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });


                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            })
        }).catch(err => {
            console.error(err)
        });


    }


    const changetoggle = (e, tableMeta) => {
        console.log(e, tableMeta)
        updatestatus(e, tableMeta.rowData[0])
    }

    const updatestatus = (e, x) => {
        let status = e.target.checked == true ? 1 : 0;
        const db = firebaseApp.firestore();
        db.collection('SubCategory').where("id", "==", x).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("SubCategory").doc(doc.ref.id);
                return updateCollection.update({
                    status: Number(status)
                })
                    .then(() => {
                        getdata()
                        toast.success('Status Updated Sucessfully', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        console.log("Document successfully updated!");
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            })
        }).catch(err => {
            console.error(err)
        });
    }


    const handleedit = (value) => {
        navigate("/category/" + value)
    }


    const handleClick = () => {
        navigate('/addpost')
    }


    return (
        <>


            <Layout />

            <div className="MarginContent">

                <div className="d-flex justify-content-between ">
                    <h1>{data.length} Posts</h1>
                    <button type="submit" class="me-3 category " onClick={handleClick}>Add post</button>
                </div>

                <div className="col-lg-12 mt-5">
                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                                title={"All Post"}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        </ThemeProvider>
                    </CacheProvider>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
