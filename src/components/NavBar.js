import React, { Fragment, useState } from "react";
import {BsDisplay, BsSearch} from 'react-icons/bs';
import {TbMovie} from 'react-icons/tb';
import {MdOutlineWhatshot} from 'react-icons/md';
import { NavLink, Route, Routes } from "react-router-dom";
import '../styles/NavBarStyle.css';
import Movies from "./Movies";
import Trends from "./Trends";
import TvShows from "./TvShows";

export const Container = React.createContext();

function NavBar () {
    const [toggle,setToggle] = useState(true);
    const [inputValue, setInputValue] = useState('');
    return(
        <Container.Provider value={{toggle , inputValue}} >
        <Fragment>
            <nav className={toggle ? '' : 'NavBarColor'}>
                <div className="nav-options">
                    
                    <h1 id={toggle ? '' : 'heading'}>Series and Movies</h1>
                    
                    <NavLink to='' style={({isActive}) =>{return {color: isActive ? 'white' : 'yellow'}}} >                   
                    <span id={toggle ? 'Movies': 'MoviesLight'}>  <TbMovie fontSize={21}/> Movies</span>                    
                    </NavLink>

                    <NavLink to='/TvShows'style={({isActive}) =>{return {color: isActive ? 'white' : 'yellow'}}} >
                    <span id={toggle ? 'Movies': 'MoviesLight'}> <BsDisplay fontSize={21} /> Tv Shows</span>
                    </NavLink>

                    <NavLink to='/Trends' style={({isActive}) =>{return {color: isActive ? 'white' : 'yellow'}}} >
                    <span id={toggle ? 'Movies': 'MoviesLight'}> <MdOutlineWhatshot fontSize={21} /> Trends</span>
                    </NavLink>
                </div>

                <div className="input-group">
                <input type="text" placeholder="Movies,Series" onChange={(e) => setInputValue(e.target.value)} />
                <BsSearch fontSize={20} color="greey" id='search'/>
                <div id='Color-switcher' onClick={()=> setToggle(!toggle)}>
                    <div id= {toggle ? 'Color-switcher-mover': 'Color-switcher-moved'}></div>
                    </div>
                </div>
            </nav>

           <Routes>
            <Route path='' element={<Movies />} />
            <Route path='TvShows' element={<TvShows/>} />
            <Route path='Trends' element={<Trends />} />
           </Routes>

        </Fragment>

        </Container.Provider>
        )
        
}

export default NavBar;