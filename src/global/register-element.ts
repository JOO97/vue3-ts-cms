import type { App } from 'vue'

import 'element-plus/theme-chalk/base.css'
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElInput,
  ElLink,
  ElRadio,
  ElTabs
} from 'element-plus'

const components = [
  ElButton,
  ElCheckbox,
  ElForm,
  ElInput,
  ElLink,
  ElRadio,
  ElTabs
]

export default function (app: App): void {
  components.map((cpn) => {
    app.use(cpn)
  })
}
