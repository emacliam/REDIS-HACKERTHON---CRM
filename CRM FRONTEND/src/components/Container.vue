<template>
    <div class="min-h-full">
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog
                as="div"
                class="fixed inset-0 z-40 flex lg:hidden"
                @close="sidebarOpen = false"
            >
                <TransitionChild
                    as="template"
                    enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay
                        class="fixed inset-0 bg-gray-600 bg-opacity-75"
                    />
                </TransitionChild>
                <TransitionChild
                    as="template"
                    enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full"
                    enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leave-from="translate-x-0"
                    leave-to="-translate-x-full"
                >
                    <div
                        class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white"
                    >
                        <TransitionChild
                            as="template"
                            enter="ease-in-out duration-300"
                            enter-from="opacity-0"
                            enter-to="opacity-100"
                            leave="ease-in-out duration-300"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <div class="absolute top-0 right-0 pt-2 -mr-12">
                                <button
                                    type="button"
                                    class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    @click="sidebarOpen = false"
                                >
                                    <span class="sr-only">Close sidebar</span>
                                    <XIcon
                                        class="w-6 h-6 text-white"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </TransitionChild>
                        <div class="flex items-center flex-shrink-0 px-4">
                            <div
                                class="w-auto h-8 text-3xl font-bold text-center text-primary-dark"
                            >
                                CRM
                            </div>
                        </div>
                        <div class="flex-1 h-0 mt-5 overflow-y-auto">
                            <nav class="px-2">
                                <div class="space-y-1">
                                    <router-link
                                        v-for="item in navigation"
                                        :key="item.name"
                                        :to="item.href"
                                        :class="[
                                            item.current
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                            'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md',
                                        ]"
                                        :aria-current="
                                            item.current ? 'page' : undefined
                                        "
                                    >
                                        <component
                                            :is="item.icon"
                                            :class="[
                                                item.current
                                                    ? 'text-gray-500'
                                                    : 'text-gray-400 group-hover:text-gray-500',
                                                'mr-3 flex-shrink-0 h-6 w-6',
                                            ]"
                                            aria-hidden="true"
                                        />
                                        {{ item.name }}
                                    </router-link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </TransitionChild>
                <div class="flex-shrink-0 w-14" aria-hidden="true">
                    <!-- Dummy element to force sidebar to shrink to fit close icon -->
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div
            class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100"
        >
            <div class="flex items-center flex-shrink-0 px-6">
                <div
                    class="w-auto h-8 text-3xl font-bold text-center text-primary-dark"
                >
                    CRM
                </div>
            </div>
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex flex-col flex-1 h-0 mt-6 overflow-y-auto">
                <!-- User account dropdown -->
                <Menu
                    as="div"
                    class="relative inline-block px-3 mb-8 text-left"
                >
                    <div>
                        <MenuButton
                            class="group border border-gray-300 w-full my-2 bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-light"
                        >
                            <span
                                class="flex items-center justify-between w-full"
                            >
                                <span
                                    class="flex items-center justify-between min-w-0 space-x-3"
                                >
                                    <div
                                        class="flex-shrink-0 w-10 h-10 bg-gray-500 rounded-full"
                                    ></div>
                                    <span class="flex flex-col flex-1 min-w-0">
                                        <span
                                            class="text-sm font-medium text-gray-900 truncate"
                                            >{{ User.first_name }}
                                            {{ User.last_name }}</span
                                        >
                                        <span
                                            class="text-sm text-gray-500 truncate"
                                            >{{ User.role }}</span
                                        >
                                    </span>
                                </span>
                                <SelectorIcon
                                    class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                            </span>
                        </MenuButton>
                    </div>
                    <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                    >
                        <MenuItems
                            class="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            <div class="py-1">
                                <MenuItem v-slot="{ active }">
                                    <a
                                        @click="logout()"
                                        :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm cursor-pointer',
                                        ]"
                                        >Logout</a
                                    >
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>

                <!-- Navigation -->
                <nav class="px-3 mt-6">
                    <div class="space-y-1">
                        <router-link
                            v-for="item in navigation"
                            :key="item.name"
                            :to="item.href"
                            :class="[
                                item.current
                                    ? 'bg-gray-200 text-gray-900'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                            ]"
                            :aria-current="item.current ? 'page' : undefined"
                        >
                            <component
                                :is="item.icon"
                                :class="[
                                    item.current
                                        ? 'text-gray-500'
                                        : 'text-gray-400 group-hover:text-gray-500',
                                    'mr-3 flex-shrink-0 h-6 w-6',
                                ]"
                                aria-hidden="true"
                            />
                            {{ item.name }}
                        </router-link>
                    </div>
                </nav>
            </div>
        </div>
        <!-- Main column -->
        <div class="flex flex-col lg:pl-64">
            <!-- Search header -->
            <div
                class="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:hidden"
            >
                <button
                    type="button"
                    class="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-light lg:hidden"
                    @click="sidebarOpen = true"
                >
                    <span class="sr-only">Open sidebar</span>
                    <MenuAlt1Icon class="w-6 h-6" aria-hidden="true" />
                </button>
                <div class="flex justify-between flex-1 px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center">
                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative ml-3">
                            <div>
                                <MenuButton
                                    class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
                                >
                                    <span class="sr-only">Open user menu</span>

                                    <div
                                        class="w-8 h-8 bg-gray-500 rounded-full"
                                    ></div>
                                </MenuButton>
                            </div>
                            <transition
                                enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-in"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0"
                            >
                                <MenuItems
                                    class="absolute right-[-20] w-48 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                    <div class="py-1">
                                        <MenuItem v-slot="{ active }">
                                            <a
                                                @click="logout()"
                                                :class="[
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm cursor-pointer',
                                                ]"
                                                >Logout</a
                                            >
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    ClockIcon,
    HomeIcon,
    MenuAlt1Icon,
    ViewListIcon,
    XIcon,
    ChatIcon,
    ArchiveIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowCircleRightIcon,
} from '@heroicons/vue/outline'
import {
    ChevronRightIcon,
    DotsVerticalIcon,
    SearchIcon,
    SelectorIcon,
} from '@heroicons/vue/solid'
import { useStore } from 'vuex'
import router from '../router'
import { useRouter } from 'vue-router'

