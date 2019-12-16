<template>
  <div class="shingle-container" ref="container" style="height:6in; width:100%;" data-width="100%" data-height="6in" :data-graph-path="graphPath" data-node-field="nodenumber"></div>
</template>

<script>
  import { DisplayModule, downloadSvg, wSocket } from '../util'
  import { http } from '../setting.json'

  export default {
    name: 'Graph',
    props: ['data', 'filter', 'startNode', 'options', 'zoom', 'bfs', 'bfsIter', 'algoItem'],
    mounted () {
      this.$nextTick(() => this.init())
    },
    methods: {
      download () {
        const svg = this.$el.querySelector('svg')
        downloadSvg(svg, 'result.png')
      },
      init () {
        this.$el.innerHTML = ''
        const { $el, data, filter, startNode, options } = this
        this.initialized = false
        this.mod = DisplayModule.init({
          elem: $el,
          data,
          filter,
          startNode,
          onInit: (graph) => {
            this.$emit('init', graph)
            this.$emit('input', graph.maxZoomStep())
            this.initialized = true
            if (this.bfs && this.bfs.length > 0) {
              this.setIter = window.bfs(this.bfs, 500, 1000)
            }
          },
          onFocus: (quadid, nodeid, infoData) => {
            if (this.algoItem.graph) {
              const algo = this.algoItem.graph.name
              const filter = this.filter
              wSocket.once('attr', ({ values }) => {
                const attr = {}
                algo.forEach((name, index) => {
                  attr[name] = values[index]
                })
                infoData.setAttr(attr, filter)
              })
              wSocket.emit('attr', nodeid)
            }
          },
          options: {
            zoomSlider: false,
            onZoomIn: (lv) => {
              this.$emit('input', lv)
            },
            onZoomOut: (lv) => {
              this.$emit('input', lv)
            },
            ...options
          }
        })
      }
    },
    data () {
      return {
        mod: null,
        initialized: false,
        setIter: () => {}
      }
    },
    watch: {
      options (val) {
        this.init()
      },
      zoom (val) {
        if (this.initialized) {
          this.mod.graph.doScaleTo(val)
        }
      },
      bfs (arr) {
        if (arr && arr.length > 0) {
          this.setIter = window.bfs(arr, 500, 1000)
        }
      },
      bfsIter (val) {
        this.setIter(val)
      }
    },
    computed: {
      maxZoomStep () {
        return this.mod.graph.maxZoomStep()
      },
      graphPath () {
        return (process.env.NODE_ENV === 'production' ? http.production.baseURL : http.dev.baseURL) + 'exported/' + this.data + '/'
      }
    }
  }
</script>

<style scoped>

</style>
