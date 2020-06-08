import React, { useState, useMemo } from "react";
import { lowSame } from "lowpare";

type Actions = { [name: string]: string };

export default function StoreContext(initValue, actions: Actions) {
  const createDefaultValue = (propValues) => {
    const defaultValue = {
      ...propValues,
    };
    return defaultValue;
  };

  const [store, setStore] = useState(createDefaultValue(initValue));

  const update = (s, part, value) => {
    const c = { ...s };
    c[part] = value;
    return c;
  };

  function setterGenerator(partName: string) {
    function setter<T>(value: T) {
      setStore((store) =>
        lowSame<T>(store[partName], value)
          ? store
          : update(store, partName, value)
      );
    }

    return setter;
  }

  const setter = {};

  for (const key in actions) {
    if (actions.hasOwnProperty(key)) {
      const partName = actions[key];
      setter[key] = setterGenerator(partName);
    }
  }

  const setters = useMemo(setter, []);

  const Context = React.createContext(initValue, [store, setters]);

  return Context;
}
