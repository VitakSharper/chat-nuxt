<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm8>
      <v-card min-width="400">
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
  import {mapMutations} from 'vuex'

  export default {
    layout: "empty",
    head: {
      title: 'Bienvenue dans NUXT CHAT'
    },
    sockets: {
      connect: function () {
        console.log("Socket connected")
      }
    },
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
      ...mapMutations(['setUser']),
      message() {
        this.$socket.emit('createMessage', {
          text: 'FROM CLIENT'
        })
      },
      submit() {
        if (this.$refs.form.validate()) {
          const user = {
            name: this.name,
            room: this.room
          };

          this.$socket.emit('userJoined', user, (data) => {
            if (typeof data === 'string') {
              console.error('userJoined from index.vue: ',data)
            } else {
              user.id = data.userId;
              this.setUser(user);
              this.$router.push("/chat");
            }
          });
        }
      },
    }
  }
</script>
