<template>
  <b-button-toolbar class="my-2 ml-2">
    <b-btn variant="outline-primary" class="mr-2" @click="$emit('create-class')">Opret</b-btn>
    <b-btn variant="outline-primary" class="mr-2" @click="$emit('rename-class')" disabled>Omdøb</b-btn>
    <b-btn variant="outline-primary" class="mr-2" @click="$emit('delete-class')">Slet</b-btn>
    <b-btn variant="outline-primary" class="mr-2" @click="$emit('map-class')" disabled>Sammenkobl</b-btn>
  </b-button-toolbar>
</template>

<script>
export default {
  name: 'ClassActions'
}
</script>
