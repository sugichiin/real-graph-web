<template>
  <q-page class="">
    <!-- Configuration -->
    <div class="row q-my-sm">
      <div class="col-8 q-pr-sm">
        <div class="row q-py-sm">
          <div class="col-6 q-px-xl">
            <span class="param">Datasets</span>
            <br>
            <label-dropdown class="param-dropdown q-mt-xs" color="indigo" default-icon="mdi-graphql" @input="clear" :options="datasetOptions" @selected="datasetChanged"
                            v-model="dataset"/>
          </div>
          <div class="col-6 param-section">
            <span class="param">Resources</span>
            <div class="row q-mt-xs">
              <div class="col-6 q-pr-sm">
                <label-dropdown class="param-dropdown" default-icon="mdi-tilde" color="indigo" @input="clear" :options="threadOptions" v-model="threads"></label-dropdown>
              </div>
              <div class="col-6">
                <label-dropdown class="param-dropdown" default-icon="memory" color="indigo" @input="clear" :options="memoryOptions" v-model="memory"></label-dropdown>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-6 q-px-xl">
            <span class="param">Algorithms</span>
            <separator-dropdown class="param-dropdown q-mt-xs" default-icon="info" color="indigo" @input="clear" :options="algorithms" @selected="algoChanged"
                                v-model="algorithm"></separator-dropdown>
          </div>
          <div class="col-6 param-section" v-if="algoItem && (algoItem.root || algoItem.maxiter)">
            <span class="param">Parameters</span>
            <div class="row">
              <div class="col-6" v-if="algoItem && algoItem.root">
                <q-input class="param-input" v-model="root" outlined label="Root"></q-input>
              </div>
              <div class="col-6" v-if="algoItem && algoItem.maxiter">
                <q-input class="param-input" v-model="maxiter" outlined label="Max Iteration"></q-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 q-px-xl">
        <span class="param">Optimization techniques</span>
        <div class="q-my-sm">
          <q-toggle v-model="fun1" label="Block-based workload allocation"></q-toggle>
          <br>
          <q-toggle v-model="fun2" label="Hierarchical indicator"></q-toggle>
          <br>
          <q-toggle v-model="fun3" label="Efficient data layout"></q-toggle>
        </div>
        <div v-if="state === 'ready'">
          <q-btn push size="lg" color="teal-4" no-caps @click="run" class="full-width" icon="play_arrow">Run</q-btn>
        </div>
        <div v-if="state === 'running'">
          <q-btn push color="red" size="lg" no-caps @click="stop" class="full-width">
            <q-spinner color="white" size="1em" class="q-mr-md"></q-spinner>
            Stop
          </q-btn>
        </div>
        <div v-if="state === 'success'">
          <q-btn push color="grey" size="lg" no-caps @click="clear" class="full-width" icon="refresh">Clear</q-btn>
        </div>
      </div>
    </div>
    <!-- 결과 -->
    <div class="row q-my-xl">
      <q-card class="full-width" style="padding:10px;">
        <q-card-section style="padding:0;">
          <span class="card-title">Result</span>
        </q-card-section>
        <q-separator style="margin-top:10px;"></q-separator>
        <transition appear enter-active-class="animated fadeIn" leave-activie-class="animated fadeOut">
          <q-card-section style="padding:0;">
            <q-tabs
              key="qtabs"
              v-model="tabs"
              narrow-indicator
              dense
              align="left"
              class="text-black full-width">
              <q-tab name="text" icon="title" label="Text"></q-tab>
              <q-tab :disable="!result.text || !algoItem || !algoItem.table" name="table" icon="table_chart"
                     label="Table"></q-tab>
              <q-tab :disable="!result.dist || !algoItem || !algoItem.chart" name="chart" icon="insert_chart"
                     label="Chart"></q-tab>
              <q-tab name="graph" :disable="!datasetItem || datasetItem.badge === 'L'" icon="mdi-graph"
                     label="Graph"></q-tab>
              <q-btn icon="get_app" rounded :disable="!result.text || tabs === 'graph'" flat no-caps @click="download" push
                     style="margin-left:auto;">Download Result
              </q-btn>
            </q-tabs>
            <q-separator key="separator"></q-separator>
            <div class="text-center" style="margin-top:10px;" v-if="(tabs === 'text' || tabs === 'table') && algoItem && state === 'success'">
              <span class="text-h5" v-if="algoItem.parent.label === 'Rank'">
                Top-{{count}} {{this.algoItem.label}} of {{this.dataset}} Dataset
              </span>
              <span class="text-h5" v-if="algoItem.parent.label !== 'Rank'">
                The {{this.algoItem.label}} result of {{this.dataset}} Dataset
              </span>
            </div>
            <q-tab-panels key="qtabpanels" v-model="tabs" animated>
              <q-tab-panel name="text">
                <q-input readonly type="textarea" class="full-width" rows="20" :value="result.text"></q-input>
              </q-tab-panel>
              <q-tab-panel name="table">
                <table-panel :title="algorithm" :data="tableData"></table-panel>
              </q-tab-panel>
              <q-tab-panel name="chart">
                <histogram-chart v-if="chartType === 'hist'" :colors="algoItem && algoItem.chart && algoItem.chart.colors" :valtype="algoItem && algoItem.type" :xaxis="algoItem && ((algoItem.chart && algoItem.chart.xaxis) || algoItem.label)" yaxis="Frequency" ref="hist" :title="chartTitle" :legend="algoItem && (algoItem.legend || [algoItem.label])" :tooltip="algoItem && algoItem.tooltip" :data="result.hist"></histogram-chart>
                <bar-chart v-if="chartType === 'bar'" :data="result.hist"></bar-chart>
              </q-tab-panel>
              <q-tab-panel name="graph">
                <div>
                  <div class="text-center" v-if="algoItem && state === 'success'">
                    <span class="text-h5">Graph Visualization of {{this.dataset}} Dataset</span>
                  </div>
                  <div v-if="algorithm === 'hits' && state === 'success'">
                    <q-toggle v-model="graph.hub" color="green">hub</q-toggle>
                    <q-toggle v-model="graph.auth" color="red">authority</q-toggle>
                  </div>
                  <div class="row">
                    <div class="col-4">
                      <q-badge color="primary" style="margin-bottom:20px;">Zoom</q-badge>
                      <q-slider v-model="zoom" label label-always :min="0" :max="maxZoom"></q-slider>
                    </div>
                    <div class="col-4" style="margin-left:30px;" v-if="algorithm === 'bfs'">
                      <q-badge color="green" style="margin-bottom:20px;">BFS Iteration</q-badge>
                      <q-slider color="green" label label-always v-model="bfs.iter" :min="0" :max="bfs.maxIter"></q-slider>
                    </div>
                  </div>
                  <graph :data="dataset" :algo-item="algoItem" @init="graph => this.maxZoom = graph.maxZoomStep()" :bfs="bfs.decoded" :bfsIter="bfs.iter" :zoom="zoom" ref="graph" @input="val => {this.zoom = val}" :filter="graphFilter" :options="graphOptions" :startNode="algoItem && (algoItem.root ? root :  '')"></graph>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </transition>
        <q-inner-loading key="qinnerloading" :showing="state === 'running'">
          <!-- 알고리즘 진행중 Progress Bar ( Max Iteration 이 정해진 경우 ) -->
          <q-circular-progress
            v-if="algoItem && algoItem.maxiter"
            :min="0"
            show-value
            :max="100"
            :value="progress * 100"
            size="100px"
            :thickness="0.22"
            color="teal"
            track-color="grey-3"
            class="q-ma-md">
            {{Math.floor(progress*100)}}%
          </q-circular-progress>
          <!-- Max Iteration 이 정해지지 않은 경우. -->
          <q-circular-progress
            v-if="algoItem && !algoItem.maxiter"
            indeterminate
            show-value
            size="100px"
            color="teal"
            :thickness="0.22"
            trak-color="grey-3"
            class="q-ma-md">
            Processing...
          </q-circular-progress>
        </q-inner-loading>
      </q-card>
    </div>

    <!-- 다운로드 Modal -->
    <q-dialog v-model="dialog.format" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="help"/>
          <span class="q-ml-sm">Which format do you want?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="CSV" color="primary" @click="downloadFormat('csv')" v-close-popup />
          <q-btn flat label="Binary" color="primary" @click="downloadFormat('bin')" v-close-popup />
          <q-btn flat label="ARFF" color="primary" @click="downloadFormat('arff')" v-close-popup />
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import { http, algorithms, threads, memory, graph } from '../setting.json'
  import LabelDropdown from '../components/LabelDropdown'
  import SeparatorDropdown from '../components/SeparatorDropdown'
  import { decodeBfs, downloadDataUrl, downloadText, formatNumber, readCsv, wSocket } from '../util'
  import TablePanel from '../components/TablePanel'
  import HistogramChart from '../components/HistogramChart'
  import Graph from '../components/Graph'
  import BarChart from '../components/BarChart'

  export default {
    name: 'PageIndex',
    components: {
      Graph,
      HistogramChart,
      TablePanel,
      LabelDropdown,
      SeparatorDropdown,
      BarChart
    },
    computed: {
      chartTitle () {
        if (this.algoItem && this.chartType === 'hist') {
          return `${this.algoItem.label} Distribution of ${this.dataset} Dataset`
        }
        return ''
      },
      chartType () {
        if (this.algoItem && this.algoItem.chart) {
          return this.algoItem.chart.type || this.algoItem.chart
        }
        return ''
      },
      graphFilter () {
        const filters = {
          int: (x) => parseInt(x),
          number: (x) => Number(x).toFixed(6)
        }
        const filter = {}
        Object.keys(graph.filter).forEach(x => {
          filter[x] = graph.filter[x] === false ? false : filters[graph.filter[x]]
        })
        if (this.algoItem && this.algoItem.graph && this.algoItem.graph.filter) {
          Object.keys(this.algoItem.graph.filter).forEach(x => {
            filter[x] = this.algoItem.graph.filter[x] === false ? false : filters[this.algoItem.graph.filter[x]]
          })
        }
        return filter
      },
      graphOptions () {
        const option = {}
        const size = this.result.size
        option.communityMap = this.result.community
        if (this.algoItem && this.algoItem.graph) {
          if (this.algoItem.graph.community) {
            option.nodeColors = graph.nodeColors
          } else if (this.algoItem.graph.nodeColors) {
            option.nodeColors = this.algoItem.graph.nodeColors
          } else {
            option.nodeColors = [[0, 153, 153]]
            option.edgeColors = [[255, 128, 0]]
          }
          option.ignoreSize = this.algoItem.graph.ignoreSize
        } else {
          option.nodeColors = [[0, 153, 153]]
          option.edgeColors = [[255, 128, 0]]
        }
        if (this.algoItem && this.algoItem.parent.label === 'Rank') {
          const csv = readCsv(this.result.text)
          const nodeColorMap = {}
          if (this.algorithm === 'hits') {
            csv.rows.forEach(x => {
              if (this.graph.hub && this.graph.auth) {
                nodeColorMap[x[1]] = nodeColorMap[x[1]] ? [128, 128, 0] : [0, 0, 255]
                nodeColorMap[x[3]] = nodeColorMap[x[3]] ? [128, 128, 0] : [255, 0, 255]
              } else if (this.graph.hub) {
                nodeColorMap[x[1]] = [0, 0, 255]
              } else if (this.graph.auth) {
                nodeColorMap[x[3]] = [255, 0, 255]
              }
            })
          } else {
            csv.rows.forEach(x => {
              nodeColorMap[x[1]] = [255, 0, 0]
            })
          }
          option.nodeColorMap = nodeColorMap
        }
        if (size) {
          if (size.community) {
            const community = size.community
            option.communityMap = community
            const nodes = new Set(Object.keys(size.size_hub).concat(Object.keys(size.size_auth)))
            if (this.graph.hub && this.graph.auth) {
              const sizeMerged = {}
              nodes.forEach(node => {
                sizeMerged[node] = community[node] === 1 ? size.size_hub[node] : size.size_auth[node]
              })
              option.nodeSizeMap = sizeMerged
            } else if (this.graph.hub) {
              option.nodeSizeMap = size.size_hub
              option.nodeColors = [[0, 255, 0]]
            } else if (this.graph.auth) {
              option.nodeSizeMap = size.size_auth
              option.nodeColors = [[255, 0, 0]]
            }
          } else {
            option.nodeSizeMap = this.result.size
          }
        }
        return option
      },
      tableData () {
        if (this.result.text && this.algoItem.table) {
          const csv = readCsv(this.result.text)
          if (this.algoItem && this.algoItem.tableColumns) {
            csv.rows.splice(0, 0, this.algoItem.tableColumns)
          }
          return csv
        }
        return {
          attributes: {},
          rows: [
            ['#', 'NodeId', 'Value']
          ]
        }
      },
      datasetOptions () {
        if (!this.datasets) {
          return []
        }
        return this.datasets.map(item => {
          let tooltip = 'Large graph'
          let badge = 'L'
          if (item.nodes < 300000) {
            tooltip = 'Small graph'
            badge = 'S'
          }
          return {
            value: item.name,
            label: item.label || item.name,
            icon: 'mdi-graphql',
            badge,
            tooltip,
            captions: [
              `${formatNumber(item.nodes)} nodes ${formatNumber(item.edges)} edges`
            ]
          }
        })
      },
      threadOptions () {
        return threads.map(x => {
          return {
            label: `${x} Thread${x > 1 ? 's' : ''}`,
            value: x,
            icon: 'mdi-tilde'
            // icon: x < 10 ? `filter_${x}` : `filter_9_plus`
          }
        })
      },
      memoryOptions () {
        return memory.map(x => {
          return {
            label: `${x}GB RAM`,
            value: x,
            icon: 'memory'
          }
        })
      }
    },
    mounted () {
      // 데이터셋들의 정보를 가져옵니다.
      this.$http.get('/data-list').then(res => {
        this.datasets = res
      })
      // 현재 알고리즘의 진행상태 정보가 넘어오는 경우
      wSocket.on('progress', data => {
        this.progress = Number(data.value) / 100
      })
      // 알고리즘의 결과 값이 넘어오는 경우
      wSocket.on('result', (data) => {
        this.state = 'success'
        this.progress = 0
        this.result = {
          text: data.text, // 텍스트 데이터
          dist: data.dist, // 분포도 데이터
          size: data.size, // 노드들의 상대적 사이즈 데이터
          community: data.community
        }
        if (data.dist) {
          const csv = readCsv(data.dist).rows.map(item => {
            return [Number(item[0]), Number(item[1]), Number(item[2])]
          }).sort((a, b) => a[1] - b[1])
          this.result.hist = []
          csv.forEach(item => {
            while (this.result.hist.length <= item[0]) this.result.hist.push([])
            this.result.hist[item[0]].push([item[1], item[2]])
          })
        }
        if (this.algorithm === 'bfs' && data.path) {
          const decoded = decodeBfs(data.path)
          this.bfs.iter = 0
          this.bfs.decoded = decoded
          this.bfs.maxIter = decoded.length
        }
      })
    },
    destroyed () {
      wSocket.off('progress')
      wSocket.off('result')
    },
    methods: {
      datasetChanged (item) {
        this.datasetItem = item
      },
      algoChanged (item) {
        this.algoItem = item
      },
      run () {
        const { maxiter, memory, threads, algorithm, dataset, root, algoItem, fun1, fun2, fun3 } = this
        if (dataset === '') {
          alert('Please select the dataset')
          return
        } else if (memory === 0) {
          alert('Please select memory')
          return
        } else if (threads === 0) {
          alert('Please select the number of threads')
          return
        } else if (algorithm === '') {
          alert('Please select the algorithm to execute')
          return
        } else if (algoItem.root && root === '') {
          alert('Please input the root (start node).')
          return
        } else if (algoItem.maxiter && maxiter === '') {
          alert('Please input the number of iteration to run')
          return
        }
        this.state = 'running'
        // 실시간 통신을 위하여 Web Socket 을 사용합니다.
        wSocket.emit('run', {
          maxiter: maxiter || 20,
          memory, // memory: memory 랑 같음.
          threads,
          root: root,
          data: dataset,
          algo: algorithm,
          count: 40,
          sessId: wSocket.sessId,
          fun1,
          fun2,
          fun3
        })
      },
      stop () {
        wSocket.emit('stop')
        this.state = 'ready'
      },
      clear () {
        this.state = 'ready'
        this.tabs = 'text'
        this.maxiter = ''
        this.root = ''
        this.result = {
          text: ''
        }
        this.bfs = {
          iter: 0,
          maxIter: 0,
          decoded: []
        }
      },
      downloadFormat (format) {
        if (format === 'csv') {
          downloadDataUrl(`${process.env.NODE_ENV === 'production' ? http.production.baseURL : http.dev.baseURL}result/result.csv`, 'result.csv')
        } else if (format === 'arff') {
          downloadDataUrl(`${process.env.NODE_ENV === 'production' ? http.production.baseURL : http.dev.baseURL}result/result.arff`, 'result.arff')
        } else if (format === 'bin') {
          downloadDataUrl(`${process.env.NODE_ENV === 'production' ? http.production.baseURL : http.dev.baseURL}result/result.dat`, 'result.dat')
        }
      },
      download () {
        if (this.tabs === 'text' || this.tabs === 'table') {
          if (this.datasetItem.badge === 'S' && this.chartType === 'hist') {
            this.dialog.format = true
          } else {
            downloadText(this.result.text, 'result.csv')
          }
        } else if (this.tabs === 'chart') {
          downloadDataUrl(this.$refs.hist.dataUrl(), 'result.jpg')
        } else if (this.tabs === 'graph') {
          this.$refs.graph.download()
        } else {
          downloadText(this.result.text, 'result.csv')
        }
      }
    },
    data: function () {
      return {
        // 현재 선택한 데이터 셋
        dataset: '',
        // 현재 선택한 데이터 셋의 정보 (노드 수, 엣지 수)
        datasetItem: null,
        dialog: {
          format: false
        },
        // 현재 선택한 메모리 (GB 단위)
        memory: 0,
        // 현재 선택한 쓰레드
        threads: 0,
        // 현재 선택한 알고리즘
        algorithm: '',
        // 현재 선택한 알고리즘의 정보
        algoItem: null,
        // 선택 가능한 알고리즘들의 정보
        algorithms,
        // 줌 레벨
        zoom: 0,
        // 현재 선택된 결과 탭
        tabs: 'text',
        // 알고리즘 수행 시 진행 상태
        progress: 0,
        maxZoom: 0,
        result: {
          text: ''
        },
        bfs: {
          maxIter: 0,
          iter: 0,
          decoded: []
        },
        datasets: [{
          value: 'Mock',
          label: 'Mock',
          nodes: 0,
          edges: 0
        }],
        maxiter: '',
        root: '',
        state: 'ready',
        graph: {
          hub: true,
          auth: true,
          zoom: 0
        },
        fun1: true,
        fun2: true,
        fun3: true
      }
    }
  }
</script>
<style scoped>
  .param {
    font-size: 24px;
  }

  .param-section {
    padding-left: 5px;
  }

  .param-section .col-6:not(:first-child) {
    padding-left: 5px;
  }

  .param-dropdown, .param-input {
    height: 60px;
  }

  .card-title {
    margin-left: -24px;
    padding: 2px 10px 2px 24px;
    background: #e0e0e0;
    color: #616161;
    position: relative;
    border-radius: 3px 5px 5px 0;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .card-title:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 0;
    height: 0;
    border: 0 solid transparent;
    border-top-color: #bebebe;
    border-width: 9px 0 0 11px;
  }

  .bg-cornflowerblue {
    background-color: cornflowerblue;
  }
</style>
