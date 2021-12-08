import React, { useState } from "react"
export const setDetailsTheme = () => {
  const details = document.querySelectorAll('.details');
  details.forEach((detail) => {
    detail.classList.toggle("light-theme")
  });
}
const Header = () => {
  const [theme,setTheme] = useState(false);
  const changeTheme = () => {
    const header = document.querySelector(".header")
    const uls = document.querySelectorAll("ul")
    const input = document.querySelector("input")
    const select = document.querySelector("select")
    setDetailsTheme();
    console.log(input);
            setTheme(!theme);
   if(input!==null){
    input.classList.toggle("light-theme");
 }
     if(select!==null){
   select.classList.toggle("light-theme");
}    header.classList.toggle("light-theme")
    uls.forEach((ul) => {
      ul.classList.toggle("light-theme")
    })
    document.body.classList.toggle("light-theme")
 }



return (
    <>
      <header className="header">
        <div>
          <h1>Where in the world?</h1>
        </div>

        <div>
          <button className={(theme)?"btn-moon":"btn-sun"} onClick={() => changeTheme()}>
            {(theme)?<i className="fas fa-2x fa-moon"></i>:<i className="fas fa-2x fa-sun"></i>}
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
