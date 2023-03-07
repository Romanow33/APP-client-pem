import { initializeApp } from "firebase/app";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
const firebaseConfig = {
    apiKey: "AIzaSyBfmcqNDoj7eHx95P21nfSaIWr-lXDibAs",
    authDomain: "pem-project-e397a.firebaseapp.com",
    projectId: "pem-project-e397a",
    storageBucket: "pem-project-e397a.appspot.com",
    messagingSenderId: "1049131507807",
    appId: "1:1049131507807:web:bcfcb45825d23dbfa37bea",
    measurementId: "G-C93XKYK2LN"
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