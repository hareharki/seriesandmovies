import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import {AiFillPlaySquare, AiOutlineClose } from 'react-icons/ai';
import '../styles/Videos.css';
import  NoImage from './NoImage.jpg';
import { Container } from "./NavBar";
import TrailerMovies from "../trailers/TrailerMovies";


function Movies () {

    const {toggle, inputValue} = useContext(Container);
    const input= inputValue;
    const[moviesData, setMoviesData]= useState([]);
    const [trailer, setTrailer] = useState(true);
    const [movieTitle, setMovieTitle] = useState('');
    const Shown = input ? 'search' : 'discover';
    const Api = `https://api.themoviedb.org/3/${Shown}/movie`;
    const Images = 'https://image.tmdb.org/t/p/w500';

    const MovieCall = async()=> {
        const data = await axios.get(Api,{
            params: {
                api_key:'a1060092cce28869b3d4eea80511825f' ,
                query: input
            }   
            
            })
           const results = data.data.results
           setMoviesData(results)
          
    }

    useEffect(() =>{
        setTimeout(() => {
        MovieCall()},50)
    }, [input]); 
        
    
    console.log(moviesData);

    const MoviesTitle = (movie) => {
        setMovieTitle(movie.title)
        setTrailer(!trailer)
       }  
    
    return(
        <Fragment>
            <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'} >
                <div className="movies-container">
        {moviesData.map((movie)=> {
            return(
              <Fragment key={movie.id} >
                <div id={trailer ? 'container' : 'NoContainer'}>
                 <AiFillPlaySquare color='white' fontSize={35} id={trailer ? 'playIcon' :  'hide'} onClick={() => MoviesTitle(movie)} />
                 <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImage} alt='' onClick={() => MoviesTitle(movie)} />
                 <h3 id={movie.title.length > 28 ? 'smaller-Text' : ''} className={toggle ? 'mainColor' : 'secondaryColor'}>{movie.title}</h3>
                </div>
              </Fragment>  
            )
        })}
        {trailer ? console.log : <TrailerMovies moviesTitle={movieTitle} />} 
        <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={50} color="yellow" cursor={'pointer'}  onClick={() => {setTrailer(true)}} />
        </div>
        </div>
        </Fragment>
        )
}

export default Movies;