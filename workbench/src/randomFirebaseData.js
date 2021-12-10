import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-A_bo_2VLUhi9T92Fl3asfnJ63NTU6TM",
  authDomain: "business-6ca8e.firebaseapp.com",
  databaseURL: "https://business-6ca8e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "business-6ca8e",
  storageBucket: "business-6ca8e.appspot.com",
  messagingSenderId: "536830929484",
  appId: "1:536830929484:web:ef14aed182fdf671f2a2e9",
  measurementId: "G-D6P3LX8H9V"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

const querySnapshot = await getDocs(collection(db, "properties"));
querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`);
});