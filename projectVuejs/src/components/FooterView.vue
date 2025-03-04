<script setup>
import IconGraph from './icons/IconGraph.vue';
import store from '@/store';

const openModal = () => {
  store.dispatch('openlModalCourse')
}

</script>

    <template>
        <div class="fixed-navigation p-2">
            <div class="flex justify-center items-center gap-40">
                <router-link to="/">
                    <IconGraph class="ml-2" />
                    <p>Ôn tập</p>
                </router-link>
                <div @click="openModal" class="cursor-pointer">
                    <img src="../assets/icon_vocab.webp" width="35" class="ml-5" />
                    <p>Học từ mới</p>
                </div>
                <router-link to="/notebook">
                    <img src="../assets/icon_notebook.webp" width="23" class="ml-2" />
                    <p>Sổ tay</p>
                </router-link>
                <router-link to="/conversation">
                <img src="../assets/icon_conversation.webp" width="30" class="ml-2" />
                <p>Hội thoại</p>
            </router-link>
            </div>
        </div>
    </template>
    <style>
.fixed-navigation {
    position: fixed; 
    bottom: 0; 
    left: 0;
    width: 100%; 
    z-index: 10; 
    background-color: white; 
    box-shadow: 0px -7px 10px -11px rgba(0,0,0,.99);
}
.p-2 {
    padding: 10px; /* Cách bên trong */
}

    </style>