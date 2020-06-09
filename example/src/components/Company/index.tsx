import React from "react";
import useStoreContext from "../../store";

export const Company = () => {
  const [store, setters] = useStoreContext();

  console.log(store,setters);

return <div>company here: {store.companyName}</div>;
};
