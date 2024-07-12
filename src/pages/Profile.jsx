import React, { useState, useEffect, useRef } from "react";
import img from "../assets/signup.jpg";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImgUrl } from "../services/movieService";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const sliderRef = useRef(null);
  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows);
      });
    }
  }, [user?.email]);
  const slide = (direction) => {
    const { current } = sliderRef;
    if (current) {
      const scrollAmount = direction === "left" ? -900 : 900;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <>
      <div>
        <img
          className="   block-full w-full h-[400px] object-cover"
          src={img}
          alt="img"
        />
      </div>
      <div className=" bg-black/90 fixed top-0 left-0 w-full h-[400px] " />
      <div className=" absolute top-[20%] p-4 md:p-8">
        <h1 className="text-gray-200 tracking-widest text-sm" >my shows</h1>
        <p className="text-gray-200 tracking-widest text-sm">{user.email}</p>
      </div>
      <h2 className=" font-nsans-bold md:text-xl p-3  capitalize ">fav</h2>
      <div className=" relative flex items-center group ">
        <ChevronLeft
          onClick={() => slide("left")}
          size={50}
          className="absolute cursor-pointer z-10 hidden group-hover:block "
        />
        <div
          id={`slider`}
          ref={sliderRef}
          className="w-full h-full  no-scrollbar overflow-x-scroll overflow-hidden whitespace-nowrap scroll-smooth"
        >
          {movies.map(({id, backdrop_path, title, poster_path}) => (
            <div
              key={id}
              className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
            >
              <img
                className="w-full h-40 block object-cover"
                src={createImgUrl(backdrop_path ?? poster_path, "w500")}
                alt={title}
              />
              <div className="w-full items-center absolute top-0 left-0 h-40 bg-black/80 opacity-0 hover:opacity-100 ">
                <p className="text-xs md:text-sm flex items-center h-full justify-center">
                  {title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <ChevronRight
          onClick={() => slide("right")}
          size={50}
          className="right-1 cursor-pointer absolute z-10 hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default Profile;
