import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout(props) {
    return (
        <>
            <Header />
            <Sidebar />
            {props.children}
        </>
    )
}
