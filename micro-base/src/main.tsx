import { render } from 'preact'
import { App } from './app.tsx'
import 'zone.js'
import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'sub-react',
    // entry: '//localhost:8080',
    entry: '//github.com/react',
    activeRule: '/sub-react',
    container: '#sub-app'
  },
  {
    name: 'sub-vue',
    entry: '//localhost:8001',
    activeRule: '/sub-vue',
    container: '#sub-app'
  },
  {
    name: 'sub-angular',
    entry: '//localhost:4200',
    activeRule: '/sub-angular',
    container: '#sub-app'
  }
], {
  beforeLoad: [async app => console.log('micro before load', app.name)],
  beforeMount: [async app => console.log('micro before mount', app.name)],
  beforeUnmount: [async app => console.log('micro before unmount', app.name)]
})
start()

render(<App />, document.getElementById('app')!)
