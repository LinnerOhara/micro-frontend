function stringToBytes(str: string) {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

function uint32ToBytes(num: number) {
  return new Uint8Array([
    num & 0xff,
    (num >> 8) & 0xff,
    (num >> 16) & 0xff,
    (num >> 24) & 0xff
  ]);
}

const table = (() => {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  return crcTable;
})()

function crc32(array: Uint8Array) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < array.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ array[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function createLocalFileHeader(fileName: string, fileData: Uint8Array, crc: number) {
  const header = new Uint8Array(30 + fileName.length);
  header.set(stringToBytes('PK\x03\x04'), 0); // Local file header signature
  header.set([20, 0, 0, 0, 0, 0], 4); // Version, flags, compression method
  header.set(uint32ToBytes(crc), 14); // CRC-32
  header.set(uint32ToBytes(fileData.byteLength), 18); // Compressed size
  header.set(uint32ToBytes(fileData.byteLength), 22); // Uncompressed size
  header.set([fileName.length & 0xff, (fileName.length >> 8) & 0xff], 26); // File name length
  header.set(stringToBytes(fileName), 30); // File name
  return header;
}


function createCentralDirectoryHeader(fileName: string, fileData: Uint8Array, crc: number, offset: number) {
  const header = new Uint8Array(46 + fileName.length);
  header.set(stringToBytes('PK\x01\x02'), 0); // Central directory header signature
  header.set([20, 0, 20, 0, 0, 0, 0, 0], 4); // Version made by, version needed, flags, compression method
  header.set(uint32ToBytes(crc), 16); // CRC-32
  header.set(uint32ToBytes(fileData.byteLength), 20); // Compressed size
  header.set(uint32ToBytes(fileData.byteLength), 24); // Uncompressed size
  header.set([fileName.length & 0xff, (fileName.length >> 8) & 0xff], 28); // File name length
  header.set([0, 0, 0, 0, 0, 0, 0, 0], 30); // Extra field length, comment length, disk number, attributes
  header.set(uint32ToBytes(offset), 42); // Offset of local header
  header.set(stringToBytes(fileName), 46); // File name
  return header;
}

function createEndOfCentralDirectory(numberOfFiles: number, centralDirectorySize: number, centralDirectoryOffset: number) {
  const header = new Uint8Array(22);
  header.set(stringToBytes('PK\x05\x06'), 0); // End of central directory signature
  header.set([0, 0, 0, 0], 4); // Number of this disk, number of disk with central directory
  header.set([numberOfFiles & 0xff, (numberOfFiles >> 8) & 0xff], 8); // Number of central directory records on this disk
  header.set([numberOfFiles & 0xff, (numberOfFiles >> 8) & 0xff], 10); // Total number of central directory records
  header.set(uint32ToBytes(centralDirectorySize), 12); // Size of central directory
  header.set(uint32ToBytes(centralDirectoryOffset), 16); // Offset of start of central directory
  header.set([0, 0], 20); // ZIP file comment length
  return header;
}

async function runPromisesSequentially ( promises: (() => Promise<unknown>)[]) {
  for (const promise of promises) {
    await promise();
  }
}

// TODO 有问题，待完善
export default function useZip()
{
  const compressFile = ( files: FileList ) =>
  {
    return new Promise( (resolve, reject) =>
    { 
      const zipParts: Uint8Array[] = []
      let centralDirectory = '';
      let offset = 0;
      function readFileAsArrayBuffer(file: File) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function ( e )
          {
            console.log(e)
            const fileData = new Uint8Array(e.target!.result as Uint8Array);
            const fileName = file.name;
            const crc = crc32(fileData);
  
            // Create local file header
            const localFileHeader = createLocalFileHeader(fileName, fileData, crc);
            zipParts.push(localFileHeader);
            zipParts.push(fileData);
            offset += localFileHeader.length + fileData.byteLength;
  
            // Create central directory header
            const centralDirectoryHeader = createCentralDirectoryHeader(fileName, fileData, crc, offset);
            zipParts.push(centralDirectoryHeader);
            centralDirectory += centralDirectoryHeader.length;
            resolve(true); // 解析 Promise 表示文件读取完成
          };
          reader.onerror = reject; // 如果读取失败则拒绝 Promise
          reader.readAsArrayBuffer(file);
        });
      }
      
      runPromisesSequentially( Array.from( files ).map( file =>
      { 
        return () => readFileAsArrayBuffer(file)
      } ))
      .then(() => {
        // Central directory offset
        const centralDirectoryOffset = offset;

        // Central directory size
        const centralDirectorySize = centralDirectory.length;

        // Create end of central directory record
        const endOfCentralDirectory = createEndOfCentralDirectory(files.length, centralDirectorySize, centralDirectoryOffset);
        zipParts.push(endOfCentralDirectory);

        // Create final ZIP blob
        const zipBlob = new Blob( zipParts, { type: 'application/zip' } );
        resolve(zipBlob);
      })
      .catch(error => {
        // 处理错误
        console.error('Error reading files:', error);
        reject(error); // 如果有错误发生，则拒绝外部的 Promise
      });
    } )
  }

  return {
    compressFile
  }
}