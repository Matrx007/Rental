import GlobalStore from 'react-native-global-state-hooks';

// ### Firebase authentication ###

// user
const userStore = new GlobalStore(null);
export const useUser = userStore.getHook();

// initializing
const initializingStore = new GlobalStore(true);
export const useInitializing = initializingStore.getHook();


export default {
    
    // Firebase authentication
    useUser: userStore.getHook(),
    useInitializing: initializingStore.getHook()
};