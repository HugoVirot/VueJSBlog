<template>
  <div v-for="message in messages" :key="message._id">
    <div class="card m-auto bg-secondary text-light p-5 m-3" style="width: 70vw">
      <div class="card-title ">
        <h2>{{ message.titre }}</h2>
        <h5>#{{ message.tags }}</h5>
      </div>
      <div class="card-img-top" v-if="typeof message.image !== 'undefined'">
        <img style="width: 50vw" :src="message.image" alt="messageImage" />
      </div>
      <div class="card-body">
        <p>{{ message.pseudo }} ({{ message.ville }}, {{ message.pays }})</p>
        <p class="bg-light text-secondary p-5">"{{ message.texteMessage }}"</p>

        <p>posté le : {{ moment(message.date).format("DD.MM.YYYY [&nbsp;] HH:mm") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "Message",
  props: ["message"],
  created: function () {
    this.moment = moment;
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
