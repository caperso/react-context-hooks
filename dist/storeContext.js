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
/**
 * createStoreAndSetters Create single store and the setters object;
 * @param {ObjectProp<any>} initValue Initial value object like {user:{id:1,name:'Sam'},tag:"foo"}
 * @param {Actions} actions actions {actionName: targetPropName} like {setTag:'tag',setFoo:12}
 * @returns {[ObjectProp,ObjectProp]} [store, setters]
 */
function createStoreAndSetters(initValue, actions) {
    var _a = useState(initValue), store = _a[0], setStore = _a[1];
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
            setter[key] = setterGenerator(partName);
        }
    }
    var setters = useMemo(function () { return setter; }, [setter]);
    return [store, setters];
}
/**
 * Generate a React.Context object with it's valueHook (simply a store and a setter) to manage state in this context
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
    var Provider = function (props) { return (React.createElement(Context.Provider, { value: createStoreAndSetters(initValue, actions) }, props.children)); };
    ContextWrap.Provider = Provider;
    return ContextWrap;
}
