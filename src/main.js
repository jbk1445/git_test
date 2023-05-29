import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.config.globalProperties.$getFormatedDate = function (createdAt) {
  const currentTime = new Date()
  const createdAtTime = new Date(createdAt)
  const diffInMinutes = Math.floor((currentTime - createdAtTime) / (1000 * 60))
  if (diffInMinutes < 60) {
    return `${diffInMinutes} 분 전`
  } else {
    const month = (createdAtTime.getMonth() + 1).toString().padStart(2, '0')
    const day = createdAtTime.getDate().toString().padStart(2, '0')
    const hours = createdAtTime.getHours().toString().padStart(2, '0')
    const minutes = createdAtTime.getMinutes().toString().padStart(2, '0')
    return `${month}/${day} ${hours}:${minutes}`
  }
}
app.use(store).use(router).mount('#app')
