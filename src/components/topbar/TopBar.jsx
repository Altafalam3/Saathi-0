import React from 'react'
import { Link } from "react-router-dom"
import './topbar.css'
import Logo from '../navbar/logo.png'

const TopBar = () => {
   return (
      <div className="topbar">
         <div className="topContainer">
            <span className="logo"><img src={Logo} alt="" srcset="" style={{
               height: '35px'
            }} /></span>
            <div className="topItems">
               <Link to="/findflatmate"><button className="topButton">Find Flatmate</button></Link>
               <Link to="/postflat"><button className="topButton">Post Flat</button></Link>
               <Link to="/findflat"><button className="topButton">Find Flat</button></Link>
            </div>


         </div>
      </div>
   )
}

export default TopBar