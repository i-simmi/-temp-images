import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedDarkMode = localStorage.getItem('darkTheme');

    if(storedDarkMode === null) {
        return prefersDarkMode;
    }
    return storedDarkMode === 'true';
};

export const AppProvider = ({children}) => {
    const [ isDarkTheme, setIsDarkTheme ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('monkey');

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme
        setIsDarkTheme(newDarkTheme);
        const body = document.querySelector('body');
        body.classList.toggle('dark-theme', newDarkTheme);
        console.log(body);
        
    }
    return (
        <AppContext.Provider value={{isDarkTheme, toggleDarkTheme, searchTerm,setSearchTerm}}>
            {children}
        </AppContext.Provider>
    )
}
// 10. Custom hook to use the global context in other components easily.
 export const useGlobalContext = () => {
    return useContext(AppContext);
}

