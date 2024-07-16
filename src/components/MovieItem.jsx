import React, { useState } from "react";
import { createImgUrl } from "../services/movieService";
import { Heart } from "lucide-react"; // Assuming Heart is the outline version
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
const MovieItem = ({ movie }) => {
  const { title, backdrop_path, poster_path } = movie;
  const [like, setLike] = useState(false);
  const {user} = UserAuth()
  const handleLikeToggle = async () => {
    const userEmail = user?.email;
    if (userEmail) {
      //getting particular documnet
      const userDoc = doc(db, "users", userEmail);
      setLike(!like);
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movie }),
      });
    } else {
      toast.error('Please login', {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
      <img
        className="w-full h-40 block object-cover"
        src={createImgUrl(backdrop_path ?? poster_path, "w500")}
        alt={title}
      />
      <div className="w-full items-center absolute top-0 left-0 h-40 bg-black/80 opacity-0 hover:opacity-100 ">
        <p className="text-xs md:text-sm flex items-center h-full justify-center">
          {title}
        </p>
        {like ? (
          <Heart
            size={30}
            className="absolute top-2 left-2 cursor-pointer text-red-500"
            onClick={handleLikeToggle}
            fill="currentColor"
          />
        ) : (
          <Heart
            size={30}
            className="absolute top-2 left-2 cursor-pointer text-white"
            onClick={handleLikeToggle}
          />
        )}
      </div>
    </div>
  );
};

export default MovieItem;
