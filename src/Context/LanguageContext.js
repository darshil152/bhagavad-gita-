import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const Context = createContext()

export default function LanguageContext(props) {

    const [language, setLanguage] = useState((localStorage.getItem('currentLanguage')) ? (localStorage.getItem('currentLanguage')) : "english");


    const onLanguageChange = (language) => {
        setLanguage(language)
        console.log('come', language)
        localStorage.setItem("currentLanguage", JSON.stringify(language))
    }

    return (
        <>
            <Context.Provider value={{ language, setLanguage, onLanguageChange, }}>
                {props.children}
            </Context.Provider>
        </>
    )
}
