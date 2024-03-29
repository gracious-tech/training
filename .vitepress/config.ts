
import path from 'path'

import {defineConfig} from 'vitepress'


export default defineConfig({
    cleanUrls: true,  // Don't force `.html` on urls
    outDir: 'dist',
    srcDir: 'src',
    title: "Understanding Scripture",
    description: "High quality training in exegesis and theology that is free of cost and copyright.",
    head: [
        ['link', {rel: 'icon', href: '/_assets/icon.png'}],
        // Make Twitter use a large image in its preview
        ['meta', {name: 'twitter:card', content: 'summary_large_image'}],
        // WARN WhatsApp requires a URL with domain included
        ['meta', {property: 'og:image', content: 'https://training.freely.giving/_assets/social.jpg'}],
    ],
    vite: {
        publicDir: '_public',
        resolve: {
            alias: [
                {find: '@', replacement: path.resolve(__dirname, '../src')},
            ],
        },
    },
    markdown: {
        config: (md) => {
            md.options.typographer = true
        },
    },
    themeConfig: {
        logo: '/_assets/icon.png',
        nav: [
            {text: "Trainings", link: '/trainings'},
            {text: "Diagrams", link: '/diagrams'},
            {text: "About", link: '/about'},
        ],
    },

    transformPageData(page_data){
        // Auto-set meta attributes from dynamic page data
        // See https://github.com/vuejs/vitepress/discussions/2285
        if (page_data.params?.title){
            page_data.title = page_data.params.title
        }
        if (page_data.params?.description){
            page_data.description = page_data.params.description
        }
    },

    transformHead(ctx){
        const head:[string, Record<string, string>][] = []

        // Twitter preview/card ignores <title> and meta description :/
        head.push(['meta', {name: 'og:title', content: ctx.title}])
        head.push(['meta', {name: 'og:description', content: ctx.description}])

        // Change og:image for dynamic routes that have their own
        let image = ctx.pageData.params?.image ?? ctx.pageData.frontmatter.image
        if (image){
            if (image.startsWith('/')){
                // WhatsApp needs domain as well
                image = 'https://training.freely.giving' + image
            }
            head.push(['meta', {property: 'og:image', content: image}])
        }

        return head
    },
})
