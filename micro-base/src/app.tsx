import './app.css'
import { Layout } from 'antd'
import Header from './layout/Header';

const { Content } = Layout;

export function App() {

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
