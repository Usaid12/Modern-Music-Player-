import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id:artistId } = useParams();
  
  const { data: artistData, isFetching: isFetchingArtistDetails,error } =
    useGetArtistDetailsQuery( artistId );


  if (isFetchingArtistDetails)
    return <Loader title="Loading Artist Details" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistData={artistData} artistId={artistId} />
      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};
export default ArtistDetails;
