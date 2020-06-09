var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { lowSame } from "lowpare";
import React, { useMemo, useState } from "react";
function createStore(initValue, actions) {
    var _a = useState(initValue), store = _a[0], setStore = _a[1];
    var setterNameGenerator = function (name) {
        return name.length >= 1
            ? "set" + name[0].toUpperCase() + name.substr(1, name.length)
            : name;
    };
    function setterGenerator(partName) {
        function setter(value) {
            setStore(function (store) {
                return lowSame(store[partName], value)
                    ? store
                    : update(store, partName, value);
            });
        }
        return setter;
    }
    var setter = {};
    function update(s, part, value) {
        var c = __assign({}, s);
        c[part] = value;
        return c;
    }
    for (var key in actions) {
        if (actions.hasOwnProperty(key)) {
            var partName = actions[key];
            setter[setterNameGenerator(key)] = setterGenerator(partName);
        }
    }
    var setters = useMemo(function () { return setter; }, [setter]);
    return [store, setters];
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
export default function (initValue, actions) {
    var Context = React.createContext(initValue);
    var ContextWrap = function () {
        var content = React.useContext(Context);
        if (!content) {
            throw new Error("Please use hooks inside the specific Provider");
        }
        return content;
    };
    var Provider = function (props) { return (React.createElement(Context.Provider, { value: createStore(initValue, actions) }, props.children)); };
    ContextWrap.Provider = Provider;
    return ContextWrap;
}
