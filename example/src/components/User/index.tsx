import React from "react";
import useStoreContext from "../../store";

export const User = () => {
  const [store, setters] = useStoreContext();

  console.log(setters);
  setters.setCompanyName('wwwwww')
  

  return <div>user here</div>;
};
