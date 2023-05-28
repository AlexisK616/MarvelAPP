<template>
    <div>
        <h2>Add Character</h2>
        <form @submit.prevent="addCharacter">
            <input type="text" v-model="newCharacterName" placeholder="Character name" required class="input-field">
            <button type="submit" class="add-button">Add</button>
        </form>

        <form v-if="editMode" @submit.prevent="saveCharacter">
            <h2>Edit Character</h2>
            <input type="text" v-model="editedCharacter.name" required class="input-field">
            <button type="submit" class="save-button">Save</button>
        </form>
        <h2>Characters</h2>
        <ul>
            <li v-for="character in localCharacters" :key="character.id">
                {{ character.name }}
                <button class="edit-button" @click="editCharacter(character)">Edit</button>
                <button class="delete-button" @click="deleteCharacter(character.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    props: {
        characters: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            localCharacters: [],
            newCharacterName: "",
            editMode: false,
            editedCharacter: null
        };
    },
    created() {
        this.loadCharacters();
    },
    watch: {
        characters: {
            immediate: true,
            handler(newCharacters) {
                this.localCharacters = [...newCharacters];
            },
        },
    },
    methods: {
        loadCharacters() {
            const storedCharacters = this.getStoredCharacters();
            if (storedCharacters) {
                this.localCharacters = [...storedCharacters];
            } else {
                this.localCharacters = [...this.characters];
            }
        },
        addCharacter() {
            const newCharacter = {
                id: this.getNextCharacterId(),
                name: this.newCharacterName,
            };
            this.localCharacters.push(newCharacter);
            this.newCharacterName = "";
            this.storeCharacters(this.localCharacters);
        },
        editCharacter(character) {
            this.editMode = true;
            this.editedCharacter = { ...character };
        },
        saveCharacter() {
            const index = this.localCharacters.findIndex((c) => c.id === this.editedCharacter.id);
            if (index !== -1) {
                this.localCharacters[index] = this.editedCharacter;
                this.editMode = false;
                this.editedCharacter = null;
                this.storeCharacters(this.localCharacters);
            }
        },
        deleteCharacter(id) {
            this.localCharacters = this.localCharacters.filter((c) => c.id !== id);
            this.storeCharacters(this.localCharacters);
        },
        getNextCharacterId() {
            const storedCharacters = this.getStoredCharacters();
            if (storedCharacters && storedCharacters.length > 0) {
                const lastCharacter = storedCharacters[storedCharacters.length - 1];
                return lastCharacter.id + 1;
            } else {
                return 1;
            }
        },
        getStoredCharacters() {
            const storedData = localStorage.getItem("characters");
            return storedData ? JSON.parse(storedData) : null;
        },
        storeCharacters(characters) {
            localStorage.setItem("characters", JSON.stringify(characters));
        },
    },
};
</script>
  
  
  
<style scoped>
.info-button,
.edit-button,
.delete-button,
.add-button,
.save-button {
    background-color: #ed1d24;
    color: #fff;
    border: none;
    padding: 8px 12px;
    margin-left: 5px;
    cursor: pointer;
    font-weight: bold;
    border-radius: 4px;
}

.input-field {
    padding: 8px 12px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 200px;
}

.add-button,
.save-button {
    margin-top: 10px;
}

.add-button:hover,
.save-button:hover,
.edit-button:hover,
.delete-button:hover {
    background-color: #bf1d24;
}
</style>
  

  