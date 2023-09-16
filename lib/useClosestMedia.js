import { useState, useEffect } from "react";

export const useClosestMedia = (queries) => {
  const [closest, setClosest] = useState("sm");

  useEffect(() => {
    const listener = () => {
      setClosest(findClosest(queries));
    };
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener); //Cleanup
  }, []);

  return closest;
};

function findClosest(queries) {
  for (let i = queries.length - 1; i >= 0; i--) {
    if (isMatch(queries[i].value)) {
      return queries[i].name;
    }
  }
  return;
}

function isMatch(media) {
  const query = `(min-width: ${media})`;
  return window.matchMedia(query).matches;
}
