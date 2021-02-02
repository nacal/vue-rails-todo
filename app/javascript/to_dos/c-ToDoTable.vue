<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="table"
  >
    <template v-slot:[`item.delete`]="{ item }">
      <v-btn @click="$emit('destroy', item.id)" block>
        <v-icon dense>mdi-delete</v-icon>
      </v-btn>
    </template>
    <template v-slot:[`item.finished`]="{ item }">
      <v-checkbox
        v-model="item.finished"
        @change="$emit('update', item.id, item.finished)"
      ></v-checkbox>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: ['headers', 'items']
}
</script>

<style scoped>
.table{
  text-align: left;
}
</style>
