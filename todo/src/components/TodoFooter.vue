<template>
    <div>
        <span class="btn" :class="{active: filter === 0}" @click="setFiler(0)">all</span>
        <span class="btn" :class="{active: filter === 1}" @click="setFiler(1)">active</span>
        <span class="btn" :class="{active: filter === 2}" @click="setFiler(2)">completed</span>
    </div>    
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed: mapState(['filter']),
    methods: {
        setFiler(filter) {
            this.$store.commit('setFiler', filter)
        }
    }
}
</script>

<style scoped>
.active {
    color: rgb(0, 160, 200);
}

.btn {
    display: inline-block;
    margin: 5px;

}
</style>