import { createContext, useState } from "react"
import React from 'react'

export const ThemeContext = createContext();
export const ThemeProvider = ({children}) =>{
    const [theme, setTheme] = useState(localStorage.getItem("theme")||"light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme==="light"? "dark" : "light"))
    }

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className={theme}>{children}</div>
        </ThemeContext.Provider>
    );

}
