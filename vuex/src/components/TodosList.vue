<template>
    <div>
        <todo-item v-for="(todo, index) in todos " :key="index" :todo="todo"></todo-item>
    </div>
</template>

<script>
import { mapState } from "vuex";
import TodoItem from './TodoItem.vue';

export default {
    components: {
        TodoItem
    },
    computed:{
        ...mapState({
      todos: "todos"
    })
        // todos() {
        //     return this.$store.state.todos
        // }
    }
};
</script>

<style>
</style>
