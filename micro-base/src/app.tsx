import './app.css'
import { Layout } from 'antd'
import Header from './layout/Header';
import { useEffect, useSyncExternalStore } from 'preact/compat';

const { Content } = Layout;

const tabVisibleSubscribe = (callback: () => void) => {
  window.addEventListener('visibilitychange', callback)
  return () => {
    window.removeEventListener('visibilitychange', callback)
  }
}

export function App() {
  const visibleState = useSyncExternalStore(
    tabVisibleSubscribe,
    () => {
      return document.visibilityState
    } 
  )
  let timer: number

  useEffect(() => {
    if (visibleState === 'visible') {
      document.title = '被你找到了'
      timer = setTimeout(() => {
        document.title = 'micro-frontend'
      }, 3000)
    } else if (visibleState === 'hidden') {
      if (timer) {
        clearTimeout(timer)
      }
      document.title = '你找不到我~~'
    }
  }, [visibleState])

  return (
    <Layout
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
      }}>
      <Header></Header>
      <Content>
        <main id="sub-app"></main>
      </Content>
    </Layout>
  )
}
