<template>
  <v-app id="app">
    <v-form
      :model="toDo"
      :action="toDo.action"
      method="post">

      <v-text-field
        class="d-none"
        :value="toDo.csrfToken"
        name="authenticity_token"
      />

      <v-text-field
        v-model="toDo.title"
        name="to_do[title]"
        label="title"
      />

      <v-text-field
        class="d-none"
        v-model="toDo.expiredAt"
        name="to_do[expired_at]"
      />

      <v-datetime-picker
        v-model="toDo.expiredAt"
        @input="format"
        date-format="yyyy/MM/dd"
        label="expiredAt"
      />

      <v-btn
        type="primary"
        native-type="submit">create
      </v-btn>
    </v-form>
  </v-app>
</template>

<script>
import moment from "moment";
moment.locale('ja')

export default {
  data() {
    return {
      toDo: {
        csrfToken: document.getElementsByName('csrf-token')[0].content,
        title: '',
        expiredAt: '',
        action: '/to_dos'
      },
      test: '',
    }
  },
  methods: {
    format: function() {
      this.toDo.expiredAt = moment(this.toDo.expiredAt).format('YYYY/MM/DD HH:mm')
    }
  }
}
</script>
