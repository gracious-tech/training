
<template lang='pug'>

blockquote
    div.fetch-bible(v-html='html' class='no-notes no-headings no-red-letter')
    p.info
        a(:href='url' target='_blank') {{ passage }} (BSB)

</template>


<script lang='ts' setup>

import {ref} from 'vue'

import {get_passage} from './fetch'


const props = defineProps({passage: String})

const url = ref('https://app.fetch.bible/')
const html = ref('')


get_passage(props.passage).then(result => {
    if (!result){
        return
    }
    const [obj, contents] = result
    url.value = `https://app.fetch.bible/#book=${obj.book}&verse=${obj.chapter_start}:${obj.verse_start}`
    html.value = contents
})

</script>


<style lang='sass' scoped>

.info a
    font-weight: bold
    color: inherit

</style>
