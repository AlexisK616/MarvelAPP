<template>
  <div class="home">
    <h1>Marvel App</h1>
    <CharacterContainer/>
  </div>
</template>

<script>
import CharacterContainer from './CharacterContainer.vue';
export default {
  name: 'HomePage',
  components: {
    CharacterContainer
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ed1d24;
  height: 100%;
  color: #fff;
  font-family: 'Arial', sans-serif;
}
h1 {
  font-size: 48px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>