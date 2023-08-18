import { render } from 'preact'
import { App } from './app.tsx'
import 'zone.js'
import { registerMicroApps, start } from 'qiankun'

export const microApps = [
  {
    name: 'sub-react',
    entry: '//localhost:5174',
    activeRule: '/sub-react',
    container: '#sub-app'
  },
  {
    name: 'sub-vue',
    entry: '//localhost:5174',
    activeRule: '/sub-vue',
    container: '#sub-app'
  },
  {
    name: 'sub-angular',
    entry: '//localhost:4200',
    activeRule: '/sub-angular',
    container: '#sub-app'
  }
]

registerMicroApps(microApps, {
  beforeLoad: [async app => console.log('micro before load', app.name)],
  beforeMount: [async app => console.log('micro before mount', app.name)],
  beforeUnmount: [async app => console.log('micro before unmount', app.name)]
})
start()

render(<App />, document.getElementById('app')!)