import React from "react";
import useStoreContext from "../../store";

export const User = () => {
  const [,setters] = useStoreContext();

  console.log(setters);

  return <div onClick={() => setters.setCompanyName("wwwwww")}>click here</div>;
};
