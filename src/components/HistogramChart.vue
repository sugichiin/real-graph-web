<template>
  <div style="min-height:600px;"></div>
</template>

<script>
  import echarts from 'echarts'
  const valTypeConverters = {
    'int': x => String(Math.round(x)),
    'number': x => x.toFixed(9).replace(/\.*0+$/, '')
  }
  export default {
    name: 'HistogramChart',
    props: ['data', 'tooltip', 'legend', 'title', 'xaxis', 'yaxis', 'valtype', 'colors'],
    data () {
      return {
        chart: null
      }
    },
    mounted () {
      this.refresh()
    },
    methods: {
      dataUrl () {
        return this.chart.getDataURL({
          backgroundColor: 'white'
        })
      },
      refresh (val) {
        val = val || this.data
        const convert = valTypeConverters[this.valtype || 'number']
        if (!val) {
          return
        }
        this.chart = echarts.init(this.$el)
        const colors = this.colors || [
          [[255, 70, 131], [255, 158, 68], [255, 70, 131]],
          [[70, 255, 131], [158, 255, 68], [70, 255, 131]],
          [[255, 70, 131], [255, 158, 68], [255, 70, 131]]
        ]
        const selected = {}
        const legend = this.tooltip.length < 2 ? [] : this.tooltip
        legend.forEach(x => {
          selected[x] = true
        })
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%']
            },
            formatter: params => {
              const x = Math.pow(10, params[0].data[0])
              return convert(x) + '<br/>' + params.map((param, index) => {
                return `${param.marker}${param.seriesName} : ${param.data[1]}`
              }).join('<br/>')
            }
          },
          title: {
            left: 'center',
            text: this.title
          },
          xAxis: {
            type: 'value',
            boundaryGap: false,
            min: 'dataMin',
            name: this.xaxis,
            nameLocation: 'center',
            nameTextStyle: {
              fontSize: 24,
              padding: [15, 0, 0, 0]
            },
            max: 'dataMax',
            axisLabel: {
              margin: 16,
              formatter: (val) => convert(Math.pow(10, val))
            }
          },
          legend: {
            data: legend,
            right: 10,
            top: 20,
            bottom: 20,
            selected: selected
          },
          yAxis: {
            type: 'log',
            boundaryGap: false,
            name: this.yaxis,
            nameLocation: 'center',
            nameTextStyle: {
              fontSize: 24,
              padding: [0, 0, 20, 0]
            }
          },
          grid: [
            {
              height: '75%'
            }
          ],
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: [0],
              bottom: 0,
              labelFormatter: (value, valueStr) => {
                return `${convert(Math.pow(10, value))}`
              }
            }
          ],
          series: val.map((data, index) => {
              return {
                name: this.tooltip[index],
                type: 'line',
                symbol: 'none',
                itemStyle: {
                  color: `rgb(${colors[index][0].join(', ')})`
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: `rgb(${colors[index][1].join(', ')})`
                  }, {
                    offset: 1,
                    color: `rgb(${colors[index][2].join(', ')})`
                  }])
                },
                data: data
              }
            }
          )
        })
      }
    },
    watch: {
      data (val) {
        this.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
