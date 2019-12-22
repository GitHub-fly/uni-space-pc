<template>
  <v-container class="px-0" fluid>
   	<v-switch
   	  v-model="permissionBtnStatus"
   	  :label="`Switch 1: ${permissionBtnStatus.toString()}`"
   	></v-switch>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        permissionBtnStatus: true,
      }
    },
  }
</script>