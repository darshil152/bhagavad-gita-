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

let GlobalImage = ''


export default function Category() {


    useEffect(() => {
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        setID(id)
        getcategories()



        if (id) {
            getData(id)
        }
    }, [])


    const [oldData, setoldData] = useState([])
    const [ID, setID] = useState('')
    const [Value, setValue] = useState('')

    const [datas, setData] = useState([]);
    const [preview, setPreview] = useState('')
    const [img, setImg] = useState("")
    const [detail, setDetail] = useState('')

    const [Gudetail, setGUDetail] = useState('')

    const [Categories, setCategories] = useState([])

    const [cart, setCart] = useState([])


    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            SubCategory: "",
            Description: "",
        },
        validationSchema: Yup.object({
            SubCategory: Yup.string()
                .required("Sub Category is Required"),
            Description: Yup.string()
                .required("Description   is Required"),

        }),
        onSubmit: (values, { setSubmitting }) => {





            if (oldData.length > 0) {
                const db = firebaseApp.firestore();
                db.collection('SubCategory').where("id", "==", ID).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var updateCollection = db.collection("SubCategory").doc(doc.ref.id);
                        return updateCollection.update({
                            SubCate: values.SubCategory,
                            Description: values.Description,
                            Image: img,
                            Detail: detail,
                            GuDetail: Gudetail,
                        })
                            .then(() => {
                                console.log("Document successfully updated!");
                                handleClose()
                                navigate('/post')
                                GlobalImage = ""

                            })
                            .catch((error) => {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                    })
                }).catch(err => {
                    console.error(err)
                });

            } else {

                let obj = {
                    SubCate: values.SubCategory,
                    Description: values.Description,
                    Image: img,
                    Detail: detail,
                    GuDetail: Gudetail,
                    id: makeid(6),
                    status: 0,
                    MainCategory: Value,
                }
                console.log(obj)



                let registerQuery = new Promise((resolve, reject) => {
                    let db = firebaseApp.firestore();
                    db.collection("SubCategory").add(obj)

                        .then((docRef) => {
                            console.log("Document written with ID: ", docRef);
                            toast.success('SubCategory Added Sucessfully', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            handleClose()
                            navigate('/post')
                            formik.resetForm()
                            setImg('')
                            setDetail('')
                            UpdateCategory(obj)


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
        }
    });


    const UpdateCategory = (obj) => {


        let x = cart


        for (let i = 0; i < Categories.length; i++) {
            if (Categories[i].id == obj.MainCategory) {
                x.push(obj)
            }
        }




        const db = firebaseApp.firestore();
        db.collection('Category').where("id", "==", obj.MainCategory).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("Category").doc(doc.ref.id);
                return updateCollection.update({
                    SubCategory: x

                })
                    .then(() => {
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



    const Imgchange = (file) => {
        for (let i = 0; i < file.length; i++) {
            getBase64(file[i])
            UploadImageTOFirebase(file[i])
        }
    }

    const getBase64 = (file) => {
        let x = []
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            x.push(reader.result)
            setData(x)
        };
        setPreview(datas)
    }

    const UploadImageTOFirebase = (file) => {
        const guid = () => {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return String(s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4());
        }
        let myPromise = new Promise((resolve, reject) => {

            const myGuid = guid();
            const storageUrl = firebaseApp.storage('gs://chilly-s-52073.appspot.com')
            const storageRef = storageUrl.ref();
            console.log('ref : ', storageRef)
            const uploadTask = storageRef.child('Image').child('Thumbnail').child(myGuid).put(file)
            uploadTask.on('state_changed',
                (snapShot) => {

                }, (err) => {
                    //catches the errors
                    console.log(err)
                    reject(err)
                }, () => {

                    firebaseApp
                        .storage('gs://chilly-s-52073.appspot.com')
                        .ref()
                        .child('Image')
                        .child('Thumbnail')
                        .child(myGuid)
                        .getDownloadURL()
                        .then(fireBaseUrl => {
                            resolve(fireBaseUrl)
                        }).catch(err => {
                            console.log('error caught', err)
                        })
                })
        })
        myPromise.then(url => {
            console.log(url)
            setImg(url)
            GlobalImage = url
            setPreview(url)
            // setshowLoader

        }).catch(err => {
            console.log('error caught', err)
        })
    }


    const getcategories = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('Category').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                x.push(doc.data())


                if (doc.data().SubCategory?.length > 0) {
                    setCart(doc.data().SubCategory)
                } else {
                    setCart([])
                }

                setCategories(x)
            })
        }).catch(err => {
            console.error(err)
        });
    }

    const getData = (id) => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('SubCategory').where('id', "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                handleShow()
                formik.setFieldValue('SubCategory', doc.data().SubCate)
                formik.setFieldValue('Description', doc.data().Description)
                setDetail(doc.data().Detail)
                GlobalImage = doc.data().Image
                x.push(doc.data())
                setoldData(x)
            })
        }).catch(err => {
            console.error(err)
        });
    }

    console.log(GlobalImage)

    const HandleChange = (e) => {
        setValue(e.target.value)
    }
    return (
        <>
            <Layout />
            <div className="MarginContent">
                <div className="d-flex justify-content-between ">
                    <h1>Categories</h1>
                    <button type="submit" class="me-3 category " onClick={handleShow} >Add Categories</button>
                </div>


                <Modal show={showModal} onHide={handleClose} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>Bhagvat Gita</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form" onSubmit={formik.handleSubmit}>
                            <div className="row">

                                <div className="col-lg-12 ">
                                    <label htmlFor="">Select main Category:</label>
                                    <select className='form-control' name="" id="" onChange={HandleChange}>
                                        <option selected >Select the main Category</option>
                                        {
                                            Categories && Categories.length > 0 && Categories.map((i) => (
                                                <option value={i.id} >{i.Category}</option>
                                            ))
                                        }

                                    </select>
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <div className="form-group">
                                        <label for="SubCategory">Sub Category Name * </label>
                                        <input
                                            type="text"
                                            className={formik.touched.SubCategory && formik.errors.SubCategory ? "form-control error" : "form-control"}
                                            {...formik.getFieldProps("SubCategory")}
                                        />
                                        {formik.touched.SubCategory && formik.errors.SubCategory ? (
                                            <div className="text-danger">{formik.errors.SubCategory}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label for="thumbnail">Sub Category Thumbnail *</label><br />
                                        <input type="file" class="fileInput" id="yourImgId" onChange={(e) => Imgchange(e.target.files)} />
                                        <br />
                                        {
                                            img ? <img src={img} className='mt-3' style={{ width: "156px", height: "240px" }} /> : <img src={GlobalImage} className='mt-3' style={{ width: "156px", height: "240px" }} />
                                        }

                                    </div>
                                </div>

                                <div className="col-lg-12 mt-5">
                                    <label htmlFor="Story Details *">Story Details *:</label>
                                    <ReactQuill theme="snow" value={detail} onChange={setDetail} />
                                </div>


                                <div className="col-lg-12 mt-5">
                                    <label htmlFor="Story Details *">Story Details in gujarati *:</label>
                                    <input type="text" className="form-control" onChange={(e) => setGUDetail(e.target.value)} />
                                </div>



                                <div className="col-lg-12 mt-5">
                                    <div className="form-group">
                                        <label for="Description">Description * </label>
                                        <input
                                            type="text"
                                            className={formik.touched.Description && formik.errors.Description ? "form-control error" : "form-control"}
                                            {...formik.getFieldProps("Description")}
                                        />
                                        {formik.touched.Description && formik.errors.Description ? (
                                            <div className="text-danger">{formik.errors.Description}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <button type="submit" className='col-4 mt-3 mb-2 btn-success btn w-100'>
                                        Upload
                                    </button>
                                </div>

                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
