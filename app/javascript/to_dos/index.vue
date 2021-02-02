<template>
  <v-data-table
    :headers="headers"
    :items="toDos"
  ></v-data-table>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        headers: [
          {
            text: 'title',
            value: 'title'
          },
          {
            text: 'expired_at',
            value: 'expired_at',
          }
        ],
        toDos: []
      }
    },
    created() {
    axios.get('/api/v1/to_dos')
       .then(res => {
         this.toDos = res.data
       })
  }
  }
</script>
