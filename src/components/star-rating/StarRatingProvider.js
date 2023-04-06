import { useCallback, useMemo } from "react";
import { UserAuth } from "../../context/AuthContext";
import StarRating from "./StarRating";

const StarRatingProvider = ({ update, book }) => {
  const { user } = UserAuth();

  const setRating = useCallback(
    (newValue) => {
      if (!user?.uid) {
        return;
      }
      const rating_v2 =
        typeof book?.rating_v2 === "object" ? { ...book?.rating_v2 } : {};
      rating_v2[user.uid] = newValue;
      update({ rating_v2 });
    },
    [book?.rating_v2, update, user?.uid]
  );

  const rating = useMemo(() => {
    if (typeof book?.rating_v2 !== "object") {
      console.log("typeof book.rating_v2 !==object");
      return 0;
    }
    const ratings = Object.values(book.rating_v2)
      .map((r) => parseFloat(r))
      .filter((r) => isFinite(r));
    if (ratings.length === 0) {
      return 0;
    }
    return ratings.reduce((a, b) => a + b) / ratings.length;
  }, [book?.rating_v2]);
  return (
    <StarRating
      rating={rating}
      setRating={setRating}
      disabled={update == null}
    />
  );
};

export default StarRatingProvider;
