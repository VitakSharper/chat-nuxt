<template>
    <div class="c-wrap">
        <div class="c-chat">
            <ul>
                <li v-for="mes in messages" :key="mes.text">{{mes.text}}</li>
            </ul>
        </div>
        <div class="c-form"></div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    middleware: ['chat'],
    head() {
      return {
        title: `Chambre ${this.user.room}`
      }
    },
    computed: mapState(['user', 'messages'])

  }
</script>

<style scoped>
    .c-wrap {
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .c-form {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        height: 80px;
        background: #212121;
    }

    .c-chat {

    }
</style>
