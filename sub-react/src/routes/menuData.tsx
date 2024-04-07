import type { MenuProps } from 'antd';
import React from "react";
import { HomeOutlined, FunctionOutlined } from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const menuData: MenuItem[] = [
  getItem('首页', '/', <HomeOutlined />),
  getItem('功能', '/ability', <FunctionOutlined />, [
    getItem('虚拟列表', '/ability/virtual-list')
  ])
]

export default menuData