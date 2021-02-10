<template>
  <v-app id="app">
    <div>
      <v-toolbar color="primary" class="center">
        <v-toolbar-title class="white--text font-weight-bold title">VueRailsToDo</v-toolbar-title>
      </v-toolbar>
    </div>
    <v-container fluid>
      <v-dialog width="500" v-model="createToDoDialog">
        <template #activator="{ on }">
          <v-btn fab large color="success" class="btn" v-on="on">
            <v-icon dense>mdi-playlist-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            ToDoを作成する
          </v-card-title>
          <v-card-text>
            <ToDoForm ref="ToDoForm" @add="addToDo"/>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="primary" color="primary" @click="createToDo">
              Create
            </v-btn>
            <v-btn color="primary" outlined @click="createToDoDialog = false">
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
  </v-app>
</template>

<script>
import axios from 'axios'
import { reject, filter } from 'lodash'
import ToDoTable from '../to_dos/c-ToDoTable'
import ToDoForm from '../to_dos/c-ToDoForm'

export default {
  components: {
    ToDoTable,
    ToDoForm,
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
        },
        {
          text: '',
          value: 'action',
          sortable: false,
        }
      ],
      toDos: [],
      activeTab: 'toDo',
      createToDoDialog: false,
      // editToDoDialog: false
    }
  },
  created() {
    axios.get('/api/v1/to_dos').then(res => {
      this.toDos = res.data
    })
  },
  methods: {
    destroyToDo(id) {
      axios.delete('/api/v1/to_dos/' + id).then(res => {
        if (res.status === 200) {
          this.toDos = reject(this.toDos, ['id', id])
        }
      })
    },
    updateToDo(id, finished) {
      axios.patch('/api/v1/to_dos/' + id, { to_do: { finished } }).then(res => {
        if (res.status === 200) {
          console.log(res)
        }
      })
    },
    // editToDo(item){
    //   this.$refs.ToDoForm.editToDo(item)
    //   this.createToDoDialog = true
    // },
    filter(toDos, finished) {
      return filter(toDos, ['finished', finished])
    },
    createToDo() {
      this.createToDoDialog = false
      this.$refs.ToDoForm.createToDo()
    },
    addToDo(toDo) {
      this.toDos.push(toDo)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn{
  position: fixed;
  z-index: 1;
  right: 16px;

  @media screen and (min-width:601px) {
    top: 16px;
  }

  @media screen and (max-width:600px) {
    bottom: 16px;
  }
}

.center{
  display: flex;
  justify-content: center;
}
</style>
