<template>
  <div>
    <v-container>
      <v-dialog v-model="createToDoDialog">
        <template #activator="{ on }">
          <v-btn v-on="on">create</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Create ToDo
          </v-card-title>
          <v-card-text>
            <ToDoForm ref="ToDoForm"/>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              type="primary"
              color="primary"
              @click="createToDo">
              create
            </v-btn>
            <v-btn
              color="primary"
              outlined
              @click="createToDoDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-tabs v-model="activeTab">
        <v-tab href="#toDo">ToDo</v-tab>
        <v-tab href="#finishedToDo">終了したToDo</v-tab>
      </v-tabs>
      <v-tabs-items v-model="activeTab">
        <v-tab-item value="toDo">
          <ToDoTable
            :headers="headers"
            :items="filter(toDos, false)"
            @update="updateToDo"
            @destroy="destroyToDo"
          />
        </v-tab-item>
        <v-tab-item value="finishedToDo">
          <ToDoTable
            :headers="headers"
            :items="filter(toDos, true)"
            @update="updateToDo"
            @destroy="destroyToDo"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import {reject, filter} from 'lodash'
import ToDoTable from '../to_dos/c-ToDoTable'
import ToDoForm from '../to_dos/c-ToDoForm'

  export default {
    components: {
      ToDoTable,
      ToDoForm
    },
    data() {
      return {
        headers: [
          {
            text: '',
            value: 'finished',
            sortable: false,
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
            text: '',
            value: 'delete',
            sortable: false,
          }
        ],
        toDos: [],
        activeTab: 'toDo',
        createToDoDialog: false
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
      },
      createToDo() {
        this.createToDoDialog = false
        this.$refs.ToDoForm.createToDo()
      }
    }
  }
</script>
