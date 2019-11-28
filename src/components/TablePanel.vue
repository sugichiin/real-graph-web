<template>
  <div style="padding: 5px;">
    <q-table flat no-data-label="You may need to run any algorithm" :pagination.sync="pg" :title="title" :data="rows" :columns="columns" :row-key="rowKey">
      <template v-slot:top v-if="data.attributes.time">
        <span class="text-h6">time spent: {{data.attributes.time}}</span>
      </template>
    </q-table>
  </div>
</template>

<script>
  export default {
    name: 'TablePanel',
    props: ['title', 'data'],
    data () {
      return {
        pg: {
          rowsPerPage: 10
        }
      }
    },
    computed: {
      rowKey () {
        return this.data.rows[0][0]
      },
      columns () {
        return this.data.rows[0].map((item, index) => {
          return {
            name: item,
            label: item,
            align: 'left',
            field: r => r[index],
            sortable: true
          }
        })
      },
      rows () {
        return this.data.rows.slice(1)
      }
    }
  }
</script>

<style scoped>

</style>
