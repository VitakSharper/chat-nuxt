<template>
  <h1>Chat Page {{user.name}}</h1>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    middleware: ['chat'],
    head() {
      return {
        title: `Chambre ${this.user.room}`
      }
    },
    computed: mapState(['user'])

  }
</script>

<style scoped>

</style>
