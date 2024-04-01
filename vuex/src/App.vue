<template>
  <div id="app">
    <h1>Todos</h1>
    <div class="summary">
      <div class="summary-item">
        <h3>Completed</h3>
        <p>{{ completedTodos }}</p>
      </div>
      <div class="summary-item">
        <h3>Pending</h3>
        <p>{{ pendingTodos }}</p>
      </div>
    </div>
    <todos-list/>
    <todo-form/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodosList from "./components/TodosList.vue";
import TodoForm from './components/TodoForm.vue';

export default {
  name: 'App',
  components: {
    TodosList,
    TodoForm
  },
  computed:{
    ...mapGetters({
      completedTodos: "completedTodos",
      pendingTodos: "pendingTodos"
    })
    // computedTodos() {
    //   return this.$store.getters.completedTodos;
    // },
    // pendingTodos() {
    //   return this.$store.getters.pendingTodos;
    // }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.summary {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.summary-item {
  padding: 10px;
  margin: 0 10px;
  width:200px;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.summary-item h3 {
  margin-bottom: 5px;
}

.summary-item p {
  font-weight: bold;
  color: #333;
}
</style>
