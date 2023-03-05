import { initializeApp } from "firebase/app";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
const firebaseConfig = {
    apiKey: "AIzaSyDkCYe0kfg4kRg5YXZvWh2LAJzYWpHXFnc",
    authDomain: "pembucket.firebaseapp.com",
    projectId: "pembucket",
    storageBucket: "pembucket.appspot.com",
    messagingSenderId: "570930789945",
    appId: "1:570930789945:web:6e68b5050899aab5e3d7e8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadFile(path, file) {
    const storageRef = ref(storage, path + v4())
    await uploadBytes(storageRef, file)
    const urlImage = await getDownloadURL(storageRef)
    return urlImage
}

export async function deleteImage(imageUrl) {
    
    const storageRef = ref(storage, `${imageUrl}`)
    deleteObject(storageRef).then(() => {
        // File deleted successfully
        console.log("joya")
    }).catch((error) => {
        console.log(error)
        // Uh-oh, an error occurred!
    });
}