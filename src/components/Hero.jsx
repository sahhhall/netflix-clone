import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints, { createImgUrl } from "../services/movieService";

const Hero = () => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    axios.get(endpoints.popular).then((response) => {
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);
    });
  }, []);
  const truncate = (str, length) => {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + "..." : str;
  };
  if (!movie) {
    return (
      <>
        <p>fetching moviee..</p>
      </>
    );
  }
  console.log(movie,"moviedetails")
  const { title, backdrop_path, release_date, overview } = movie;
  return (
    <div className=" w-full h-[550px] lg:h[850px]">
      <div className="w-full h-full">
        <div className="absolute w-full  h-[550px] lg:h[850px] bg-gradient-to-t  from-black " />
          <img
            className="w-full h-full object-cover object-top "
            src={createImgUrl(backdrop_path, 'original')}
            alt={title}
          />
          <div className="absolute w-full top-[20%] lg:top-[35%] md:p-8 p-4 ">
            <h1 className="text-3xl md:text-6xl font-nsans-bold">{title}</h1>
            <div className="mt-8 mb-4">
              <button className=" font-nsans-bold rounded-md tracking-widest capitalize border border-gray-300 py-2 px-6 bg-white text-black">
                play
              </button>
              <button className=" font-nsans-bold rounded-md capitalize border border-gray-300 py-2 px-3 ml-4">
                watch later
              </button>
            </div>
            <p className="text-gray-400 text-sm">{release_date}</p>
          <p className="w-full mt-2 text-xs md:max-w-[70%] lg:max-w-[50%] tracking-widest xl:max-w-[35%] text-gray-400">{truncate(overview,165)}</p>
          </div>
          
       
      </div>
    </div>
  );
};

export default Hero;
