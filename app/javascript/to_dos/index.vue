<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
  ></v-data-table>
</template>
<script>
  export default {
    data() {
      return {
        headers: [
          {
            text: 'date',
            value: 'date'
          },
          {
            text: 'name',
            value: 'name',
          },
          { text: 'address',
            value: 'address'
          },
        ],
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }],
      }
    }
  }
</script>
