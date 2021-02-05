<template>
  <div>
    <v-data-table :headers="headers" :items="items" class="table">
      <template #[`item.action`]="{ item }">
        <v-layout>
          <v-btn fab x-small color="primary" @click="$emit('edit', item)">
            <v-icon dense>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn fab x-small color="error" class="ml-8" @click="$emit('destroy', item.id)">
            <v-icon dense>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-layout>
      </template>
      <template #[`item.finished`]="{ item }">
        <v-checkbox
          v-model="item.finished"
          @change="$emit('update', item.id, item.finished)"
        ></v-checkbox>
      </template>
    </v-data-table>
  </div>
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
