import React from 'react';
import { useSelector } from 'react-redux';
import { Loader,SongCard,Error } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts= () =>{

    const{data,isFetching,error}=useGetTopChartsQuery();
    const{activeSong,isPlaying}=useSelector((state)=>state.player)

    if(isFetching && loading ) return <Loader title="Loading Top Charts"/> 
    if(error) return <Error/>


return( 
    <div className="flex flex-col" >
        <h2 className='font-bold text-3xl text-left mt-4 mb-10 text-white'>Discover Top Charts
</h2>
        <div className=" flex flex-wrap sm:justify-start justify-center gap-8">
            {data?.map((song,i)=>(
                <SongCard key={song.key} song={song} activeSong={activeSong} data={data} isPlaying={isPlaying} i={i}/>
            ))}
        </div>
    </div>

)}
export default TopCharts;
