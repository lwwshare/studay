import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import cn from './cn.config.js'
import en from './en.config.js'
Vue.use(VueI18n)

const messages = {
    en: Object.assign(en, enLocale),
    zh: Object.assign(cn, zhLocale)
}

const i18n = new VueI18n({
    locale: window.language || 'zh',
    messages,
    silentTranslationWarn: true
})

Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})
export default i18n