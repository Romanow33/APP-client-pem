import JSZip from "jszip";
import { getFileName, getImgToDowload } from "../firebase/config";
import { saveAs } from "file-saver";
export const saveZip = (filename, urls) => {
    if(!urls) return;

    const zip = new JSZip();
    const folder = zip.folder(filename); // folder name where all files will be placed in 

    urls.forEach(async (url) => {
        const blobPromise = getImgToDowload(url).then(async (r) => {
            const response = await fetch(r);
            return await response.blob();
        });
        const imageName = getFileName(url)
        folder.file(imageName, blobPromise);
    });

    zip.generateAsync({ type: "blob" }).then((blob) => saveAs(blob, filename));

};

export default saveZip