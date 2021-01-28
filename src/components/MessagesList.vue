<template>
  <div v-if="$route.path == '/'">
    <div v-for="message in messages" :key="message._id">
      <div class="card m-auto bg-info text-light p-5 mb-5" style="width: 70vw">
        <div class="card-title">
          <h2 class="mb-5">{{ message.titre }}</h2>
          <h5>#{{ message.tags }}</h5>
        </div>

        <div class="card-img-top" v-if="typeof message.image !== 'undefined'">
          <img style="width: 50vw" :src="message.image" alt="imageDuMessage" />
        </div>

        <div class="card-body">
          <p>
            <b>{{ message.pseudo }}</b> ({{ message.ville }},
            {{ message.pays }})
          </p>
          <p class="bg-light text-secondary p-5">
            "{{ message.texteMessage }}"
          </p>
          <p>
            posté le :
            {{ moment(message.date).format("DD.MM.YYYY [&nbsp;] HH:mm") }}
          </p>
        </div>

        <div class="row justify-content-around d-flex">
          <button
            class="btn btn-danger"
            v-on:click="deleteMessage(message._id)"
          >
            Supprimer<i class="fas fa-trash fa-2x"></i>
          </button>

          <router-link :to="`/EditMessage/${message._id}`">
            <button class="btn btn-secondary">
              Modifier<i class="fas fa-edit fa-2x"></i>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "MessagesList",
  props: ["messages"],
  created: function () {
    this.moment = moment;
  },
  data() {
    return {
      errors: [],
      titre: null,
      pseudo: null,
      ville: null,
      pays: null,
      texteMessage: null,
      image: null,
      tags: null,
    };
  },
  methods: {
    deleteMessage(messageId) {
      console.log(messageId);
      axios
        .delete(
          "https://crudcrud.com/api/27252097f58b4e0dba92c753a9e2b7ba/messages/" +
            messageId
        )
        .then(() => {
          alert("message supprimé !");
          location.reload();
        })
        .catch(console.log("échec de la suppression"));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
