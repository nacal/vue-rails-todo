<template>
  <div>
    <v-form :model="toDo">
      <v-text-field
        class="d-none"
        :value="toDo.csrfToken"
        name="authenticity_token"
      />

      <v-text-field v-model="toDo.title" name="to_do[title]" label="title" />

      <v-text-field
        v-model="toDo.expiredAt"
        class="d-none"
        name="to_do[expired_at]"
      />

      <v-datetime-picker
        v-model="toDo.expiredAt"
        date-format="yyyy/MM/dd"
        label="expiredAt"
        @input="format"
      />
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
moment.locale('ja')

export default {
  data() {
    return {
      toDo: {
        csrfToken: document.getElementsByName('csrf-token')[0].content,
        title: '',
        expiredAt: '',
        action: '/to_dos',
        finished: false
      },
    }
  },
  methods: {
    format() {
      this.toDo.expiredAt = moment(this.toDo.expiredAt).format(
        'YYYY/MM/DD HH:mm'
      )
    },
    createToDo() {
      axios
        .post('/api/v1/to_dos', {
          to_do: { title: this.toDo.title, expired_at: this.toDo.expiredAt }
        })
        .then(res => {
          switch (res.status) {
            case 201:
              this.$emit('add', res.data)
              this.toDo = { title: '', expiredAt: '' }
              break
            case 400:
              console.log(res.data.message)
              break
          }
        })
    },
    // editToDo(item){
    //   this.toDo.title = Object.assign({}, item).title
    //   this.toDo.expiredAt = Object.assign({}, item).expired_at
    //   this.toDo.finished = Object.assign({}, item).finished
    // }
  }
}
</script>
