import React from 'react'
import axios from 'axios'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form } from 'react-bootstrap'
import { useGlobalContext } from '../contextApi/ContextApi'
import './CreateTest.css'

const CreateTest = () => {
    const { setCurrentStep, lastAddition } = useGlobalContext()

    const initialValues = {
        title: !lastAddition.title ? '' : lastAddition.title,
        other: !lastAddition.other ? '' : lastAddition.other,
        description: !lastAddition.description ? '' : lastAddition.description
    }
    const validationSchema = Yup.object({
        title: Yup.string().min(3, 'Title must be 3 characters long').required('Required'),
        other: Yup.string().required('Required'),
        description: Yup.string().min(30, 'Description must be 30 characters long').required('Required'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            const { title, other, description } = values
            const newData = { id: uuidv4(), title, other, description }
            const data = axios.post('http://localhost:4000/tests', newData)
            setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
        },
    });

    return (
        <div className='Create'>
            <Form onSubmit={formik.handleSubmit}>
                <div className="grid">
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter Title"
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.title
                            && formik.errors.title
                            && <div className='error'>{formik.errors.title}</div>
                        }
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            name="other"
                            placeholder="Other"
                            onBlur={formik.handleBlur}
                            value={formik.values.other}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.other
                            && formik.errors.other
                            && <div className='error'>{formik.errors.other}</div>
                        }
                    </Form.Group>
                </div>

                <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Description"
                    style={{ height: '100px' }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />
                {formik.touched.description
                    && formik.errors.description
                    && <div className='error'>{formik.errors.description}</div>
                }

                <div className="buttons">
                    <Button variant='success' type='submit'>Save & Continue</Button>
                </div>
            </Form>
        </div>
    )
}

export default CreateTest