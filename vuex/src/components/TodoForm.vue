<template>
    <div class="todo-form">
      <input type="text" v-model="newTodoItem" placeholder="Enter a new todo item">
      <button @click="addNewTodoItem()" class="submit-button">Add</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTodoItem: ""
      };
    },
    methods: {
      addNewTodoItem() {
        if (this.newTodoItem.trim() !== "") {
          this.$store.dispatch("addNewTodo", this.newTodoItem.trim());
          this.newTodoItem = "";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .todo-form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  input[type="text"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
  }
  
  .submit-button {
    padding: 8px 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  </style>
  