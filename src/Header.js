import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import krishna from "./assets/__ Hare Krishna __.png"
import { useContext } from 'react';
import { Context } from './Context/LanguageContext';


export default function Header() {

    const { language, setLanguage, onLanguageChange, } = useContext(Context)


    return (
        <>

            <Navbar className="bg-body-tertiary justify-content-between header">
                <img src={krishna} className='img2 p-3' />

                {/* <div className="col-md-3  ms-auto mt-2">
                    <select onChange={(e) => onLanguageChange(e.target.value)} class="form-select secondclass" aria-label="Default select example">
                        <option selected={language == 'english' ? true : false} value="english">  english</option>
                        <option selected={language == 'gujarati' ? true : false} value="gujarati">  Guajrati </option>
                    </select>
                </div> */}

                <Form inline>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className="search"
                            />
                        </Col>

                    </Row>
                </Form>
            </Navbar>
        </>
    )
}



