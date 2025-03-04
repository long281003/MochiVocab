    <script setup>
    import store from '@/store';
    import { onMounted, ref } from 'vue';
    import { toast } from 'vue3-toastify';

    const props = defineProps(['show'])
    const emit = defineEmits(['update:show'])
    const member = store.getters.getMember

    const closeModal = () => {
        emit('update:show', false)
        amount.value = ""
    }

    const getDiscountedPrice = (originalPrice, planType) => {
            if (member.paid === 0) {
                switch (planType) {
                    case '6_months':
                        return 499000;
                    case '1_year':
                        return 899000;
                    case '3_years':
                        return 1299000;
                    default:
                        return originalPrice;
                }
            } else if (member.paid === 1) {
                switch (planType) {
                    case '6_months':
                        return 299000;
                    case '1_year':
                        return 699000;
                    case '3_years':
                        return 999000;
                    default:
                        return originalPrice;
                }
            }
            return originalPrice;
        };

    const amount = ref('')

    const handleChange = async () => {
        if (!amount.value) {
            toast.error('Vui lòng chọn 1 gói dịch vụ')
        }
        else {
            try {
                const res = await store.dispatch('makePayment', { amount: amount.value })
                console.log(res)
                if (res) {
                    toast.success('Chuyển đến trang thanh toán')
                    window.location.href = res
                }
            } catch (error) {
                console.log(error)                
            }
        }
    }


    onMounted( async () => {
        await store.dispatch('fetchMember')
    })

    </script>

    <template>
        <div v-show="props.show"
            class="d-alog fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div class="max-w-2xl p-2 bg-white rounded-md shadow-xl">
                <div class="w-[450px]">
                    <div>
                        <button @click="closeModal"
                            class="flex text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <h3 class="text-2xl text-center pb-3">Gói dịch vụ</h3>
                    </div>
                    <form @submit.prevent="handleChange" class="max-w-[370px] pl-10 py-2">
                        <div class="flex gap-2 mb-4">
                            <input type="radio" class="w-10" :value="getDiscountedPrice(599000, '6_months')" v-model="amount" />
                                <p>Gói 6 tháng - <span class="text-gray-400 line-through font-semibold">599,000đ</span></p>
                                <span class="text-red-500 font-bold">
                                    {{new Intl.NumberFormat('vi-VN').format(getDiscountedPrice(599000, '6_months'))}}đ
                                </span>
                        </div>
                        <div class="flex gap-2 mb-4">
                        <input type="radio" class="w-10" :value="getDiscountedPrice(999000, '1_year')" v-model="amount" /> 
                                <p>Gói 1 năm - <span class="text-gray-400 line-through font-semibold">999,000đ</span></p>
                                <span class="text-red-500 font-bold">
                                    {{new Intl.NumberFormat('vi-VN').format(getDiscountedPrice(999000, '1_year'))}}đ
                                </span>
                        </div>
                        <div class="flex gap-2 mb-4">
                            <input type="radio" class="w-10" :value="getDiscountedPrice(1399000, '3_years')" v-model="amount"/>
                            <p>Gói 3 năm - <span class="text-gray-400 line-through font-semibold">1,399,000đ</span></p>
                            <span class="text-red-500 font-bold">
                                    {{new Intl.NumberFormat('vi-VN').format(getDiscountedPrice(1399000, '3_years'))}}đ
                                </span>
                        </div>
                    </form>
                    <div class="flex gap-3 justify-end pr-5">
                            <button @click="closeModal" class="border border-lime-500 w-24 font-semibold p-2 rounded-xl mb-6">Hủy</button>
                            <button @click="handleChange" class="bg-lime-500 font-semibold p-2 rounded-xl mb-6">Thanh toán</button>
                        </div>
                </div>
            </div>
        </div>
    </template>
    <style>
        .d-alog{
            z-index: 99;
        }
        .text{
            text-decoration: 'line-through'
        }
    </style>
