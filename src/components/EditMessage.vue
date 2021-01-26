// <template>
  
// </template>

// <script>
// import axios from "axios";

// export default {
//   name: "EditMessage",

// //   props: [
// //     "_id",
// //     "titre",
// //     "pseudo",
// //     "ville",
// //     "pays",
// //     "texteMessage",
// //     "image",
// //     "tags",
// //   ],

//   data() {
//     return {
//       id: this._id,
//       titre: this.titre,
//       pseudo: this.pseudo,
//       ville: this.ville,
//       pays: this.pays,
//       texteMessage: this.texteMessage,
//       image: this.image,
//       tags: this.tags,
//     };
//   },

//   methods: {
//     checkForm2: function (e) {
//       e.preventDefault();

//       if (
//         this.titre &&
//         this.pseudo &&
//         this.ville &&
//         this.pays &&
//         this.texteMessage &&
//         this.tags
//       ) {
//         this.updateMessage();
//       }

//       this.errors = [];

//       if (!this.titre) {
//         this.errors.push("Titre requis!");
//       }
//       if (!this.pseudo) {
//         this.errors.push("Pseudo requis.");
//       }
//       if (!this.ville) {
//         this.errors.push("Ville requis.");
//       }
//       if (!this.pays) {
//         this.errors.push("Pays requis.");
//       }
//       if (!this.texteMessage) {
//         this.errors.push("Message requis.");
//       }
//       if (!this.tags) {
//         this.errors.push("Tags requis.");
//       }
//     },

//     updateMessage() {
//       let message = {
//         titre: this.titre,
//         pseudo: this.pseudo,
//         ville: this.ville,
//         pays: this.pays,
//         texteMessage: this.texteMessage,
//         image: this.image,
//         tags: this.tags,
//         date: new Date(),
//       };
//       console.log(message);
//       axios
//         .put(
//           "https://crudcrud.com/api/58da884075c845edb74743a3e91a7a1c/messages",
//           message
//         )
//         .then(() => {
//           alert("message envoyé !");
//           location.reload();
//         })
//         .catch(console.log("échec de l'envoi"));
//     },
//   },
// };
// </script>