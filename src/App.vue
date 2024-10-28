<script setup lang="ts">
import {Request} from '@/helpers/api'
import {reactive} from "vue";

let request = reactive(new Request('https://pokeapi.co/api/v2/pokemon/1', 0))


const sendRequest = (url: string) => {
  request.send(url)
}



</script>

<template>
  <v-app>
    <v-main>
      <header>Запросы {{request._ongoingRequests}}</header>
      <v-container>
        <v-btn @click="sendRequest('https://pokeapi.co/api/v2/pokemon/1')">Отправить запрос</v-btn>
        <v-btn @click="sendRequest('https://api.example.com/data')">Отправить
          запрос2
        </v-btn>
      </v-container>
    </v-main>
  </v-app>

</template>
