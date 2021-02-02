<template>
  <v-app id="app">
    <v-form
      :model="toDo"
      :action="toDo.action"
      method="post">
      <v-text-field
        type="hidden"
        :value="toDo.csrfToken"
        name="authenticity_token">
      </v-text-field>
      <v-text-field
        v-model="toDo.title"
        name="to_do[title]">
      </v-text-field>

      <!-- <v-date-picker
        type="datetime"
        format="yyyy/MM/dd HH:mm"
        value-format="yyyy/MM/dd HH:mm"
        placeholder="期限を選択"
        v-model="toDo.expiredAt"
        name="to_do[expired_at]" /> -->

        <v-datetime-picker v-value="toDo.expiredAt" date-format="yyyy/MM/dd" />
      <div>Datetime value: {{ toDo.expiredAt|dateFormat }}</div>

      <v-btn
        type="primary"
        native-type="submit">作成
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
  filters:{
    dateFormat: function(value){
      if(value != ''){
        return moment(value).format('YYYY/MM/DD hh:mm');
      }
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
