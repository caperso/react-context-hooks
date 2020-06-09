import { lowSame } from "lowpare";
import React, { ProviderProps, useMemo, useState } from "react";

type ObjectProp<T> = { [name: string]: T };
type Actions = ObjectProp<string>;

function createStore(initValue: ObjectProp<any>, actions: Actions) {
  const [store, setStore] = useState(initValue);

  const setterNameGenerator = (name: string): string =>
    name.length >= 1
      ? `set${name[0].toUpperCase()}${name.substr(1, name.length)}`
      : name;

  function setterGenerator(partName: string) {
    function setter<T>(value: T) {
      setStore((store:any) =>
        lowSame<T>(store[partName], value)
          ? store
          : update(store, partName, value)
      );
    }
    return setter;
  }

  let setter: { [key: string]: any } = {};

  function update<T, U extends keyof T>(s: T, part: U, value: T[U]) {
    const c = { ...s };
    c[part] = value;
    return c;
  }

  for (const key in actions) {
    if (actions.hasOwnProperty(key)) {
      const partName = actions[key];
      setter[setterNameGenerator(key)] = setterGenerator(partName);
    }
  }

  const setters = useMemo(() => setter, [setter]);

  return [store, setters] as const;
}

// function useContext<T>(context: Context<T>/*, (not public API) observedBits?: number|boolean */): T;
/**
 *
 * @export
 * @template T
 * @param {ObjectProp<any>} initValue
 * @param {Actions} actions
 * @returns {*}
 */
export default function <T>(initValue: ObjectProp<any>, actions: Actions): any {
  let Context = React.createContext(initValue);
  const ContextWrap = () => {
    const content = React.useContext(Context);
    if (!content) {
      throw new Error("Please use hooks inside the specific Provider");
    }
    return content;
  };

  const Provider = (props: ProviderProps<T>) => (
    <Context.Provider value={createStore(initValue, actions)}>
      {props.children}
    </Context.Provider>
  );

  ContextWrap.Provider = Provider;
  return ContextWrap;
}
