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
  }
};

export const actions = {
  SOCKET_newMessage(context, data) {
    console.log('Message received: ', data)
  }
}
