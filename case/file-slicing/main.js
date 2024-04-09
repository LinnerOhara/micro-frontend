import {cutFile} from "./cutFile.js";

const uploadFile = document.querySelector('#uploadFile');

uploadFile.onchange = async (e) => {
    const file = e.target.files[0];
    console.time("cutFile")
    const chunks = await cutFile(file)
    console.timeEnd("cutFile")
    console.log(chunks)
}