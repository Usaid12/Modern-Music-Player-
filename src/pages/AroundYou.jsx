import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Loader,SongCard,Error } from '../components';
import { useGetSongsbyCountryQuery } from '../redux/services/shazamCore';
const AroundYou = () =>{
    const[country,setCountry]=useState("")
    const[loading,setLoading]=useState(true)
    const{data,isFetching,error}=useGetSongsbyCountryQuery();
    const{activeSong,isPlaying}=useSelector((state)=>state.player)
    useEffect(()=>{
        axios.get("https://geo.ipify.org/api/v2/country?apiKey=at_ERfxIlGehbnvH7EQDCHSPMGHt1vUE").then((res)=>setCountry("FR")).catch((err)=>
        console.log(err)
        ).finally(()=>setLoading(false))
        
        console.log(country)
    },[country])
    if(isFetching && loading ) return <Loader title="Loading Songs around you"/> 
    if(error && country) return <Error/>


return( 
    <div className="flex flex-col" >
        <h2 className='font-bold text-3xl text-left mt-4 mb-10 text-white'>Around You
        <span className='font-black'> {country}</span></h2>
        <div className=" flex flex-wrap sm:justify-start justify-center gap-8">
            {data?.map((song,i)=>(
                <SongCard key={song.key} song={song} activeSong={activeSong} data={data} isPlaying={isPlaying} i={i}/>
            ))}
        </div>
    </div>

)}
export default AroundYou;
