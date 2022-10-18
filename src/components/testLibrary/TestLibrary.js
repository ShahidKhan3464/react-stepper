import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineEye } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'
import { useGlobalContext } from '../contextApi/ContextApi'
import figma from '../../figma.png'
import axios from 'axios'
import './TestLibrary.css'

const TestLibrary = () => {
    const [tests, setTests] = useState(null)
    const [disable, setDisable] = useState({})
    const [addition, setAddition] = useState(0)
    const [addedTest, setAddedTest] = useState([{}, {}, {}, {}, {}])
    const [searchItem, setSearchItem] = useState('')
    const { setCurrentStep, setSaveData, setLastAddition } = useGlobalContext()

    const handleAdd = (e, test) => {
        addedTest[addition] = test
        const { id } = e.target.dataset
        setDisable({ ...disable, [id]: true });
        setAddition(prevAddition => prevAddition + 1)
    }

    const handleRemove = (id) => {
        setAddedTest(currentTest => addedTest.filter(test => test.id !== id))
        setAddition(prevAddition => prevAddition - 1)
        setDisable({ ...disable, [id]: false });
        addedTest.push({})
    }

    const handleSave = () => {
        const extract = []
        addedTest.map(test => test.title && extract.push(test))
        if (extract.length < 5) return alert("All Test must be filled")
        setSaveData(extract)
        setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
    }

    const getData = async () => {
        const { data } = await axios.get("http://localhost:4000/tests")
        setTests(data)
        setLastAddition(data[data.length - 1])
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="Library">
            <div className="tests">
                {addedTest.map((test, index) => (
                    <div key={index} className={`${test.title ? 'addedTest' : 'test'}`}>
                        {test.title
                            ? <>
                                <p>{test.title}</p>
                                <MdOutlineCancel
                                    onClick={() => handleRemove(test.id)}
                                    style={{ color: 'red', fontSize: '1.2rem', cursor: 'pointer' }}
                                />
                            </>
                            : `Test ${index + 1}`
                        }
                    </div>
                ))}
            </div>
            <div className="search">
                <input
                    type="text"
                    value={searchItem}
                    placeholder='Search Anything here'
                    onChange={e => setSearchItem(e.target.value)}
                />
                <BsSearch style={{ fontSize: '1.3rem' }} />
            </div>
            <div className="upper">
                {tests?.filter(test => searchItem === '' ? test : test.title.toLowerCase().includes(searchItem.toLowerCase()))
                    .map((test, index) => (
                        <div key={index} className='data'>
                            <div className="left">
                                <div className="icon">
                                    <img src={figma} alt="figma" />
                                </div>
                            </div>
                            <div className="middle">
                                <div className='top-portion'>
                                    <h6>{test.title}</h6>
                                    <p className='text-success'>{test.other} min</p>
                                </div>
                                <p className='description'>{test.description}</p>
                            </div>
                            <div className="right">
                                <div className="actionBtn">
                                    <Button variant='outline-success'><AiOutlineEye /></Button>
                                    <Button variant='outline-success'>Details</Button>
                                    <Button
                                        variant='success'
                                        data-id={test.id}
                                        disabled={disable[test.id]}
                                        onClick={(e) => handleAdd(e, test)}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="lower">
                <Button variant='outline-success' onClick={() => setCurrentStep((prevCurrentStep) => prevCurrentStep - 1)}>Previous</Button>
                <Button variant='success' onClick={() => handleSave()}>Save & Continue</Button>
            </div>
        </div>
    )
}

export default TestLibrary