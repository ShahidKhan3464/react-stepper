import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form } from 'react-bootstrap'
import { useGlobalContext } from '../contextApi/ContextApi'
import axios from 'axios'
import './CreateTest.css'

const CreateTest = () => {
    const [title, setTitle] = useState('')
    const [other, setOther] = useState('')
    const { setCurrentStep } = useGlobalContext()
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const newData = { id: uuidv4(), title, other, description }
        const data = axios.post('http://localhost:4000/tests', newData)
        setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
    }

    return (
        <div className='Create'>
            <Form onSubmit={handleSubmit} className='was-validated'>
                <div className="grid">
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            value={title}
                            placeholder="Enter Title"
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            value={other}
                            placeholder="Other"
                            onChange={e => setOther(e.target.value)}
                            required
                        />
                    </Form.Group>
                </div>

                <Form.Control
                    as="textarea"
                    value={description}
                    placeholder="Description"
                    style={{ height: '100px' }}
                    onChange={e => setDescription(e.target.value)}
                    required
                />

                <div className="buttons">
                    <Button variant='success' type='submit'>Save & Continue</Button>
                </div>
            </Form>
        </div>
    )
}

export default CreateTest