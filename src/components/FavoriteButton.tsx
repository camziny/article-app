"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { toast } from "sonner";

const FavoriteButton = ({
  articleId,
  articleTitle,
  index,
}: {
  articleId: string;
  articleTitle: string;
  index: number;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(articleId));
  }, [articleId]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorites.includes(articleId)) {
      favorites = favorites.filter((id: any) => id !== articleId);
      setIsFavorite(false);
      toast(`${articleTitle} has been removed from your favorites`);
    } else {
      favorites.push(articleId);
      setIsFavorite(true);
      toast(`${articleTitle} has been added to your favorites`);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  useEffect(() => {}, [isFavorite, articleId]);

  return (
    <button
      onClick={toggleFavorite}
      className="p-2 rounded-full text-gray-500 hover:text-gray-700 transition-colors duration-200"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      data-test-id={`favorite-button-${index}`}
    >
      <FontAwesomeIcon
        icon={isFavorite ? solidStar : regularStar}
        className="text-2xl"
        aria-label={isFavorite ? "star" : "star-half"}
        data-test-id={`favorite-icon-${index}`}
        aria-hidden={false}
      />
    </button>
  );
};

export default FavoriteButton;
