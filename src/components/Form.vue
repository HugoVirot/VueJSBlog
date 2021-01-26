<template>
  <form class="container w-25 pb-3 border border-info mb-5" id="form" @submit="checkForm" method="post">
    <h2 class="p-3 pb-5">C'est par ici ! </h2>
    <p v-if="errors.length" class="text-danger">
    <b>Merci de corriger les erreurs suivantes</b>
    <ul>
      <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
    </ul>
  </p>                                     

    <div class="row justify-content-around p-2">
      <label for="title">Titre</label>
      <input id="title" v-model="titre" type="text" name="title" />
    </div>

    <div class="row justify-content-around p-2">
      <label for="pseudo">Pseudo</label>
      <input id="pseudo" v-model="pseudo" type="text" name="pseudo" />
    </div>

    <div class="row justify-content-around p-2">
      <label for="ville">Ville</label>
      <input id="ville" v-model="ville" type="text" name="ville" />
    </div>

    <div class="row justify-content-around p-2">
      <label for="pays">Pays</label>
      <input id="pays" v-model="pays" type="text" name="pays" />
    </div>

    <div class="row justify-content-around p-2">
      <label for="texteMessage">Message</label>
      <textarea
        id="texteMessage"
        v-model="texteMessage"
        name="texteMessage"
      />
    </div>

    <div class="row justify-content-around p-2">
      <label for="image">Image</label>
      <input id="image" v-model="image" type="text" name="image" />
    </div>

    <div class="row justify-content-around p-2">
      <label for="tags">Tags</label>
      <input id="tags" v-model="tags" type="text" name="tags" />
    </div>

    <p>
      <input type="submit" value="Envoyer" class="mt-5 m-3 pr-4 pl-4" />
    </p>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Form",
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
    checkForm: function (e) {

      e.preventDefault();
      
      if (
        this.titre &&
        this.pseudo &&
        this.ville &&
        this.pays &&
        this.texteMessage &&
        this.tags
      ) {
        this.sendMessage();
      }

      this.errors = [];

      if (!this.titre) {
        this.errors.push("Titre requis!");
      }
      if (!this.pseudo) {
        this.errors.push("Pseudo requis.");
      }
      if (!this.ville) {
        this.errors.push("Ville requis.");
      }
      if (!this.pays) {
        this.errors.push("Pays requis.");
      }
      if (!this.texteMessage) {
        this.errors.push("Message requis.");
      }
      if (!this.tags) {
        this.errors.push("Tags requis.");
      }
    },

    sendMessage() {
      let message = {
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
        .post(
          "https://crudcrud.com/api/e4892fdf731d411395d4b3e3a24ba410/messages",
          message
        )
        .then(() => {
          alert("message envoyé !");
          location.reload()
        })
        .catch(console.log("échec de l'envoi"));
    },
  },
};
</script>