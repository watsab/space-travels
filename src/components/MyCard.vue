<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>

    <div class="card-body">
      <slot name="body"></slot>
    </div>


    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>



<style scoped>
.card {
  max-width: 500px;
  background-color: var(--vt-c-white);
  border-radius: 20px;
  margin: auto;
  padding: 20px;

  & .card-header {
    margin-bottom: 10px;
  }

  & .card-body {
    padding: 30px 0;
  }

  & .card-footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
