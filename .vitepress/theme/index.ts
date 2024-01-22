
import DefaultTheme from 'vitepress/theme'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
import {Theme} from 'vitepress'

import CustomLayout from './CustomLayout.vue'

import './custom.sass'

export default {
    ...DefaultTheme,
    Layout: CustomLayout,
    enhanceApp(ctx){
        DefaultTheme.enhanceApp(ctx)
        // Global components
        ctx.app.component('VPButton', VPButton)
    },
} as Theme
