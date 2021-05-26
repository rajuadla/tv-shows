<template>
  <div class="error-handler" v-if="message">
    <div class="alert alert-danger " role="alert">
      <div>Somthing went wrong please contact the site administrator at tvshows@example.com !!!</div>
      <div> Click on <span><button @click="goTo()" class="btn btn-link">Home</button></span> </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorHandler',
  props: { message: { required: true } },
  methods: {
    goTo () {
      this.$store.commit('setErrorHandler', '')
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
