import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import { Layout, Menu } from 'antd'

const { Header, Content } = Layout;

export function App() {

  return (
    <Layout
      style={{
        height: '100%',
        width: '100%'
      }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          alignItems: 'center'
        }}>
        {/* <div>
          <img src={viteLogo} class="logo" alt="Vite logo" />
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </div> */}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[]}
          items={[
            {
              key: '/sub-react',
              label: 'react'
            },
            {
              key: '/sub-vue',
              label: 'vue'
            },
            {
              key: '/sub-angular',
              label: 'angular'
            }
          ]}
          onClick={({ key }: { key: string }) => {
            console.log('pushState', key)
            window.history.pushState(null, '', key)
          }}
        />
      </Header>
      <Content>
        <main id="sub-app"></main>
      </Content>
    </Layout>
  )
}
