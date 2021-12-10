import GlobalStore from 'react-native-global-state-hooks';

// ### Firebase authentication ###

// user
const userStore = new GlobalStore(null);
export const useUser = userStore.getHook();

// initializing
const initializingStore = new GlobalStore(true);
export const useInitializing = initializingStore.getHook();

// language
export const LANG_EN = require('./lang/en/map.json');
export const LANG_ET = require('./lang/et/map.json');

const langStore = new GlobalStore(LANG_ET);
export const useLang = langStore.getHook();


export default {
    
    // Firebase authentication
    useUser: userStore.getHook(),
    useInitializing: initializingStore.getHook(),

    // Localization
    LANG_EN: LANG_EN,
    LANG_ET: LANG_ET, 
    useLang: langStore.getHook()
};