import React from "react";

import { getDoc, updateDoc } from "firebase/firestore";
import { bookDoc } from "../firebase/firebase";

export function useBookLoadable(bookId) {
  const [book, setBook] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [error, setError] = React.useState(undefined);

  const refresh = React.useCallback(async () => {
    if (bookId == null) {
      return;
    }
    try {
      setIsLoading(true);
      const docSnap = await getDoc(bookDoc(bookId));
      const data = docSnap.data();
      setBook(data);
    } catch (e) {
      setError(`${e}`);
      console.warn("getDoc exception", e);
    } finally {
      setIsLoading(false);
    }
  }, [bookId]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  const update = React.useCallback(async (partial) => {
    try {
        setIsUpdating(true)
        await updateDoc(bookDoc(bookId), partial)
    }catch(e) {
        setError(`${e}`);
        console.warn("update document exception", e);
    } finally {
        refresh()
        setIsUpdating(false)
    }
  }, [bookId, refresh])

  return {
    book,
    isLoading,
    error,
    refresh,
    update,
    isUpdating
  };
}
