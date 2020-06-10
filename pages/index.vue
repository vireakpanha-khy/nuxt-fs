<template>
  <div class="flex flex-col h-screen items-center justify-center mx-2 sm:m-0">
    <p class="text-center">Hi, there! What's your name?</p>
    <input
      v-model="name"
      class="w-full sm:w-1/2 border-2 px-6 py-2 mt-2 rounded-lg text-center"
      type="text"
      placeholder="Enter Your Name"
      @input="validateName"
    />
    <p class="text-center text-red-500">{{ errorMessage }}</p>
    <p v-if="registered" class="text-center text-teal-500 mt-4 text-sm sm:text-base">
      <span class="font-bold">SUCCESS!</span>
      <a :href="url" class="bg-teal-200 text-gray-700 px-2 py-1 rounded-md">View Your Information</a>
    </p>

    <button
      v-if="!registered"
      :disabled="invalidName"
      class="w-full sm:w-1/2 flex justify-center bg-blue-500 text-white py-2 px-4 rounded-lg mt-5"
      @click="enter"
    >
      <Loading v-if="loading" />
      <span v-else>ENTER</span>
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import Loading from '../components/loading';

export default {
  components: {
    Loading
  },

  data() {
    return {
      name: '',
      status: '',
      url: 'https://nuxt-fs.now.sh/mixkielongernssssssssssssasddddddddddddddddddame',
      errorMessage: '',
      invalidName: false,
      registered: false,
      loading: false
    };
  },

  methods: {
    validateName() {
      if (this.name.includes(' ')) {
        this.errorMessage = 'Space is not allowed.';
        this.invalidName = true;
      } else {
        this.errorMessage = '';
        this.invalidName = false;
      }
    },

    async enter() {
      this.loading = true;
      const API_URL = process.env.NODE_ENV === 'development' ? process.env.SERVER_URL : '';
      await axios
        .post(`${API_URL}/api/register`, { name: this.name })
        .then((res) => {
          const response = res.data;
          if (response.message) {
            this.errorMessage = response.message;
          } else {
            this.registered = true;
            this.url = response.url;
          }
        })
        .catch((err) => {
          this.errorMessage = `Unable to register <${name}> at the moment.`;
          console.log(err);
        });
      this.loading = false;
    }
  }
};
</script>
