<template>
  <div>
    <h2 key="title">Liste des voyageurs</h2>

    <MyDataTable :items="travelers" key="table">
      <template #header>
        <th>Prénom Nom</th>
        <th>Email</th>
      </template>
      <template v-slot:row="{ item }: {item: Traveler}">
        <td>
          {{ item.name }}
        </td>
        <td>
          {{ item.email }}
        </td>
      </template>
    </MyDataTable>

    <div class="pagination" key="pagination">
      <div>
        <router-link v-show="page > 1" :to="{name: 'travelers', query: { page: page - 1 }}" rel="prev">&#8592; Page précedente</router-link>
      </div>
      <div>
        <router-link :to="{name: 'travelers', query: { page: page + 1 }}" rel="next">Page suivante &#8594;</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import nProgress from 'nprogress';
import { useStore } from '@/store';
import type { Traveler } from '@/models/Traveler';
import MyDataTable from '@/components/MyDataTable.vue';

interface Props {
  page: number;
}
const props = defineProps<Props>();

const store = useStore();
const { push } = useRouter();

watch(() => props.page, async (value) => {
  nProgress.start();
  try {
    await store.dispatch('travelers/fetchTravelers', value);
  } catch (error) {
    await push({ name: 'networkError' });
  } finally {
    nProgress.done();
  }
});

const travelers: ComputedRef<Traveler[]> = computed(() => {
  return store.state.travelers.items;
})
</script>

<style scoped>
.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
</style>
