<template>
    <div class="todo-item">
      <div class="todo-content" :class="{ completed: todo.completed }" @click="toggleTodoStatus(todo)">
        {{ todo.title }}
      </div>
      <button class="todo-delete" @click="removeTodo(todo)">Delete</button>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  export default {
    props: ["todo"],
    methods: {
      ...mapActions({
        removeTodo: "deleteTodo",
        toggleTodoStatus: "toggleTodoStatus"
      })
    }
  };
  </script>
  
  <style scoped>
  .todo-item {
    width: 250px;
    margin: 5px auto;
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .todo-content {
    flex: 1;
    cursor: pointer;
    color: #333;
    transition: color 0.3s ease;
  }
  
  .todo-content.completed {
    color: #999;
    text-decoration: line-through;
  }
  
  .todo-delete {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .todo-delete:hover {
    background-color: #c0392b;
  }
  </style>
  