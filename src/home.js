import React from 'react'
import shiva from "./assets/Shiva.png"
import krishna from "./assets/__ Hare Krishna __.png"
import { useState } from 'react'
import firebaseApp from './firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Loader from './Loader';
import { useEffect } from 'react';
import { FastField } from 'formik';

export default function Home() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showLoader, setshowLoader] = useState(false);

    const [passwordType, setPasswordType] = useState("password");

    const navigate = useNavigate();


    useEffect(() => {
        setTimeout(() => {
            setshowLoader(false)
        }, 2000);
    }, [])



    const saveData = () => {

        let obj = {
            name: email,
            password: password,
            id: makeid(6),
            status: 0,
        }

        let registerQuery = new Promise((resolve, reject) => {
            let db = firebaseApp.firestore();
            db.collection("Users").add(obj)

                .then((docRef) => {
                    console.log("Document written with ID: ", docRef);
                    toast.success('Login Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    navigate("/dashboard")

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


    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        } else {
            setPasswordType("password")

        }
    }
    return (
        <>

            {showLoader && <Loader />}
            <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-6 p-0">
                        <img src={shiva} className='shiva' />
                    </div>
                    <div className="col-lg-6  ">
                        <img src={krishna} className='krishna mt-5' />


                        <div className="row  test">
                            <div className="col-lg-12">
                                <b><p className='logins'>Log in</p></b>

                                <div class="form-group mt-5">
                                    <b><label for="exampleInputEmail1">Email or Phone Number *</label></b>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter login detail" onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div class="form-group mt-3">
                                    <b> <label for="exampleInputPassword1">Password *</label></b>
                                    <input type={passwordType} class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    <button className="btn-btn-primary eyepass" type='button' onClick={togglePassword}>

                                        {passwordType === "password" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>}
                                    </button>

                                </div>

                                <div class="form-group mt-3">
                                    <a href="" className='links'>Forgot Password ?</a>
                                </div>

                                <button type="submit" class=" mt-3 submit" onClick={saveData}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}
