<template>
  <div class="error-handler" v-if="message">
    <div class="alert alert-danger d-flex align-items-center" role="alert">
      <svg
        class="bi flex-shrink-0 me-2"
        width="24"
        height="24"
        role="img"
        aria-label="Danger:"
      >
        <use xlink:href="#exclamation-triangle-fill" />
      </svg>
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
