import { lowSame } from "lowpare";
import React, { ProviderProps, useMemo, useState } from "react";

type ObjectProp<T> = { [name: string]: T };
type Actions = ObjectProp<string>;

/**
 * createStoreAndSetters Create single store and the setters object;
 * @param {ObjectProp<any>} initValue Initial value object like {user:{id:1,name:'Sam'},tag:"foo"}
 * @param {Actions} actions actions {actionName: targetPropName} like {setTag:'tag',setFoo:12}
 * @returns {[ObjectProp,ObjectProp]} [store, setters]
 */
function createStoreAndSetters(initValue: ObjectProp<any>, actions: Actions) {
  const [store, setStore] = useState(initValue);

  function setterGenerator(partName: string) {
    function setter<T>(value: T) {
      setStore((store: ObjectProp<any>) =>
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
      setter[key] = setterGenerator(partName);
    }
  }

  const setters = useMemo(() => setter, [setter]);

  return [store, setters] as const;
}

/**
 * Generate a React.Context object with it's valueHook (simply a store and a setter) to manage state in this context
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
    <Context.Provider value={createStoreAndSetters(initValue, actions)}>
      {props.children}
    </Context.Provider>
  );

  ContextWrap.Provider = Provider;
  return ContextWrap;
}