const nav = [
    { name: 'Home', href: '/Dashboard', icon: HomeIcon, current: false },

    {
        name: 'Archived',
        href: '/ArchivedIssues',
        icon: ArchiveIcon,
        current: false,
    },
    {
        name: 'Open',
        href: '/open',
        icon: ArrowCircleRightIcon,
        current: false,
    },
    {
        name: 'Resolved',
        href: '/Resolved',
        icon: CheckCircleIcon,
        current: false,
    },
]

const nav1 = [
    { name: 'Dashboard', href: '/Dashboard', icon: HomeIcon, current: false },
    {
        name: 'Unresolved',
        href: '/archived',
        icon: XCircleIcon,
        current: false,
    },
    {
        name: 'Resolved',
        href: '/closed',
        icon: CheckCircleIcon,
        current: false,
    },
]
const issues = [
    { name: 'Unresolved Issues', href: '#', bgColorClass: 'bg-red-500' },
    { name: 'Pending', href: '#', bgColorClass: 'bg-green-500' },
]
const ISS = [
    {
        id: 1,
        title: 'LOGIN NOT WORKING',
        initials: 'GA',
        team: 'Engineering',
        members: [
            {
                name: 'Dries Vincent',
                handle: 'driesvincent',
                imageUrl:
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Lindsay Walton',
                handle: 'lindsaywalton',
                imageUrl:
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        ],
        totalMembers: 2,
        lastUpdated: 'March 17, 2020',
        pinned: true,
        bgColorClass: 'bg-green-600',
    },

    // More ISS...
]

const ACTIVE_REPS = [
    {
        id: 1,
        title: 'LOGIN NOT WORKING',
        initials: 'GA',
        team: 'Engineering',
        members: [
            {
                name: 'Dries Vincent',
                handle: 'driesvincent',
                imageUrl:
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Lindsay Walton',
                handle: 'lindsaywalton',
                imageUrl:
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        ],
        totalMembers: 2,
        lastUpdated: 'March 17, 2020',
        pinned: true,
        bgColorClass: 'bg-green-600',
    },
]
const pinnedProjects = ISS.filter((project) => project.pinned)

export default {
    name: 'HomePage',
    props: ['role'],
    components: {
        Dialog,
        DialogOverlay,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        TransitionChild,
        TransitionRoot,
        ChevronRightIcon,
        DotsVerticalIcon,
        MenuAlt1Icon,
        SearchIcon,
        SelectorIcon,
        XIcon,
    },
    setup(props) {
        const sidebarOpen = ref(false)
        const store = useStore()
        const router = useRouter()

        return {
            navigation: computed(() =>
                store.getters['auth/user'].role === 'AGENT' ? nav : nav1
            ),
            issues,
            ISS,
            ACTIVE_REPS,
            pinnedProjects,
            sidebarOpen,
            User: computed(() => store.getters['auth/user']),
            logout: async () => {
                const res = await store.dispatch('auth/Logout')
                if (res == true) {
                    await router.push('/')
                    window.location.reload()
                }
            },
        }
    },
}
</script>
