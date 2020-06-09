declare type ObjectProp<T> = {
    [name: string]: T;
};
declare type Actions = ObjectProp<string>;
/**
 * Generate a React.Context object with it's valueHook (simply a store and a setter) to manage state in this context
 * @export
 * @template T
 * @param {ObjectProp<any>} initValue
 * @param {Actions} actions
 * @returns {*}
 */
export default function <T>(initValue: ObjectProp<any>, actions: Actions): any;
export {};
