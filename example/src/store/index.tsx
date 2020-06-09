import createContextHooks from "./storeContext";

const initValue = { user: { name: "", age: -1 }, companyName: "" };
const actions = { user: "user", companyName: "companyName" };

const useStoreContext = createContextHooks(initValue, actions);

export default useStoreContext;
