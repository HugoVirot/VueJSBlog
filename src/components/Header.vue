<template>
<header class="bg-secondary text-light p-5">
  <router-link id="link" to="/">
  <i class="fas fa-7x fa-laptop-code"></i>
  </router-link>
  <h1 class="p-3"><b>T</b>he <b>W</b>eb <b>D</b>evelopers <b>C</b>lub</h1>
  <h5>Share your learning experience</h5>
</header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
#link {
  text-decoration: none; 
  color: inherit
}
</style>