import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Global from './Global';

export const Firestore = firestore();
export const Auth = auth();

export function signUp(email, password, firstname, lastname, callback) {
    
    Auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        Firestore.collection('users').doc(userCredential.user.uid).set({ firstname, lastname })
            .then(callback) 
            .catch(error => {
                console.error(error);
            });
    })
    .catch(error => {
        console.error(error);
    });
}

export function logIn(email, password, callback) {
    
    Auth
    .signInWithEmailAndPassword(email, password)
    .then(callback)
    .catch(error => {
        console.error(error);
    });
}

export function skipLogIn(callback) {
    
    Auth
    .signInAnonymously()
    .then(callback)
    .catch(error => {
        console.error(error);
    });
}

export function getRandomProperties(callback) {
    Firestore.collection('properties').limit(5).get().then(querySnapshot => {
        callback(querySnapshot.docs);
    });
}

export async function onUserLogIn(user) {
    if(!user || !user.uid) return null;
    return (await Firestore.collection('users').doc(user.uid).get()).data();
}

export async function getProperties() { 
    return new Promise((resolve, reject) => {
        Firestore
            .collection('properties')
            .get()
            .then(async querySnapshot => {
                let properties = {};
                for(let documentSnapshot of querySnapshot.docs) {
                    const data = documentSnapshot.data();
                    
                    const contactData = (await Firestore
                            .collection('lessors')
                            .doc(data["lessor"].id)
                            .get())
                        .data();

                    properties[documentSnapshot.id] = await deepGet(data);
                    properties[documentSnapshot.id]["contact"] = contactData;
                }

                resolve(properties);
            });
    });
}

export async function searchProperties(searchParams) { 
    let properties = await getProperties();
    
    // Quick filters
    properties = Object.keys(properties)
        .reduce((o, property) => {
            let mismatch = Object.keys(searchParams.quickFilters).some(quickFilter => {
                if(searchParams.quickFilters[quickFilter].rangeStart) {
                    let rangeStart = parseInt(searchParams.quickFilters[quickFilter].rangeStart);
                    if(properties[property][quickFilter] < rangeStart) return true;
                }

                if(searchParams.quickFilters[quickFilter].rangeEnd) {
                    let rangeEnd = parseInt(searchParams.quickFilters[quickFilter].rangeEnd);
                    if(properties[property][quickFilter] > rangeEnd) return true;
                }

                return false;
            });
            
            if(mismatch) return o;
            else return Object.assign(o, {[property]: properties[property]});
        }, {}
    );

    // Category filters
    properties = Object.keys(properties)
        .reduce((o, property) => {
            let mismatch = Object.keys(searchParams.filters)
                .some(category => !searchParams.filters[category]
                    .every(val => properties[property][category]
                        .includes(val)));
            
            if(mismatch) return o;
            else return Object.assign(o, {[property]: properties[property]});
        }, {}
    );

    return properties;
}

export async function deepGet(data) {
    // let data = documentSnapshot.data();
    for(let field in data) {
        if(data[field].constructor.name == 'FirestoreDocumentReference')
            data[field] = await deepGet((await data[field].get()).data());
    }
    return data; 
}

export function signOut(callback) {
    
    Auth
    .signOut(auth)
    .then(callback)
    .catch((error) => {
        // An error happened.
    });
}