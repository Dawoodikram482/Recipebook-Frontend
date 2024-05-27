

<template>

</template>
<script >
import {useLoginSessionStore} from "@/stores/LoginSession.js";

export default {
  name: 'Login',
  setup()
  {
    return {
      loginSessionStore: useLoginSessionStore()
    };
  },
  data(){
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods:{
    login(){
      this.loginSessionStore.login((this.username, this.password))
          .then(response=>{
            this.$router.push('/myrecipes')
          }).catch(error=>{
            this.error = error;
          });
    }
  }
}
</script>
<style scoped>

</style>