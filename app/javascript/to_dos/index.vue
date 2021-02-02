<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="toDos"
    >
      <template v-slot:[`item.action`]="{ item }">
        <v-btn @click="destroyToDo(item.id)">
          <v-icon dense>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
import {reject} from 'lodash'

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
            width: '240px'
          },
          {
            text: 'Action',
            value: 'action',
            sortable: false,
            width: '120px'
          },
        ],
        toDos: []
      }
    },
    created() {
      axios.get('/api/v1/to_dos')
        .then(res => {
          this.toDos = res.data
        })
    },
    methods: {
      destroyToDo(id) {
        axios.delete('/api/v1/to_dos/' + id)
          .then(res => {
            if (res.status === 200) {
              this.toDos = reject(this.toDos, ['id', id])
            }
          })
      }
    }
  }
</script>
