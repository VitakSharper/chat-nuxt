<template>
    <v-flex xs12>
        <v-text-field
                label="Entrer votre message."
                outline
                v-model="text"
                @keydown.enter="send"
        />
    </v-flex>
</template>

<script>
  export default {
    data: () => ({
      text: ''
    }),
    methods: {
      send() {
        this.$socket.emit('createMessage', {
          text: this.text,
          id: this.$store.state.user.id
        }, data => {
          if (typeof data === String) {
            console.error(data)
          } else {
            this.text = ''
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>