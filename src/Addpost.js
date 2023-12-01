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

export default function Addpost() {

    const [detail, setDetail] = useState('')



    const formik = useFormik({
        initialValues: {
            title: "",

        },
        validationSchema: Yup.object({
            // title: Yup.string()
            //     .required("Title is Required"),
            // Description: Yup.string()
            //     .required("Description   is Required"),

        }),
        onSubmit: (values, { setSubmitting }) => {

            let obj = {
                Title: values.title,
                PostDetail: detail,
            }
            console.log(obj)




        }
    });




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



    return (
        <>
            <Layout />
            <div className="MarginContent">

                <div className="d-flex justify-content-between ">
                    <h1>Add Post</h1>
                    <button type="submit" class="me-3 category " onClick={formik.handleSubmit}>Upload</button>
                </div>
                <hr />

                <form className="form" >
                    <div className="row">
                        <div className="col-lg-12 mb-3">
                            <div className="form-group">
                                <label for="title">Title * </label>
                                <input
                                    type="text"
                                    className={formik.touched.title && formik.errors.title ? "form-control error" : "form-control"}
                                    {...formik.getFieldProps("title")}
                                />
                                {formik.touched.title && formik.errors.title ? (
                                    <div className="text-danger">{formik.errors.title}</div>
                                ) : null}
                            </div>
                        </div>



                        <div className="col-lg-12 mt-5">
                            <label htmlFor="Story Details *">Story Details *:</label>
                            <ReactQuill theme="snow" value={detail} onChange={setDetail} />
                        </div>


                        {/* <div className="d-flex justify-content-center">
                            <button type="submit" className='col-4 mt-3 mb-2 btn-success btn w-100'>
                                Upload
                            </button>
                        </div> */}

                    </div>
                </form>
            </div>
        </>
    )
}
