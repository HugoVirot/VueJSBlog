<template>
  <form id="form" @submit="checkForm" method="post">
    <p v-if="errors.length" class="text-danger">
    <b>Merci de corriger les erreurs suivantes</b>
    <ul>
      <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
    </ul>
  </p>

    <p>
      <label for="title">Titre</label>
      <input id="title" v-model="titre" type="text" name="title" />
    </p>

    <p>
      <label for="pseudo">Pseudo</label>
      <input id="pseudo" v-model="pseudo" type="text" name="pseudo" />
    </p>

    <p>
      <label for="ville">Ville</label>
      <input id="ville" v-model="ville" type="text" name="ville" />
    </p>

    <p>
      <label for="pays">Pays</label>
      <input id="pays" v-model="pays" type="text" name="pays" />
    </p>

    <p>
      <label for="texteMessage">Message</label>
      <input
        id="texteMessage"
        v-model="texteMessage"
        type="text"
        name="texteMessage"
      />
    </p>

    <p>
      <label for="image">Image</label>
      <input id="image" v-model="image" type="text" name="image" />
    </p>

    <p>
      <label for="tags">Tags</label>
      <input id="tags" v-model="tags" type="text" name="tags" />
    </p>

    <p>
      <input type="submit" value="Submit" />
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
          "https://crudcrud.com/api/37d381a0c645446688a381bb70ccf87d/messages",
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