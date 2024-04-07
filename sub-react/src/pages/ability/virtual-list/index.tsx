import React, {useEffect, useRef, useState} from 'react'
import { throttle } from 'lodash'

type OnScrollEvent = (event: React.UIEvent<HTMLDivElement>) => void

const VirtualListPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const topBlankFill = useRef<React.CSSProperties>({})
  const [showList, setShowList] = useState<{
    content: React.ReactNode
    commentId: string
    comments: string
  }[]>([])
  const curContainerHeight = useRef<number>(0)
  const curViewNum = useRef<number>(0)
  const lastStartIndex = useRef<number>(0)
  const isNeedLoad = useRef<boolean>()
  const dataListRef = useRef<{
    content: React.ReactNode
    commentId: string
    comments: string
  }[]>([])
  const itemHeight = 10

  const boxScroll: OnScrollEvent = (event) => {
    console.log(event)
  }

  // 滚动容器高度改变后执行的函数
  const changeHeight = throttle(() => {
    // 容器高度，通过dom元素获取，因为可能是不定值
    curContainerHeight.current = containerRef.current?.offsetHeight ?? 0
    // 列表最大数量，考虑到列表中顶部和底部可能都会出现没有展现完的item
    curViewNum.current = Math.ceil(curContainerHeight.current / itemHeight) + 1
  }, 500)

  useEffect(() => {
    // 组件第一次挂载需要初始化容器高度和最大容纳数
    changeHeight()
    // 因为可视窗口和浏览器大小有关系，所以需要监听浏览器大小变化
    window.addEventListener('resize', changeHeight)
    return () => {
      window.removeEventListener('resize', changeHeight)
    }
  }, [changeHeight])

  const scrollHandle = () => {
    const startIndex = Math.floor(containerRef.current?.scrollTop ?? 0 / itemHeight)
    if (!isNeedLoad && lastStartIndex.current === startIndex) return
    isNeedLoad.current = false
    lastStartIndex.current = startIndex
    const containerMaxSize = curViewNum.current
    /**
     * 解决滑动过快出现的白屏问题：注意endIndex要在startIndex人为改变之前就计算好
     * 因为我们实际上需要三板的数据用于兼容低性能的设备，用做上下滚动的缓冲区域，避免滑动的时候出现白屏
     * 现在的startIndex是可视区的第一个元素索引，再加上2倍可视区元素量，刚好在下方就会多出一板来当做缓冲区
     */
    // 此处的endIndex是为了在可视区域的下方多出一板数据
    let endIndex = startIndex + 2 * containerMaxSize - 1
    // 接近滚动到屏幕底部的时候，就可以请求发送数据了，这个时候触底的并不是可视区的最后一个元素，而是多出那一版的最后一个元素触底了
    const currLen = dataListRef.current.length
    if (endIndex > currLen - 1) {
      // 更新请求参数，发送请求获取新的数据(但是要保证当前不在请求过程中，否则就会重复请求相同的数据)
      // https://mp.weixin.qq.com/s/RMrtCTUuywbrZqFPCdUOFA
      // 如果已经滚动到了底部，那么就设置endIndex为最后一个元素索引即可
      endIndex = currLen - 1
    }
  }

  return (
    <>
      <div className="container">
      {/*  监听滚动事件的盒子，该高度继承了父元素的高度*/}
        <div className="scroll-box" ref={containerRef} onScroll={boxScroll}>
        {/*  该盒子的高度一定会超过父元素，要不实现不了滚动的效果，而且还要动态设置padding用于控制滚动条*/}
          <div style={topBlankFill.current}>
            {
              showList.map(item => <div className='item' key={item.commentId || (Math.random() + item.comments)}>{item.content}</div>)
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default VirtualListPage