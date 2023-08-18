import React, { useState } from "preact/compat";
import { microApps } from '../../main'
import avater from '../../assets/avater.png'
import { Layout } from 'antd'
import styles from './index.module.css'


const Icon: React.FC = () => {
  return (
    <img className={styles.avater} src={avater}></img>
  )
}

const Menu: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState(location.pathname)

  return (
    <ul className={styles.menu}>
      {microApps.map(item => {
        let className = styles.menuItem;
        if (selectedKey.includes(item.activeRule)) {
          className += ` ${styles.menuSelected}`
        }

        return <li className={className} onClick={() => {
          history.pushState(null, '', item.activeRule)
          setSelectedKey(item.activeRule)
        }}>{item.name}</li>
      })}
    </ul>
  )
}

const Header: React.FC = () => {
  return (
    <Layout.Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        alignItems: 'center',
        display: 'flex'
      }}>
      <Icon />
      <Menu />
    </Layout.Header>
  )
}

export default Header