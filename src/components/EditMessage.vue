<template>
<div>        
    <form class="container w-50 pb-3 border border-info mb-5 mt-5" 
            @submit="checkEditForm"
            method="put">

            <h2 class="p-3 pb-2">Modifier un message </h2>

          <router-link to="/">
          <button class="btn btn-warning mb-4">Annuler la modification</button>
          </router-link>

            <p v-if="errors.length" class="text-danger">
            <b>Merci de corriger les erreurs suivantes</b>
            <ul>
              <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
            </ul>
            </p>

            <input type="hidden" name="id" v-model="message.id">
            <div class="row justify-content-around p-2">
              <label for="titre">Titre</label>
              <input id="titre" v-model="titre" type="text" name="titre" />
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
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditMessage",

  data() {
    return {
      id: this.$route.params.id,
      message: {},
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
    getMessage(component) {
      axios
        .get(
          "https://crudcrud.com/api/27252097f58b4e0dba92c753a9e2b7ba/messages/" +
            component.id
        )
        .then(function (response) {
          console.log("message récupéré");
          let message = response.data;
          console.log(message);
          component.titre = message.titre;
          component.pseudo = message.pseudo;
          component.pays = message.pays;
          component.ville = message.ville;
          component.texteMessage = message.texteMessage;
          component.image = message.image;
          component.tags = message.tags;
        })
        .catch(console.log("échec récupération message"));
    },

    checkEditForm: function (e) {
      e.preventDefault();

      if (this.titre && this.texteMessage && this.tags) {
        this.updateMessage();
      }

      this.errors = [];

      if (!this.titre) {
        this.errors.push("Titre requis!");
      }
      if (!this.texteMessage) {
        this.errors.push("Message requis.");
      }
      if (!this.tags) {
        this.errors.push("Tags requis.");
      }
    },

    updateMessage() {
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
      console.log("message après modifs :" + message);
      axios
        .put(
          "https://crudcrud.com/api/27252097f58b4e0dba92c753a9e2b7ba/messages/" +
            this.id,
          message
        )
        .then(() => {
          alert("message modifié avec succès !");
          window.location.href = "http://localhost:8080/";
        })
        .catch(console.log("échec de l'envoi"));
    },
  },
  created() {
    this.getMessage(this);
  },
};
</script>