<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm8>
      <v-card>
        <v-card-title>
          <h1>NUXT CHAT</h1>
        </v-card-title>
        <v-card-text>
          <!--FORM-->
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Votre Nom"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Entrez dans le chat"
              required
            ></v-text-field>


            <v-btn
              :disabled="!valid"
              color="primamry"
              @click="submit"
            >
              Valider
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    sockets: {
      connect: function () {
        console.log("Socket connected")
      }
    },
    layout: "empty",
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Le nom est requis',
        v => (v && v.length <= 10) || 'Le nom doit comporter moins de 10 caractères.'
      ],
      room: '',
      roomRules: [v => !!v || 'Chambre est requis']
    }),

    methods: {
      message() {
        this.$socket.emit('createMessage', {
          text: 'FROM CLIENT'
        })
      },
      submit() {
        if (this.$refs.form.validate()) {
        }
      },
    }
  }
</script>
