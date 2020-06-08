import React, { useRef } from "react";
import storeContext from "../../index";

const initValue = { user: { name: "", age: -1 }, companyName: "" };
const actions = {user:'user',companyName:'company'}


function App() {
  const Context = storeContext(initValue,actions);

  const context = useRef()
  console.log(context.current);
  

  return <div className="App">
    <Context.Provider ref={context}>
      
    </Context.Provider>

  </div>;
}

export default App;
