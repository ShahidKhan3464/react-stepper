import { useState } from 'react';
import { useGlobalContext } from '../contextApi/ContextApi'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import figma from '../../figma.png'
import axios from 'axios'
import './Review.css'

const Review = () => {
    const { saveData } = useGlobalContext()
    const [today, setToday] = useState(new Date());
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(today).toLocaleDateString("en-GB", options);

    const handleShow = async () => {
        console.log('date =>', date)
        console.log('saveData =>', saveData)
        const { data } = await axios.get('http://localhost:4000/tests')
        console.log('Last Addition', data[data.length - 1])
    }

    return (
        <div className="Review">
            <Table striped bordered hover>
                <tbody>
                    {saveData.map((singleData, index) => (
                        <tr key={index}>
                            <td>
                                <div className="img">
                                    <img src={figma} alt="figma" />
                                </div>
                            </td>
                            <td>{singleData.title}</td>
                            <td>Cognitive Ability</td>
                            <td>{singleData.other}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="control">
                <div className="deadline">
                    <Form.Label>Select deadline</Form.Label>
                    <Form.Control
                        type="date"
                        value={today}
                        placeholder="Select Date"
                        onChange={(e) => setToday(e.target.value)}
                    />
                </div>
                <div className="showData">
                    <Button variant='success' onClick={handleShow}>Show Data</Button>
                </div>
            </div>
        </div>
    );
}

export default Review