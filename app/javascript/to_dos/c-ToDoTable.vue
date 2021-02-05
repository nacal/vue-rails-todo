<template>
  <v-app id="app">
    <v-data-table :headers="headers" :items="items" class="table">
      <template #[`item.delete`]="{ item }">
        <v-btn fab x-small color="error" @click="$emit('destroy', item.id)">
          <v-icon dense>mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
      <template #[`item.finished`]="{ item }">
        <v-checkbox
          v-model="item.finished"
          @change="$emit('update', item.id, item.finished)"
        ></v-checkbox>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  props: ['headers', 'items']
}
</script>

<style scoped>
.table {
  text-align: left;
}
</style>
