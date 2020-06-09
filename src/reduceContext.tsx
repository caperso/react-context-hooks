import React, { useReducer } from "react";


// https://juejin.im/post/5d5501cd6fb9a06aee362a9d#heading-4
//useReducer
interface ProviderProps<T> {
  initState: T;
}

interface ContextProps {
  state: null | { [propName: string]: any };
  dispatch: any;
}

function createContext() {
  const Context = React.createContext<ContextProps>({
    state: null,
    dispatch: null,
  });

  const reducer = () => {};

  function Provider(props: ProviderProps<any>) {
    // const initState =
    const { initState } = props;

    const [state, dispatch] = useReducer(reducer, initState);

    return <Context.Provider value={{ state, dispatch }}></Context.Provider>;
  }
}
