<template>
  <div>
    <h1>Marvel Characters</h1>
    <CharacterList :characters="characters" @selectCharacter="selectCharacter" />
  </div>
</template>

<script>
import CharacterList from './CharacterList.vue';
import axios from 'axios';
import md5 from 'md5';

export default {
  data() {
    return {
      characters: [],
      selectedCharacter: null,
    };
  },
  created() {
    this.fetchCharacters();
  },
  methods: {
    fetchCharacters() {
      const publicKey = 'b2644689a62190f557c7452f5318b6cd';
      const privateKey = 'c19a2dfc169f5d0c265429b28372cd5a80f58514';
      const timestamp = new Date().getTime();
      const hash = md5(`${timestamp}${privateKey}${publicKey}`);
      
      const apiUrl = 'https://gateway.marvel.com/v1/public/characters';
      const params = {
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
      };
      
      axios.get(apiUrl, { params })
        .then(response => {
          this.characters = response.data.data.results;
        })
        .catch(error => {
          console.error(error);
        });
    },
    selectCharacter(character) {
      this.selectedCharacter = character;
    },
  },
  components: {
    CharacterList
  },
};
</script>
