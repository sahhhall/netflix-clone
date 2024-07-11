import React, { useState,useEffect } from "react";
import axios from 'axios';
import MovieItem from "./MovieItem";
const Movierow = ({ title, url }) => {
  const [movies, setMovies] = useState([]);

  useEffect(()=> {
    axios.get(url).then((res)=> {
        setMovies(res.data.results)
    })
  },[url])
  console.log(movies)
  return (
    <>
      <h2 className=" font-nsans-bold md:text-xl p-3  capitalize ">{title}</h2>
      <div className=" relative flex items-center">
            <div  id={'slider'} className="w-full h-full no-scrollbar overflow-x-scroll overflow-hidden whitespace-nowrap scroll-smooth" >
                    {movies.map((movie)=>(
                        <MovieItem key={movie.id} movie={movie} />
                    ))}
            </div>
      </div>
    </>
  );
};

export default Movierow;
