import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [{
      id: 1,
      text: '学习vue',
      completed: false,
    },
    {
      id: 2,
      text: '学习webpack',
      completed: true,
    },
    {
      id: 3,
      text: '学习ES6',
      completed: true,
    }],
    filter: 0
  },
  getters: {
    showTodos({todos, filter}) {
      return todos.filter(t => {
        if(filter === 1) {
          return !t.completed
        }

        if(filter === 2) {
          return t.completed
        }

        return true
      })
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo)
    },
    setTodoCompleted(state, {id, completed}) {
      state.todos = state.todos.map(t => {
        // 找到了需要修改completed的todo
        if(t.id === id) {
          return {
            ...t,
            completed
          }
        }
        return t
      })
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(t => t.id !== id)
    },
    setFiler(state, filter) {
      state.filter = filter
    }
  },
  actions: {
  },
  modules: {
  }
})
