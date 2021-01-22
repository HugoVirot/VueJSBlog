<template>
  <div v-for="unicorn in unicorns" :key="unicorn._id">
    <p>{{ unicorn.name }}</p>
    <p>{{ unicorn.age }}</p>
    <p>{{ unicorn.colour }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      unicorns: [],
    };
  },
  props: {
    msg: String,
  },
  methods: {
    getData(component) {
      axios
        .get(
          "https://crudcrud.com/api/addf3192190444b6a72df85cc11f0dd2/unicorns"
        )
        .then(function (response) {
          console.log("licornes récupérées")
          component.unicorns = response.data;
          console.log(response.data);
        })
        .catch(console.log("échec requête"));
    },
    sendData() {
      var licorne = {
        name: "machin",
        age: 3,
        colour: "black",
      };
      axios
        .post(
          "https://crudcrud.com/api/addf3192190444b6a72df85cc11f0dd2/unicorns",
          licorne
        )
        .then(() => {
          console.log("licorne créée");
        })
        .catch(console.log("échec création"));
    },
  },
  created() {
    this.getData(this);
    this.sendData();
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
