<template>
    <div class="relative flex h-screen">
        <Toast />

        <div
            class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
        >
            <div class="w-full max-w-sm mx-auto lg:w-96">
                <div>
                    <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div class="mt-8">
                    <div class="mt-6">
                        <form class="space-y-6">
                            <div>
                                <label
                                    for="email"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    First name
                                </label>
                                <div class="mt-1">
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        v-model="first_name"
                                        type="text"
                                        autocomplete="first_name"
                                        required=""
                                        class="block w-full px-3 py-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-light focus:border-primary-light sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    for="email"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Last name
                                </label>
                                <div class="mt-1">
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        v-model="last_name"
                                        type="text"
                                        autocomplete="last_name"
                                        required=""
                                        class="block w-full px-3 py-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-light focus:border-primary-light sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    @click.prevent="login()"
                                    :class="
                                        loading
                                            ? 'cursor-not-allowed'
                                            : 'cursor-pointer'
                                    "
                                    class="flex justify-center w-full px-4 py-2 text-lg font-extrabold text-white border border-transparent rounded-md shadow-sm bg-primary-light hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
                                >
                                    <ProgressSpinner
                                        v-if="loading"
                                        style="width: 20px; height: 20px"
                                        strokeWidth="8"
                                        animationDuration=".5s"
                                    />
                                    <span v-else> Sign in </span>
                                </button>
                            </div>
                            <div
                                v-if="error.message"
                                class="flex items-center justify-center h-24 px-2 py-2 font-bold text-center text-red-500 rounded-lg bg-red-50"
                            >
                                {{ error.message }}
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="text-sm">
                                    <router-link
                                        to="/register"
                                        class="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Register for an Account
                                    </router-link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative flex-1 hidden w-0 lg:block">
            <img
                class="absolute inset-0 object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1652107788664-02b06074ac28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
            />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import AuthService from '../services/auth'
import { useStore } from 'vuex'
export default {
    setup() {
        const first_name = ref('')
        const last_name = ref('')
        const error = ref({
            message: '',
        })
        const loading = ref(false)
        const router = useRouter()
        const toast = useToast()
        const store = useStore()

        const login = async () => {
            loading.value = true
            error.value.message = ''
            try {
                const data = {
                    first_name: first_name.value,
                    last_name: last_name.value,
                }

                const response = await AuthService.Login(data)
                console.log(response)
                if (response.data.status_code !== '200') {
                    error.value.message = 'Failed to login user'
                } else {
                    toast.add({
                        severity: 'success',
                        summary: 'Login Successful',
                        detail: 'You have Successfully logged In',
                        life: 3000,
                    })
                    store.dispatch('auth/Save_User', response.data.data)
                    router.push('Dashboard')
                }
                loading.value = false
            } catch (err) {
                console.log(err)
                error.value.message = 'Failed to login user'
                loading.value = false
            }
        }

        return {
            first_name,
            last_name,
            error,
            loading,
            login,
        }
    },
}
</script>

<style></style>
