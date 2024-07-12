import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
const Movierow = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null);
  useEffect(() => {
    axios.get(url).then((res) => {
      setMovies(res.data.results);
    });
  }, [url]);

  const slide = (direction) => {
    const { current } = sliderRef;
    if (current) {
      const scrollAmount = direction === "left" ? -900 : 900;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  
  return (
    <>
      <h2 className=" font-nsans-bold md:text-xl p-3  capitalize ">{title}</h2>
      <div className=" relative flex items-center group">
        <ChevronLeft
           onClick={() => slide('left')}
          size={50}
          className="absolute cursor-pointer z-10 hidden group-hover:block "
        />
        <div
          id={`slider`}
          ref={sliderRef}
          className="w-full h-full  no-scrollbar overflow-x-scroll overflow-hidden whitespace-nowrap scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRight
          onClick={() => slide('right')}
          size={50}
          className="right-1 cursor-pointer absolute z-10 hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default Movierow;
