import GlobalStore from 'react-native-global-state-hooks';

// ### Firebase authentication ###

// user
const userStore = new GlobalStore(null);
const userDataStore = new GlobalStore(null);

// initializing
const initializingStore = new GlobalStore(true);
// export const useInitializing = initializingStore.getHook();

// loading
const loadingStore = new GlobalStore(0);
// export const useLoading = loadingStore.getHook();

// properties
const propertiesStore = new GlobalStore(null);

// language
export const LANG_EN = require('./lang/en/map.json');
export const LANG_ET = require('./lang/et/map.json');

const langStore = new GlobalStore(LANG_ET);
// export const useLang = langStore.getHook();


export default {
    
    // Firebase authentication
    useUser: userStore.getHook(),
    useUserData: userDataStore.getHook(),
    useInitializing: initializingStore.getHook(),
    useLoading: loadingStore.getHook(),
    
    // data
    useProperties: propertiesStore.getHook(),
    
    // Localization
    LANG_EN: LANG_EN,
    LANG_ET: LANG_ET, 
    useLang: langStore.getHook()
};