import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import {AiFillPlaySquare, AiOutlineClose } from 'react-icons/ai';
import '../styles/Videos.css';
import  NoImage from './NoImage.jpg';
import { Container } from "./NavBar";
import TrailerTrends from "../trailers/TrailerTrends";

function Trends(){

    const {toggle, inputValue} = useContext(Container);
    const input= inputValue;
    const [trendArray, setTrendArray] = useState([]);
    const [trailer, setTrailer] = useState(true);
    const [trendTitle, setTrendTitle] = useState('');
    const Api = 'https://api.themoviedb.org/3';
    const TrendsShown = '/trending/all/week' ;
    const Images = 'https://image.tmdb.org/t/p/w500';

    const Trends = async()=> {
        const data = await axios.get(`${Api}${TrendsShown}`,{
            params: {
                api_key:'a1060092cce28869b3d4eea80511825f' ,
                query : input
            }   
            
            })
           const results = (data.data.results)
           setTrendArray(results)
          
    }

    useEffect(() =>{
        setTimeout(() => {
        Trends()} , 50)
    }, [input])
        
    
    console.log(trendArray);

    const TrendTitle = (trend) => {
        setTrendTitle(trend.title)
        setTrailer(!trailer)
       }  

    return(
        <Fragment>
        <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'} >
            <div className=" movies-container">
    {trendArray.map((trend)=> {
        return(
          <Fragment key={trend.id} >
            <div id={trailer ? 'container' : 'NoContainer'}>
             <AiFillPlaySquare color='white' fontSize={35} id={trailer ? 'playIcon' :  'hide'} onClick={() => TrendTitle(trend)} />
             <img src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImage} alt='' onClick={() => TrendTitle(trend)} />
             <h3 id='smaller-Text'  className={toggle ? 'mainColor' : 'secondaryColor'}>{trend.title}</h3>
            </div>
          </Fragment>  
        )
    })}
    {trailer ? console.log : <TrailerTrends TrendTitle={trendTitle}/>} 
    <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={50} color="yellow" cursor={'pointer'}  onClick={() => {setTrailer(true)}} />
    </div>
    </div>
    </Fragment>
        )
}

export default Trends;