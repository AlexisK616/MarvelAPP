import { createRouter, createWebHistory } from 'vue-router';
import ParentComponent from '../components/parentComponent.vue';
import HomePage from '../components/HomePage.vue';

const routes = [
  { path: '/', component: HomePage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;