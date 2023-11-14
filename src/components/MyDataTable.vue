<template>
  <table>
    <thead>
    <tr>
      <slot name="header"></slot>
    </tr>
    </thead>
    <transition-group tag="tbody" name="slide-up" appear>
      <tr v-for="(item, index) in items" :key="index">
        <slot name="row" :item="item"></slot>
      </tr>
    </transition-group>
  </table>
</template>


<script setup lang="ts">
interface Props {
  items: any[];
}

defineProps<Props>()
</script>

<style>
table {
  margin-top: 30px;
  width: 100%;
  & tr {
    & th,
    & td {
      text-align: center;
    }
  }

  & thead {
    background-color: var(--vt-c-indigo);
    color: var(--vt-c-white-soft);


  }

  & tbody {
    & tr {
      background-color: var(--vt-c-white);
    }
  }
}

</style>
