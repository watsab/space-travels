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
    <tr v-for="traveler in store.travelers" :key="traveler.id">
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
import { inject, watch } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import nProgress from 'nprogress';

interface Props {
  page: number;
}
const props = defineProps<Props>();
const { getAll } = useTravelersManager();

const store = inject('store');
const { push } = useRouter();

watch(() => props.page, async (value) => {
  nProgress.start();
  try {
    store.travelers = await getAll(value);
  } catch (error) {
    await push({ name: 'networkError' });
  } finally {
    nProgress.done();
  }
})

onBeforeRouteLeave(() => {
  return window.confirm('Vous êtes sur le point de quitter la page. Etes-vous sûr ?')
})

</script>

<style scoped>
.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
</style>
