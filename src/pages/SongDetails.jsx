import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  
  const handlepauseclick = () => {
    dispatch(playPause(false));
  };

  const handleplayclick = (song,i) => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));
  };
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSong,
    error,
  } = useGetSongRelatedQuery({ songid });
  if (isFetchingSongDetails || isFetchingRelatedSong)
    return <Loader title="Searching Song Details" />;
  if(error)
  return <Error/>

  return (
    <div className="flex flex-col">
      <DetailsHeader songData={songData} artistId="" />
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mt-2">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p className="my-1 text-base text-gray-300">{line}</p>
            ))
          ) : (
            <p className="my-1 text-base text-gray-300">
              Sorry No lyrics found
            </p>
          )}
        </div>
      </div>
      <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} handlepauseclick={handlepauseclick} handleplayclick={handleplayclick}  />
    </div>
  );
};
export default SongDetails;
