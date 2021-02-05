<template>
  <div>
    <v-data-table :headers="headers" :items="items" hide-default-header>
      <template #[`item.action`]="{ item }">
        <v-layout class="wd-right">
          <!-- <v-btn fab x-small color="grey lighten-2" @click="$emit('edit', item)">
            <v-icon dense>mdi-pencil-outline</v-icon>
          </v-btn> -->
          <v-btn fab x-small color="error" @click="$emit('destroy', item.id)">
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
      <template #[`item.title`]="{ item }">
        <h2>{{item.title}}</h2>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ['headers', 'items']
}
</script>

<style lang="scss" scoped>
.wd-right{
  justify-content: flex-end;
  display: flex;
  @media screen and (max-width:600px) {
    margin-bottom: 8px;
  }
}
</style>
