<template>
<Header />
  <img
    class="w-50 m-5"
    alt="headerimage"
    src="./assets/learn-web-development.jpg"
  />
  <Form/>
  <MessagesList :messages="messages" />
</template>

<script>
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import MessagesList from "./components/MessagesList.vue";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      messages: [],
    };
  },
  components: {
    Header,
    Form,
    MessagesList,
  },
  methods: {
    getData(component) {
      axios
        .get(
          "https://crudcrud.com/api/37d381a0c645446688a381bb70ccf87d/messages"
        )
        .then(function (response) {
          console.log("messages récupérés");
          component.messages = response.data;
          console.log(component.messages);
        })
        .catch(console.log("échec récupération messages"));
    },
  },
  created() {
    this.getData(this);
  },
};
</script>

<style>
#app {
  font-family: 'Courier New', Courier, monospace, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
