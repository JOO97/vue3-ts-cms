import type { App } from 'vue'

import 'element-plus/theme-chalk/base.css'
import { ElButton } from 'element-plus'

const components = [ElButton]

export default function (app: App): void {
  components.map((cpn) => {
    app.use(cpn)
  })
}
