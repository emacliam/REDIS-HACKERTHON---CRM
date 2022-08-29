<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <main>
        <button @click="clicked()" class="font-medium text-indigo-700">
            {{ Title }}
        </button>
        <TransitionRoot as="template" :show="open">
            <Dialog
                as="div"
                class="fixed inset-0 z-10 overflow-y-auto"
                @close="open = false"
            >
                <div
                    class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <DialogOverlay
                            class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                        />
                    </TransitionChild>

                    <!-- This element is to trick the browser into centering the modal contents. -->
                    <span
                        class="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                        >&#8203;</span
                    >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            class="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                        >
                            <div
                                class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block"
                            >
                                <button
                                    type="button"
                                    class="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    @click="open = false"
                                >
                                    <span class="sr-only">Close</span>
                                    <XIcon class="w-6 h-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div class="sm:flex sm:items-start">
                                <div
                                    class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                                >
                                    <DialogTitle
                                        as="h3"
                                        class="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {{ Title }}
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <slot class="w-full"></slot>
                                        <div
                                            class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"
                                        >
                                            <button
                                                type="button"
                                                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-light hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                @click="POST_ISSUE"
                                            >
                                                Create Issue
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
    </main>
</template>

<script>
import { ref, watch, watchEffect } from 'vue'
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { ExclamationIcon, XIcon } from '@heroicons/vue/outline'

export default {
    props: ['title', 'click'],
    name: 'ModalComponent',
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        XIcon,
    },
    setup(props, context) {
        const open = ref(false)
        const Title = ref(props.title)
        const clicked = () => {
            open.value = !open.value
        }

        function POST_ISSUE() {
            context.emit('post')
            clicked()
        }

        return {
            open,
            clicked,
            Title,
            POST_ISSUE,
            clk: props.click,
        }
    },
}
</script>
