export const state = () => ({
  user: {},
  messages: []

});

export const mutations = {
  setUser(state, user) {
    state.user = user;
    console.log('Mutations User: ', state.user)
  },
  clearData(state) {
    state.user = {};
    state.messages = []
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message)
    console.log('Message: ', state.messages)
  }
};
