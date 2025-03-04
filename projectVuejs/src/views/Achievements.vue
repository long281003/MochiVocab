<script setup>

const props = defineProps(['show'])
const emit = defineEmits(['update:show'])

const closeModal = () => {
    emit('update:show', false)
}

</script>

<template>
    <div v-if="props.show" class="fixed dia-log inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-[800px] h-[800px] bg-white rounded-md shadow-xl">
            <div class="relative bg-amber-400 text-center font-semibold rounded-b-2xl p-5 text-2xl">
                <img src="../assets/close.png" width="40" class="absolute cursor-pointer" @click="closeModal" />
                <p class="text-center">Cài đặt tài sản</p>
            </div>
            <div class="flex justify-center my-10">
                <div class="w-[750px] px-24">
                    <div class="flex justify-center">
                        <div class="">
                            <div class="border-4 cursor-pointer border-lime-400 w-48  rounded-full">
                                <img src="../assets/profile_user_avatar.webp" width="190" />
                            </div>
                            <p
                                class="relative font-semibold text-white bottom-10 right-4 bg-lime-400 w-56 text-center text-xl p-1.5 rounded-2xl">
                                Free Account</p>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center border border-amber-500 p-3 pl-5 rounded-3xl w-full">
                            <img src="../assets/achievement_book.webp" width="90" />
                            <div>
                                <p class="ml-5 text-lg font-semibold">Sổ tay cấp độ 0</p>
                                <p class="ml-5 text-md font-semibold text-amber-500">0/100 words</p>
                            </div>
                        </div>
                    </div>
                    <div class="py-3">
                        <div class="flex items-center border border-amber-500 p-3 pl-5 rounded-3xl w-full">
                            <img src="../assets/achievement_badge.webp" width="90" />
                            <div>
                                <p class="ml-5 text-lg font-semibold">Siêu chí nhớ cấp độ 0</p>
                                <p class="ml-5 text-md font-semibold text-amber-500">0/100 words</p>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="flex items-center border border-amber-500 p-3 pl-5 rounded-3xl w-full">
                            <img src="../assets/achievement_tree_pot.webp" width="90" />
                            <div>
                                <p class="ml-5 text-lg font-semibold">Bạn đã học chăm chỉ</p>
                                <p class="ml-5 text-md font-semibold text-lime-500">0 day</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.dia-log {
    z-index: 999;
}
</style>