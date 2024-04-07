import { Layout, Menu } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {useEffect, useState} from "react";
import menuData from '../routes/menuData.tsx'
import type { MenuProps } from 'antd'

const { Sider } = Layout
export default function Root() {
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setSelectedKeys([location.pathname])
    const pathList = location.pathname.split("/")
    const parts = pathList.reduce((acc, _, index, arr) => {
      // 使用reduce来逐步构建路径，直到索引为2（包括/a/b）
      if (index <= pathList.length - 1) {
        acc.push("/" + arr.slice(1, index + 1).join("/"));
      }
      return acc;
    }, [] as string[]);
    setOpenKeys(parts)
  }, [location.pathname]);

  const onCollapse = (collapsed: boolean) => {
    setInternalCollapsed(collapsed)
  }

  const menuItemClick: MenuProps['onClick'] = ({key}) => {
    navigate(key)
    setSelectedKeys([key])
  }

  const openChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys)
  }

  return (
    <>
      <Layout style={{
        width: '100%',
        height: '100%'
      }}>
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
            onOpenChange={openChange}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            items={menuData}></Menu>
        </Sider>
        <div style={{
          width: !internalCollapsed ? '200px' : '80px'
        }}></div>
        <Outlet/>
      </Layout>
    </>
  );
}