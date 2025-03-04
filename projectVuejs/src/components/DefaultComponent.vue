<script setup>
import FooterView from './FooterView.vue';
import Navbar from './Navbar.vue';

</script>

<template>
    <Navbar />
    <div class="">
        <div class="2xl:max-w-[860px] xl:max-w-[760px] h-screen mx-auto bg-white">
            <router-view />
        </div>
    </div>
     <FooterView class="2xl:hidden xl:hidden lg:block md:block sm:block " />
</template>
 <style>
</style>
