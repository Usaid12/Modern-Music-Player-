import {loader} from "../assets"

const Loader = ({title}) => (
  <div className="flex w-full justify-center items-center flex-col"><img src={loader} alt="" className="w-32 h-32 object-contain"/>
  <h1 className="text-white mt-2 text-2xl font-bold">{title || "Loading..."}</h1>
  </div>
);

export default Loader;
