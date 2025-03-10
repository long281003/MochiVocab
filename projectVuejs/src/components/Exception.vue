<script setup>
import store from '@/store';
const openModal = () => {
    store.dispatch('openlModalCourse')
}
</script>

<template>
            <div>
                <div class="flex justify-center items-center">
                    <img src="../assets/image.png" width="300" />
                </div>
                <p class="text-center font-semibold text-xl pt-7 px-20">Bạn chưa có từ vựng nào trong sổ tay.
                    <br/>Hãy học 1 bài từ mới để cập nhật sổ tay</p>
                <div class="flex my-4 justify-center">
                    <button @click="openModal" class=" bg-lime-500 text-white  w-60 h-12 font-semibold p-2 rounded-full mt-8">Học từ
                        mới</button>
                </div>
            </div>
</template>
