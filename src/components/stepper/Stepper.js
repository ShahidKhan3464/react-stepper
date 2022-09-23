import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../contextApi/ContextApi'
import { BsCheck } from 'react-icons/bs'
import CreateTest from '../createTest/CreateTest'
import TestLibrary from '../testLibrary/TestLibrary'
import Review from '../review/Review'
import './Stepper.css'

const Stepper = () => {
    const { currentStep } = useGlobalContext()
    const [newStep, setNewStep] = useState(null)
    const labels = ['Recruitment Details', 'Assessment Details', 'Review & Invite']

    const getStepContent = (currentStep) => {
        switch (currentStep) {
            case 1: return <CreateTest />
            case 2: return <TestLibrary />
            case 3: return <Review />
            default:
                return 'Unknown step';
        }
    }

    const updateStep = (currentStep, stepsState) => {
        let count = 0
        const newSteps = [...stepsState]

        while (count < newSteps.length) {
            //Active step
            if (count === currentStep) {
                newSteps[count] = {
                    ...newSteps[count],
                    selected: true,
                    completed: false,
                    highlighted: true,
                }
                count++
            }
            //Completed step
            else if (count < currentStep) {
                newSteps[count] = {
                    ...newSteps[count],
                    selected: true,
                    completed: true,
                    highlighted: true,
                }
                count++
            }
            //Pending step
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    selected: false,
                    completed: false,
                    highlighted: false,
                }
                count++
            }
        }
        return newSteps
    }

    useEffect(() => {
        const stepsState = labels.map((label) => (
            {
                description: label,
                selected: '',
                completed: '',
                highlighted: '',
            }
        ))
        const current = updateStep(currentStep - 1, stepsState)
        setNewStep(current)
    }, [currentStep])

    return (
        <div>
            <div className='Stepper'>
                {newStep?.map((step, index) => (
                    <React.Fragment key={index}>
                        <div className="top">
                            <div className={`main-circle ${step.selected ? 'active' : ''}`}>
                                {step.completed
                                    ? <BsCheck className='check' />
                                    : <div className='circle'></div>
                                }
                            </div>
                            <p className={`${step.highlighted ? 'activeText' : ''}`}>{step.description}</p>
                        </div>
                        <div className={`${step.highlighted ? 'activeLine' : 'line'}`}></div>
                    </React.Fragment>
                ))}
            </div>
            {currentStep !== labels.length + 1 && getStepContent(currentStep)}
        </div>
    )
}

export default Stepper