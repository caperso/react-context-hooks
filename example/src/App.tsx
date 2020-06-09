import React from "react";
import useStoreContext from "./store";
import { User } from "./components/User";
import { Company } from "./components/Company";

function App() {
  return (
    <div className="App">
      <useStoreContext.Provider>
        <User></User>
        <Company></Company>
      </useStoreContext.Provider>
    </div>
  );
}

export default App;
