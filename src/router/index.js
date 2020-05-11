import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export const routes = [
  {
    component: () => import('@/views/home/index.vue'),
    name: 'home',
    path: '/home',
    meta: {
      title: '首页',
      keepAlive: true
    },
  },
  {
    path: '/',
    redirect: '/home',
  },
];
const router = new Router({
  mode: 'hash',
  routes,
});

router.afterEach((route) => {
  document.title = (route.meta && route.meta.title) || 'sttsg';
});
export default router;