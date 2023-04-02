import {FaPauseCircle,FaPlayCircle} from "react-icons/fa"

const PlayPause = ({isPlaying,handlepause,handleplay,activeSong,song}) => (
 (isPlaying && activeSong?.title===song.title?(
  <FaPauseCircle  size={35} className="text-gray-300" onClick={handlepause}/>):(<FaPlayCircle size={35} className="text-gray-300" onClick={handleplay}/>)
 )
);

export default PlayPause;
