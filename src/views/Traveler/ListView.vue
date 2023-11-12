<template>
  <h2>Liste des voyageurs</h2>

  <table>
    <thead>
    <tr>
      <th>Prénom Nom</th>
      <th>Email</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="traveler in travelers" :key="traveler.id">
      <td>
        {{ traveler.name }}
      </td>
      <td>
        {{ traveler.email }}
      </td>
    </tr>
    </tbody>
  </table>

  <div class="pagination">
    <div>
      <router-link v-show="page > 1" :to="{name: 'travelers', query: { page: page - 1 }}" rel="prev">&#8592; Page précedente</router-link>
    </div>
    <div>
      <router-link :to="{name: 'travelers', query: { page: page + 1 }}" rel="next">Page suivante &#8594;</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTravelersManager } from '@/composable/useTravelersManager';
import { type Ref, ref, watchEffect } from 'vue';
import type { Traveler } from '@/models/Traveler';

interface Props {
  page: number;
}
const props = defineProps<Props>();
const travelers: Ref<Traveler[]> = ref([]);

const { getAll } = useTravelersManager();
watchEffect(async () => {
  travelers.value = await getAll(props.page);
})

</script>

<style scoped>
.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
</style>
