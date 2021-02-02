<template>
  <div>
    <v-tabs v-model="activeTab">
      <v-tab href="#toDo">ToDo</v-tab>
      <v-tab href="#finishedToDo">終了したToDo</v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item value="toDo">
        <v-data-table
          :headers="headers"
          :items="filter(toDos, false)"
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
      </v-tab-item>
      <v-tab-item value="finishedToDo">
        <v-data-table
          :headers="headers"
          :items="filter(toDos, true)"
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
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import axios from 'axios'
import {reject, filter} from 'lodash';

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
        toDos: [],
        activeTab: 'toDo'
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
      },
      filter(toDos, finished) {
        return filter(toDos, ['finished', finished])
      }
    }
  }
</script>

<style scoped>
.table{
  text-align: left;
}
</style>>
