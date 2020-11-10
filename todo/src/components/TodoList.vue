<template>
    <ul>
        <li v-for="t in todos" :key="t.id" :class="{completed: t.completed}">
           <input type="checkbox" :checked="t.completed" @change="setTodoCompleted($event, t.id)"> {{t.text}}
           <button @click="removeTodo(t.id)">删除</button>
        </li>
    </ul>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: mapGetters({todos:'showTodos'}),
    methods: {
        setTodoCompleted(evt, id) {
            this.$store.commit('setTodoCompleted', {id, completed: evt.target.checked})
        },
        removeTodo(id) {
            this.$store.commit('removeTodo', id)
        }
    }
}
</script>

<style scoped>
.completed {
    text-decoration: line-through;
    color: #666;
}
</style>