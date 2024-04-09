import {createChunk} from './createChunk.js'

const CHUNK_SIZE = 1024 * 1024 * 5
// 内核数
const THREAD_COUNT = navigator.hardwareConcurrency || 4

export async function cutFile(file) {
    return new Promise(resolve => {
        const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
        const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT)
        const result = []
        let finishCount = 0
        console.log(THREAD_COUNT)
        for (let i = 0; i < THREAD_COUNT; i++) {
            // 创建一个线程并分配任务
            const worker = new Worker('./worker.js', {
                type: 'module'
            })
            const start = i * threadChunkCount
            let end = (i + 1) * threadChunkCount
            if (end > chunkCount) {
                end = chunkCount
            }
            worker.postMessage({
                file,
                CHUNK_SIZE,
                startChunkIndex: start,
                endChunkIndex: end
            })
            worker.onmessage = e => {
                for (let i = start; i < end; i ++) {
                    result[i] = e.data[i - start];
                }
                worker.terminate();
                finishCount++

                if (finishCount === THREAD_COUNT) {
                    resolve(result)
                }
            }
        }
    })
    // const proms = []
    // for (let i = 0; i < chunkCount; i++) {
    //     // const chunk = await createChunk(file, i, CHUNK_SIZE)
    //     // result.push(chunk)
    //     proms.push(createChunk(file, i, CHUNK_SIZE))
    // }
    // return await Promise.all(proms)
}