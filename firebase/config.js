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
    const storageRef = ref(storage, path)
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

export async function getImgToDowload(imageUrl){
    const storageRef = ref(storage, `${imageUrl}`)
    let resUrl = ""
    await getDownloadURL(storageRef)
    .then((url) => {
        resUrl = url   
    })
    .catch((error) => {
     // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
  return resUrl
}

export function getFileName(imageUrl) {
  const storageRef = ref(storage, `${imageUrl}`)
  const imageName = storageRef.name
  return imageName  
  
}