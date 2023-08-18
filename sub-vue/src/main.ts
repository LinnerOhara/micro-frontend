import { createApp } from 'vue'
import type { App as AppType } from 'vue'
import './style.css'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let instance: AppType
function render(props: any) {
  const { container } = props
  const c = container ? container.querySelector("#sub-vue") : document.getElementById("sub-vue")
  instance = createApp(App)
  instance.mount(c)
}

renderWithQiankun({
  mount(props) {
    console.log('sub-vue mount', props);
    render(props)
  },
  bootstrap() {
    console.log('sub-vue bootstrap')
  },
  unmount(props) {
    console.log('sub-vue unmount', props);
    instance.unmount()
  },
  update() {}
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}