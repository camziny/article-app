"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const FavoriteButton = ({ articleId }: { articleId: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(articleId));
  }, [articleId]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorites.includes(articleId)) {
      favorites = favorites.filter((id: string) => id !== articleId);
      setIsFavorite(false);
    } else {
      favorites.push(articleId);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <button
      onClick={toggleFavorite}
      className="p-2 rounded-full text-gray-500 hover:text-gray-700 transition-colors duration-200"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <FontAwesomeIcon
        icon={isFavorite ? solidStar : regularStar}
        className="text-2xl"
      />
    </button>
  );
};

export default FavoriteButton;
