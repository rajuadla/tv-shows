<template>
  <div class="error-handler" v-if="message">
    <div class="alert alert-danger d-flex align-items-center" role="alert">
      <div>Somthing went wrong please refresh the page and try again!!!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorHandler',
  props: { message: { required: true } }
}
</script>
