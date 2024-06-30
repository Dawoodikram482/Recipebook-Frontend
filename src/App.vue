<template>
  <header>
    <Navigation v-if="$route.path !== '/login' && $route.path !=='/login/signup'"/>
  </header>
  <RouterView/>
  <Footer v-if="$route.path !== '/login' && $route.path !=='/login/signup'"/>
</template>
<script>
import {useLoginSessionStore} from '@/stores/LoginSession.js'
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";

export default {
  setup() {
    return {
      loginSessionStore: useLoginSessionStore()
    };
  },
  name: "App",
  components: {
    Navigation,
    Footer
  },
  mounted() {
    this.loginSessionStore.localLogin();
  }
}

</script>
<style scoped>
</style>