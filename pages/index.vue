<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm8>
      <v-card min-width="400">
        <!--SNACKBAR-->
        <v-snackbar
          v-model="snackbar"
          :timeout="6000"
          top
        >
          {{ message }}
          <v-btn
            color="pink"
            flat
            @click="snackbar = false"
          >
            Fermer
          </v-btn>
        </v-snackbar>

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
      snackbar: false,
      message: '',
      name: '',
      nameRules: [
        v => !!v || 'Le nom est requis',
        v => (v && v.length <= 10) || 'Le nom doit comporter moins de 10 caractères.'
      ],
      room: '',
      roomRules: [v => !!v || 'Chambre est requis']
    }),
    mounted() {
      const {message} = this.$route.query;
      if (message === 'noUser') {
        this.message = "Connecter vous."
      } else if (message === 'leftChat') {
        this.message = "Vous avez quittez la conversation."
      }
      this.snackbar = !!this.message;

    },
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
              console.error('userJoined from index.vue: ', data)
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
