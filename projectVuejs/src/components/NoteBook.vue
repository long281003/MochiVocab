<script setup>
import store from '@/store';
import WordActive from './WordActive.vue';

const openModal = () => {
    store.dispatch('openlModalCourse')
}
</script>

<template>
    <div>
        <div class="flex justify-center items-center">
            <div>
                <WordActive/>
            </div>
        </div>
    </div>
</template>

<style>
    .btn{
        position: relative;
        right: 85px;
        top: 4px;
    }
</style>