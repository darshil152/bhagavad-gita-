import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Post from './Post';
import Addpost from './Addpost';
import Loader from './Loader';
import Language from './Video/Language';
import Category from './Category';

export default class Routecontainer extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/dashboard/:id" element={<Dashboard />}></Route>

                    <Route path="/category" element={<Category />}></Route>
                    <Route path="/category/:id" element={<Category />}></Route>


                    <Route path="/sidebar" element={<Sidebar />}></Route>
                    <Route path="/post" element={<Post />}></Route>
                    <Route path="/addpost" element={<Addpost />}></Route>
                    <Route path="/loader" element={<Loader />}></Route>



                </Routes>
            </BrowserRouter>
        )
    }
}
