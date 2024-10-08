import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";

// Wrapper component to provide context
export function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);
   
    const toggleTheme = () => {
      setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
   
    return (
      <ThemeContext.Provider value={currentTheme}>
        <button onClick={toggleTheme}> Toggle Theme </button>
        {/* <LikeCounter /> */}
      </ThemeContext.Provider>
    );
}
export default ToggleTheme;
   

export function LikeCounter() {
    const [Favs, setFavs] = useState(0);

    const theme = useContext(ThemeContext);
    return (
        <div
            style={{
            background: theme.background,
            color: theme.foreground,
            padding: "20px",
            }}
        >
             <h2>List of favorites:</h2>
             <p>You clicked {Favs} times </p>
        </div>
    );
}