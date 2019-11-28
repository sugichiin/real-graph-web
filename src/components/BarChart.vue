<template>
    <div style="min-height:600px;"></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'BarChart',
    props: ['data'],
    mounted () {
      this.refresh()
    },
    data () {
      return {
        chart: null
      }
    },
    methods: {
      refresh (val) {
        val = val || this.data
        this.chart = echarts.init(this.$el)
        this.chart.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [
            {
              type: 'value'
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              type: 'bar',
              data: val[0]
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
