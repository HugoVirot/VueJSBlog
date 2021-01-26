<template>
<div>        
    <form class="container w-50 pb-3 border border-info mb-5 mt-5" 
            :id="'editForm' + message._id" @submit="checkEditForm"
            method="put">

            <h2 class="p-3 pb-5">Modifier un message </h2>

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
          "https://crudcrud.com/api/e4892fdf731d411395d4b3e3a24ba410/messages/" +
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
      this.updateMessage();
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
          "https://crudcrud.com/api/e4892fdf731d411395d4b3e3a24ba410/messages/" + this.id,
          message
        )
        .then(() => {
          alert("message modifié avec succès !");
        this.$router.push({ name: 'Home' })
        })
        .catch(console.log("échec de l'envoi"));
    },
  },
  created() {
    this.getMessage(this);
  },
};
</script>