<template>
    <Container ROLE="AGENT">
        <main class="flex-1">
            <!-- Page title & actions -->
            <div
                class="px-4 py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
            >
                <h1
                    class="text-lg font-bold leading-6 text-gray-900 sm:truncate"
                >
                    Resolved
                </h1>
            </div>

            <!-- Pinned ISS -->
            <div class="flex justify-start px-4 mt-6 space-x-4 sm:px-6 lg:px-8">
                <span>Your Issues</span>
                <ProgressSpinner
                    v-if="loading"
                    style="width: 20px; height: 20px"
                    strokeWidth="8"
                    animationDuration=".5s"
                />
            </div>

            <!-- Projects list (only on smallest breakpoint) -->
            <div class="mt-10 sm:hidden">
                <div class="px-4 sm:px-6">
                    <h2
                        class="text-xs font-medium tracking-wide text-gray-500 uppercase"
                    >
                        Queries
                    </h2>
                </div>

                <ul
                    role="list"
                    class="mt-3 border-t border-gray-200 divide-y divide-gray-100"
                >
                    <li v-for="ISSUE in issues" :key="ISSUE.pk">
                        <a
                            href="#"
                            @click="JOIN_ROOM(ISSUE.pk, ISSUE)"
                            class="flex items-center justify-between px-4 py-4 group hover:bg-gray-50 sm:px-6"
                        >
                            <span class="flex items-center space-x-3 truncate">
                                <span
                                    class="text-sm font-medium leading-6 truncate"
                                >
                                    {{ ISSUE.subject }}
                                    {{ ' ' }}
                                </span>
                            </span>
                            <ChevronRightIcon
                                class="w-5 h-5 ml-4 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                            />
                        </a>
                    </li>
                </ul>
                <div v-if="issues.length == 0" class="text-center">
                    <span>No issues found</span>
                </div>
            </div>

            <!-- Projects table (small breakpoint and up) -->
            <div class="hidden mt-8 sm:block">
                <div
                    class="inline-block min-w-full align-middle border-b border-gray-200"
                >
                    <table class="min-w-full">
                        <thead>
                            <tr class="border-t border-gray-200">
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                                >
                                    <span class="lg:pl-2">Queries</span>
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                                >
                                    Description
                                </th>
                                <th
                                    class="hidden px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 md:table-cell bg-gray-50"
                                >
                                    created At
                                </th>
                                <th
                                    class="py-3 pr-6 text-xs font-medium tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                                />
                            </tr>
                        </thead>

                        <tbody class="bg-white divide-y divide-gray-100">
                            <tr
                                v-for="ISSUE in issues"
                                :key="ISSUE.pk"
                                class="cursor-pointer hover:bg-gray-100"
                            >
                                <td
                                    class="w-full px-6 py-3 text-sm font-medium text-gray-900 max-w-0 whitespace-nowrap"
                                >
                                    <div
                                        class="flex items-center space-x-3 lg:pl-2"
                                    >
                                        <a
                                            href="#"
                                            class="truncate hover:text-gray-600"
                                        >
                                            <span>
                                                {{ ISSUE.subject }}
                                            </span>
                                        </a>
                                    </div>
                                </td>
                                <td
                                    class="w-full px-6 py-3 text-sm font-medium text-gray-900 max-w-0 whitespace-nowrap"
                                >
                                    <div
                                        class="flex items-center space-x-3 lg:pl-2"
                                    >
                                        <a
                                            href="#"
                                            class="truncate hover:text-gray-600"
                                        >
                                            <span>
                                                {{ ISSUE.description }}
                                            </span>
                                        </a>
                                    </div>
                                </td>

                                <td
                                    class="hidden px-6 py-3 text-sm text-right text-gray-500 md:table-cell whitespace-nowrap"
                                >
                                    {{ ISSUE.created_at }}
                                </td>
                                <td
                                    class="px-6 py-3 text-sm font-medium text-right whitespace-nowrap"
                                >
                                    <a
                                        @click="JOIN_ROOM(ISSUE.pk, ISSUE)"
                                        class="text-indigo-600 hover:text-indigo-900"
                                        >Go to Chat</a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="issues.length == 0" class="text-center">
                        <span>No issues found</span>
                    </div>
                </div>
            </div>
        </main>
    </Container>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'
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
} from '@heroicons/vue/outline'
import {
    ChevronRightIcon,
    DotsVerticalIcon,
    SearchIcon,
    SelectorIcon,
} from '@heroicons/vue/solid'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: true },
    { name: 'Chats', href: '#', icon: ViewListIcon, current: false },
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
import IssuesService from '../services/Issues'
//import { io } from 'socket.io-client'
import { url } from '../../config.js'
const socket = io('ws://' + url)
export default {
    components: {
        ChevronRightIcon,
    },

    setup() {
        const sidebarOpen = ref(false)
        const router = useRouter()
        const store = useStore()
        const issues = ref([])
        const issue = ref({
            subject: '',
            description: '',
            sender: store.state.auth.user.pk,
        })
        const loading = ref(false)

        onMounted(() => {
            FETCH_ISSUES(store.getters['auth/user'].pk)
            socket.on('connect', () => {
                console.log(socket.connected)
            })

            socket.on('disconnect', () => {
                socket.connect()
                console.log('connected false')
            })
            socket.on('join-room-response', (response) => {
                console.log(response.data)
                if (response.status_code == '200') {
                    if (response.data.user_id === store.state.auth.user.pk) {
                        router.push(`/Chat/${receive_id.value}`)
                    }
                }
            })
        })
        async function FETCH_ISSUES(id) {
            try {
                loading.value = true
                const response = await IssuesService.getAll('CLOSED')
                console.log(response.data.data)
                issues.value = response.data.data
                loading.value = false
            } catch (error) {
                loading.value = false
                console.log(error)
            }
        }
        const receive_id = ref('')
        async function JOIN_ROOM(id, issue) {
            receive_id.value = id
            await store.dispatch('issue/Save_Issue', issue)
            try {
                const data = {
                    issue_id: id,
                    user_id: store.state.auth.user.pk,
                    first_name: store.state.auth.user.first_name,
                    last_name: store.state.auth.user.last_name,
                }
                loading.value = true
                socket.emit('join-room', data, (data) => {
                    console.log(data)
                })
            } catch (error) {
                loading.value = false
                console.log(error)
            }
        }

        return {
            navigation,
            issues,
            issue,
            ACTIVE_REPS,
            JOIN_ROOM,
            sidebarOpen,
            loading,
        }
    },
}
</script>
