<template>
  <div class="data-not-found">
    <div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">No Data Found</h4>
      <p><slot /></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataNotFound'
}
</script>
