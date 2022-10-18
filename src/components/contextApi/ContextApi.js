import React, { useState, createContext, useContext } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [saveData, setSaveData] = useState([])
    const [currentStep, setCurrentStep] = useState(1)
    const [lastAddition, setLastAddition] = useState({})

    return (
        <AppContext.Provider value={{
            saveData,
            currentStep,
            lastAddition,
            setCurrentStep,
            setSaveData,
            setLastAddition,
        }}>
            {children}
        </AppContext.Provider >
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}