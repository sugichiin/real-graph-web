<template>
  <q-page>
    <div class="tutorial">
      <iframe allowfullscreen="" frameborder="0" height="547"
              marginheight="0" marginwidth="0" scrolling="no" src="https://www.slideshare.net/slideshow/embed_code/key/9V8wZi2CqduhfB" width="900"></iframe>
    </div>
    <div class="markdown" v-html="markdownHtml"></div>
  </q-page>
</template>

<script>
  import marked from 'marked'
  import { ajax } from '../util'
  export default {
    name: 'Tutorial',
    data () {
      return {
        markdownHtml: ''
      }
    },
    mounted () {
      ajax.get('/statics/tutorial.md')
        .then(res => {
          this.markdownHtml = marked(res)
        })
    }
  }
</script>

<style scoped>
  .tutorial {
    text-align:center;
  }
  .tutorial iframe {
    border:1px solid #CCC;
    margin-bottom:5px;
    max-width: 100%;
  }
</style>
