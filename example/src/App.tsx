import React from "react";
import { Company } from "./components/Company";
import { User } from "./components/User";
import useStoreContext from "./store";

function App() {
  return (
    <div className="App">
      <useStoreContext.Provider>
        <div>
          <User></User>
          <Company></Company>
        </div>
      </useStoreContext.Provider>
    </div>
  );
}

export default App;
