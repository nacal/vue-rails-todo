<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="toDos"
      class="table"
    >
      <template v-slot:[`item.delete`]="{ item }">
        <v-btn @click="destroyToDo(item.id)" block>
          <v-icon dense>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.finished`]="{ item }">
        <v-checkbox
          v-model="item.finished"
          @change="updateToDo(item.id, item.finished)"
        ></v-checkbox>
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
            text: 'finished',
            value: 'finished',
            sortable: false,
            width: '120px'
          },
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
            text: 'delete',
            value: 'delete',
            sortable: false,
            width: '120px'
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
    },
    methods: {
      destroyToDo(id) {
        axios.delete('/api/v1/to_dos/' + id)
          .then(res => {
            if (res.status === 200) {
              this.toDos = reject(this.toDos, ['id', id])
            }
          })
      },
      updateToDo(id, finished) {
        axios.patch('/api/v1/to_dos/' + id, {to_do: {finished: finished}})
          .then(res => {
            if (res.status === 200) {
              console.log(res)
            }
        })
      }
    }
  }
</script>

<style scoped>
.table{
  text-align: left;
}
</style>>
