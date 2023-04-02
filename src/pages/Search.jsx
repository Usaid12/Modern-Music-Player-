import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader,SongCard,Error } from '../components';
import { useGetSongsbySearchQuery } from '../redux/services/shazamCore';

const Search= () =>{
  const {searchTerm}=useParams()

    const{data,isFetching,error}=useGetSongsbySearchQuery(searchTerm);
    const{activeSong,isPlaying}=useSelector((state)=>state.player)
    const songs=data?.tracks?.hits?.map((song)=>song.track)

    if(isFetching) return <Loader title="Loading Top Charts"/> 
    if(error) return <Error/>


return( 
    <div className="flex flex-col" >
        <h2 className='font-bold text-3xl text-left mt-4 mb-10 text-white'>Showing the results of {searchTerm}
</h2>
        <div className=" flex flex-wrap sm:justify-start justify-center gap-8">
            {songs?.map((song,i)=>(
                <SongCard key={song.key} song={song} activeSong={activeSong} data={data} isPlaying={isPlaying} i={i}/>
            ))}
        </div>
    </div>

)}
export default Search;
