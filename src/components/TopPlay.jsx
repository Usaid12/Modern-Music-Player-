import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import "swiper/css";
import "swiper/css/free-mode";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { TopCharts } from "../pages";

const TopChartCard = ({ song, i ,isPlaying,activeSong,handlepauseclick,handleplayclick}) => {
  

  return (
    <div className="flex flex-row w-full items-center hover:bg-[#4c426e] py-2 rounded-lg cursor-pointer mb-2">
      <h3 className="text-white font-bold">{i+1}.</h3>
      <div className="flex flex-1 flex-row justify-between items-center">
        <img src={song?.images?.coverart} alt={song.title}  className="w-20 h-20 rounded-lg ml-4"/>
        <div className="flex flex-1 flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="font-bold text-white text-lg">{song.title}</p>
          </Link>
          <Link to={`/artists/${song?.artists[0].adamid}`}>
            <p className=" opacity-60 text-white text-base">{song.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause handlepause={handlepauseclick} handleplay={handleplayclick} song={song} isPlaying={isPlaying} activeSong={activeSong} />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const topPlays = data?.slice(0, 5)

  const handlepauseclick = () => {
    dispatch(playPause(false));
  };

  const handleplayclick = (song,i) => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));
  };
  return (
    <>
      <div
        ref={divRef}
        className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex-flex-col "
      >
        <div className="w-full flex flex-col ">
          <div className="flex flex-row justify-between items-center ">
            <h2 className="text-white font-bold text-2xl">Top Charts</h2>
            <Link to="/top-charts">
              <p className="text-gray-300 text-base  cursor-pointer mr-2">
                See More
              </p>
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-1 ">
            {topPlays?.map((song, i) => (
              <TopChartCard song={song} i={i} key={song.key} isPlaying={isPlaying} activeSong={activeSong} handlepauseclick={handlepauseclick} handleplayclick={()=>handleplayclick(song,i) }/>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col mt-8">
          <div className="flex flex-row justify-between items-center ">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base cursor-pointer mr-2">
                See More
              </p>
            </Link>
          </div>
          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
          >
            {topPlays?.map((song, i) => (
              <SwiperSlide
                key={song?.key}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img src={song?.images.background} alt="img" className="rounded-full object-cover w-full" />
                </Link> 
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TopPlay;
