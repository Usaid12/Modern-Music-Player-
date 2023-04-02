import { Link } from "react-router-dom";




const DetailsHeader = ({songData,artistId,artistData}) => {
  const artist=artistData?.artists[artistId]?.attributes
  return(
  <div className="flex flex-col w-full relative ">
    <div className="bg-gradient-to-l from-transparent to-black sm:h-48 h-28"/>
    <div className="inset-0 items-center absolute flex">
      <img src={artistId? artist?.artwork?.url.replace("{w}","500").replace("{h}","500"):songData?.images?.coverart} alt="art" 
      className="sm:w-48 w-28 sm:h-48 h-28 rounded-full shadow-xl object-cover border-2 shadow-black"/>
<div className="ml-5">
<p className=" text-white font-bod sm:text-3xl text-xl">{artistId? artist.name:songData?.title}</p>
{!artistId && (
  <Link to={`/artist/${songData?.artists[0].adamid}`}><p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p></Link>
)}
<p className=" text-gray-400 mt-2 ">{artistId? artist?.genreNames[0]:songData?.genres?.primary}</p>
</div>
    </div>
<div className="w-full sm:h-4 h-24"/>


  </div>
)}

export default DetailsHeader;
