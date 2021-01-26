<template>
  <div v-if="$route.path == '/'">
    <div v-for="message in messages" :key="message._id">
      <div
        class="card m-auto bg-secondary text-light p-5 m-3"
        style="width: 70vw"
      >
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
          <!-- 
        <button class="btn btn-info" @click="showEditForm(message._id)">
          Modifier<i class="fas fa-edit fa-2x"></i>
        </button>
      </div> -->

          <router-link :to="`/EditMessage/${message._id}`">
            <!-- <router-link :to="'EditMessage/' + message._id"> -->
            <button class="btn btn-info">
              Modifier<i class="fas fa-edit fa-2x"></i>
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- <form class="container w-50 pb-3 border border-info mb-5 mt-5" 
            :id="'editForm' + message._id" @submit="checkEditForm"
            style="display: none" 
            method="put"> -->

    <!-- formulaire modif message -->
    <!-- 
            <h2 class="p-3 pb-5">Modifier un message </h2>

            <p v-if="errors.length" class="text-danger">
            <b>Merci de corriger les erreurs suivantes</b>
            <ul>
              <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
            </ul>
            </p>

            <input type="hidden" name="id" v-model="message.id">
            <div class="row justify-content-around p-2">
              <label for="message.titre">Titre</label>
              <input id="message.titre" v-model="message.titre" type="text" name="message.titre" />
            </div>

            <div class="row justify-content-around p-2">
              <label for="pseudo">Pseudo</label>
              <input id="pseudo" v-model="message.pseudo" type="text" name="pseudo" />
            </div>

            <div class="row justify-content-around p-2">
              <label for="ville">Ville</label>
              <input id="ville" v-model="message.ville" type="text" name="ville" />
            </div>

            <div class="row justify-content-around p-2">
              <label for="pays">Pays</label>
              <input id="pays" v-model="message.pays" type="text" name="pays" />
            </div>

            <div class="row justify-content-around p-2">
              <label for="texteMessage">Message</label>
              <textarea
                id="texteMessage"
                v-model="message.texteMessage"
                name="texteMessage"
              />
            </div>

            <div class="row justify-content-around p-2">
              <label for="image">Image</label>
              <input id="image" v-model="message.image" type="text" name="image" />
            </div>

            <div class="row justify-content-around p-2">
              <label for="tags">Tags</label>
              <input id="tags" v-model="message.tags" type="text" name="tags" />
            </div>

            <p>
              <input type="submit" value="Envoyer" class="mt-5 m-3 pr-4 pl-4" />
            </p>
          </form> -->
    <!-- <EditMessage
          v-model:_id="message._id"
          v-model:titre="message.titre"
          v-model:pseudo="message.pseudo"
          v-model:ville="message.ville"
          v-model:pays="message.pays"
          v-model:texteMessage="message.texteMessage"
          v-model:image="message.image"
          v-model:tags="message.tags"
        /> -->
  </div>
  <div v-else>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
// import EditMessage from "./EditMessage.vue"

export default {
  name: "MessagesList",
  // components: {
  //   EditMessage
  // },
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
    showEditForm(messageID) {
      let formName = "editForm" + messageID;
      let form = document.getElementById(formName);
      if (form.style.display == "none") {
        form.style.display = "block";
      } else {
        form.style.display = "none";
      }
    },
    deleteMessage(messageId) {
      console.log(messageId);
      axios
        .delete(
          "https://crudcrud.com/api/e4892fdf731d411395d4b3e3a24ba410/messages/" +
            messageId
        )
        .then(() => {
          alert("message supprimé !");
          location.reload();
        })
        .catch(console.log("échec de la suppression"));
    },

    checkEditForm: function (e) {
      e.preventDefault();

      // if (
      //   this.titre &&
      //   this.pseudo &&
      //   this.ville &&
      //   this.pays &&
      //   this.texteMessage &&
      //   this.tags
      // ) {
      this.updateMessage();
    },

    // this.errors = [];

    // if (!this.titre) {
    //   this.errors.push("Titre requis!");
    // }
    // if (!this.pseudo) {
    //   this.errors.push("Pseudo requis.");
    // }
    // if (!this.ville) {
    //   this.errors.push("Ville requis.");
    // }
    // if (!this.pays) {
    //   this.errors.push("Pays requis.");
    // }
    // if (!this.texteMessage) {
    //   this.errors.push("Message requis.");
    // }
    // if (!this.tags) {
    //   this.errors.push("Tags requis.");
    // }

    updateMessage() {
      // let message = {
      //   id: this.message.id,
      //   titre: this.message.titre,
      //   pseudo: this.message.pseudo,
      //   ville: this.message.ville,
      //   pays: this.message.pays,
      //   texteMessage: this.message.texteMessage,
      //   image: this.message.image,
      //   tags: this.message.tags,
      //   date: new Date(),
      // };
      console.log("message après modif");
      let message = {
        id: this.id,
        titre: this.titre,
        pseudo: this.pseudo,
        ville: this.ville,
        pays: this.pays,
        texteMessage: this.texteMessage,
        image: this.image,
        tags: this.tags,
        date: new Date(),
      };
      console.log(message);
      axios
        .put(
          "https://crudcrud.com/api/e4892fdf731d411395d4b3e3a24ba410/messages/" +
            this.id,
          message
        )
        .then(() => {
          alert("message modifié !");
          location.reload();
        })
        .catch(console.log("échec de la modification"));
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
