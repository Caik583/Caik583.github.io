<template>
    <div>
        <input type="text" v-model.trim="text"> <button @click="addTodo">add todo</button>
    </div>
</template>

<script>
export default {
    data: () => ({
        text: ''
    }),
    methods: {
        addTodo() {
            if(this.text) {
                // console.log(this.text)
                let todo = {
                    id: new Date().getTime(),
                    text: this.text,
                    completed: false
                }
                // 提交mutation让vuex中的todos添加一条
                this.$store.commit('addTodo', todo)

            }
            //清空输入框
            this.text = ""
        }
    }
}
</script>