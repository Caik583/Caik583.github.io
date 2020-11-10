<template>
  <div id="app">
    <TodoHeader/>
    <TodoList/>
    <TodoFooter/>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoList,
    TodoFooter
  }
}
</script>

<style>
* {
  list-style: none;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
