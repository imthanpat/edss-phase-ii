<template>
    <v-breadcrumbs :items="items">
      <template v-slot:title="{ item }">
        {{ item.title.toUpperCase() }}
      </template>
    </v-breadcrumbs>
  </template>
  <script>
    export default {
      data: () => ({
        items: [
          {
            title: 'Main Menu',
            disabled: false,
          },
          {
            title: 'False Management Config',
            disabled: false,
          },
          {
            title: 'Alarm Theshold',
            disabled: true,

          },
        ],
      }),
    }
  </script>