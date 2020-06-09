declare type ObjectProp<T> = {
    [name: string]: T;
};
declare type Actions = ObjectProp<string>;
/**
 *
 * @export
 * @template T
 * @param {ObjectProp<any>} initValue
 * @param {Actions} actions
 * @returns {*}
 */
export default function <T>(initValue: ObjectProp<any>, actions: Actions): any;
export {};
