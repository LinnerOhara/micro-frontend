import SparkMD5 from 'https://unpkg.com/crypto.web.js@1.0.0/dist/md5.js'

export function createChunk(file, index, chunkSize) {
    return new Promise((resolve, reject) => {
        const start = index * chunkSize;
        const end = start + chunkSize;
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        const blob = file.slice(start, end)
        fileReader.onload = e => {
            spark.append(e.target.result)
            resolve({
                start,
                end,
                index,
                hash: spark.end(),
                blob
            })
        }
        fileReader.readAsArrayBuffer(blob)
    })
}