import { Layout, Menu } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {useEffect, useState} from "react";
import menuData from '../routes/menuData.tsx'
import type { MenuProps } from 'antd'

const { Sider } = Layout
export default function Root() {
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setSelectedKeys([location.pathname])
  }, []);

  const onCollapse = (collapsed: boolean) => {
    setInternalCollapsed(collapsed)
  }

  const menuItemClick: MenuProps['onClick'] = ({key}) => {
    navigate(key)
  }

  return (
    <>
      <Layout>
        <Sider style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0
        }}
          onCollapse={onCollapse}
          collapsible={true}
          collapsed={internalCollapsed}>
          <Menu theme={'dark'}
            style={{
              height: '100%'
            }}
            mode={'inline'}
            onClick={menuItemClick}
            selectedKeys={selectedKeys}
            openKeys={selectedKeys}
            items={menuData}></Menu>
        </Sider>
        <div style={{
          width: internalCollapsed ? '200px' : '80px'
        }}></div>
        <Outlet/>
      </Layout>
    </>
  );
}