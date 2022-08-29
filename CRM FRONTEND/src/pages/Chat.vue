<template>
    <Container>
        <main class="flex-1 min-w-0 border-t border-gray-200 xl:flex">
            <section
                aria-labelledby="message-heading"
                class="relative flex flex-col flex-1 h-screen min-w-0 overflow-hidden xl:order-last"
            >
                <!-- Top section -->
                <div class="flex-shrink-0 bg-white border-b border-gray-200">
                    <!-- Toolbar-->
                    <div class="flex flex-col justify-center h-16">
                        <div class="px-4 sm:px-6 lg:px-8">
                            <div class="flex justify-between py-3">
                                <!-- Left buttons -->
                                <div>
                                    <span
                                        class="relative z-0 inline-flex rounded-md shadow-sm sm:shadow-none sm:space-x-3"
                                    >
                                        <span class="inline-flex sm:shadow-sm">
                                            <button
                                                @click="router.go(-1)"
                                                type="button"
                                                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                            >
                                                <ReplyIcon
                                                    class="mr-2.5 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <span>Back</span>
                                            </button>
                                        </span>

                                        <span
                                            v-if="
                                                ISSUE_DATA.issue_status !==
                                                'CLOSED'
                                            "
                                            class="hidden space-x-3 lg:flex"
                                        >
                                            <button
                                                @click="
                                                    CHANGE_ISSUE_STATUS(
                                                        'PENDING',
                                                        route.params.id
                                                    )
                                                "
                                                type="button"
                                                class="relative items-center hidden px-4 py-2 -ml-px text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md sm:inline-flex hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                            >
                                                <ArchiveIconSolid
                                                    class="mr-2.5 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <span>Archive</span>
                                            </button>
                                            <button
                                                @click="
                                                    CHANGE_ISSUE_STATUS(
                                                        'CLOSED',
                                                        route.params.id
                                                    )
                                                "
                                                type="button"
                                                class="relative items-center hidden px-4 py-2 -ml-px text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md sm:inline-flex hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                            >
                                                <FolderDownloadIcon
                                                    class="mr-2.5 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <span>Close Issue</span>
                                            </button>
                                        </span>

                                        <Menu
                                            v-if="
                                                ISSUE_DATA.issue_status !==
                                                'CLOSED'
                                            "
                                            as="span"
                                            class="relative block -ml-px sm:shadow-sm lg:hidden"
                                        >
                                            <div>
                                                <MenuButton
                                                    class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:rounded-md sm:px-3"
                                                >
                                                    <span
                                                        class="sr-only sm:hidden"
                                                        >More</span
                                                    >
                                                    <span
                                                        class="hidden sm:inline"
                                                        >More</span
                                                    >
                                                    <ChevronDownIcon
                                                        class="w-5 h-5 text-gray-400 sm:ml-2 sm:-mr-1"
                                                        aria-hidden="true"
                                                    />
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
                                                    class="absolute right-0 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                    <div class="py-1">
                                                        <MenuItem
                                                            v-slot="{ active }"
                                                        >
                                                            <a
                                                                @click="
                                                                    CHANGE_ISSUE_STATUS(
                                                                        'PENDING',
                                                                        route
                                                                            .params
                                                                            .id
                                                                    )
                                                                "
                                                                :class="[
                                                                    active
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm',
                                                                ]"
                                                            >
                                                                Archive
                                                            </a>
                                                        </MenuItem>
                                                        <MenuItem
                                                            v-slot="{ active }"
                                                        >
                                                            <a
                                                                @click="
                                                                    CHANGE_ISSUE_STATUS(
                                                                        'CLOSED',
                                                                        route
                                                                            .params
                                                                            .id
                                                                    )
                                                                "
                                                                :class="[
                                                                    active
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm',
                                                                ]"
                                                            >
                                                                Close
                                                            </a>
                                                        </MenuItem>
                                                    </div>
                                                </MenuItems>
                                            </transition>
                                        </Menu>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Message header -->
                </div>
                <ProgressSpinner
                    v-if="loading"
                    style="width: 20px; height: 20px"
                    strokeWidth="8"
                    animationDuration=".5s"
                />

                <div class="flex-1 min-h-0 mb-24 overflow-y-auto">
                    <div class="pt-5 pb-6 bg-white shadow">
                        <div
                            class="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8"
                        >
                            <div class="sm:w-0 sm:flex-1">
                                <h1
                                    id="message-heading"
                                    class="text-lg font-medium text-gray-900"
                                >
                                    Issue Title:
                                    <span class="text-gray-500">{{
                                        ISSUE_DATA.subject
                                    }}</span>
                                </h1>
                                <!--   <p class="mt-1 text-sm text-gray-500 truncate">
                                    {{ message.sender }}
                                </p> -->
                            </div>

                            <div
                                class="flex items-center justify-between mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start"
                            >
                                <span
                                    :class="
                                        ISSUE_DATA.issue_status === 'CLOSED'
                                            ? 'bg-red-100 text-red-600'
                                            : 'bg-cyan-100'
                                    "
                                    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium text-cyan-800"
                                >
                                    {{ ISSUE_DATA.issue_status }}
                                </span>
                                <Menu
                                    as="div"
                                    class="relative inline-block ml-3 text-left"
                                >
                                    <div>
                                        <MenuButton
                                            class="flex items-center p-2 -my-2 text-gray-400 bg-white rounded-full hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        >
                                            <span class="sr-only"
                                                >Open options</span
                                            >
                                            <DotsVerticalIcon
                                                class="w-5 h-5"
                                                aria-hidden="true"
                                            />
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
                                            class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <div class="py-1">
                                                <MenuItem v-slot="{ active }">
                                                    <a
                                                        href="#"
                                                        :class="[
                                                            active
                                                                ? 'bg-gray-100 text-gray-900'
                                                                : 'text-gray-700',
                                                            'flex justify-between px-4 py-2 text-sm',
                                                        ]"
                                                    >
                                                        <span
                                                            >View original</span
                                                        >
                                                    </a>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <!-- Thread section-->
                    <div
                        class="grid place-items-center"
                        v-if="messages.length === 0"
                    >
                        <span>No messages </span>
                    </div>
                    <ul
                        v-for="item in messages"
                        :key="item.pk"
                        role="list"
                        class="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8"
                    >
                        <li
                            class="px-4 py-6 shadow sm:rounded-lg sm:px-6"
                            :class="
                                item.sender === store.state.auth.user.pk
                                    ? ' bg-white '
                                    : 'bg-[#F2F6FC]'
                            "
                        >
                            <div
                                class="sm:flex sm:justify-between sm:items-baseline"
                            >
                                <h3 class="text-base font-medium">
                                    <span
                                        v-if="
                                            item.sender ===
                                            store.state.auth.user.pk
                                        "
                                        class="text-gray-600"
                                    >
                                        You
                                    </span>

                                    <span v-else class="text-gray-900"
                                        >From:
                                        {{
                                            item.sender_data.first_name +
                                            ' ' +
                                            item.sender_data.last_name
                                        }}</span
                                    >
                                    {{ ' ' }}
                                </h3>
                                <p
                                    class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3"
                                >
                                    <time>{{ item.created_at }}</time>
                                </p>
                            </div>
                            <div
                                class="mt-4 space-y-6 text-sm text-gray-800"
                                v-html="item.message_body"
                            />
                        </li>
                    </ul>
                </div>
                <div
                    v-if="ISSUE_DATA.issue_status !== 'CLOSED'"
                    class="absolute bottom-0 flex items-center w-full px-8 py-4 mt-2 space-x-4 h-28"
                >
                    <div
                        class="flex items-center w-full h-full px-8 border rounded-lg shadow"
                    >
                        <textarea
                            name=""
                            v-model="message_body"
                            id=""
                            cols="30"
                            rows="10"
                            placeholder="Type Your Message Here"
                            class="w-3/4 h-16 bg-gray-100 border-gray-300 rounded-lg resize-none focus:border-0"
                        ></textarea>
                    </div>
                    <span
                        class="grid h-full p-4 px-6 text-2xl font-bold text-white rounded-lg cursor-pointer place-items-center bg-primary-light hover:bg-secondary-dark"
                        @click="SEND_MESSAGE()"
                    >
                        Send
                        <ProgressSpinner
                            v-if="sending_message"
                            style="width: 20px; height: 20px"
                            strokeWidth="8"
                            animationDuration=".5s"
                        />
                    </span>
                </div>
            </section></main
    ></Container>
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
    ArchiveIcon as ArchiveIconSolid,
    ChevronDownIcon,
    ChevronUpIcon,
    DotsVerticalIcon,
    FolderDownloadIcon,
    PencilIcon,
    ReplyIcon,
    SearchIcon,
    UserAddIcon,
} from '@heroicons/vue/solid'
import {
    ArchiveIcon as ArchiveIconOutline,
    BanIcon,
    BellIcon,
    FlagIcon,
    InboxIcon,
    MenuIcon,
    PencilAltIcon,
    UserCircleIcon,
    XIcon,
} from '@heroicons/vue/outline'

const sidebarNavigation = [
    { name: 'Open', href: '#', icon: InboxIcon, current: true },
    { name: 'Archive', href: '#', icon: ArchiveIconOutline, current: false },
    { name: 'Customers', href: '#', icon: UserCircleIcon, current: false },
    { name: 'Flagged', href: '#', icon: FlagIcon, current: false },
    { name: 'Spam', href: '#', icon: BanIcon, current: false },
    { name: 'Drafts', href: '#', icon: PencilAltIcon, current: false },
]

const message = {
    subject: 'App Not Logging In',
    sender: 'john doe',
    status: 'Open',
    items: [
        {
            id: 1,
            author: 'Joe Armstrong',
            date: 'Yesterday at 7:24am',
            datetime: '2021-01-28T19:24',
            body: "<p>Thanks so much! Can't wait to try it out.</p>",
        },
        {
            id: 2,
            author: 'Monica White',
            date: 'Wednesday at 4:35pm',
            datetime: '2021-01-27T16:35',
            body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p><strong style="font-weight: 600;">Monica White</strong><br/>Customer Service</p>
      `,
        },
        {
            id: 3,
            author: 'Joe Armstrong',
            date: 'Wednesday at 4:09pm',
            datetime: '2021-01-27T16:09',
            body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p>– Joe</p>
      `,
        },
        {
            id: 4,
            author: 'Joe Armstrong',
            date: 'Wednesday at 4:09pm',
            datetime: '2021-01-27T16:09',
            body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p>– Joe</p>
      `,
        },
        {
            id: 5,
            author: 'Joe Armstrong',
            date: 'Wednesday at 4:09pm',
            datetime: '2021-01-27T16:09',
            body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p>– Joe</p>
      `,
        },
    ],
}
import MessageService from '../services/message'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { url } from '../../config.js'
const socket = io('ws://' + url)

export default {
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        ArchiveIconSolid,
        ChevronDownIcon,
        DotsVerticalIcon,
        FolderDownloadIcon,
        ReplyIcon,
    },

    data() {
        return {}
    },
    methods: {},
    setup() {
        const open = ref(false)
        const messages = ref([])
        const message_body = ref('')
        const MESSAGE = ref([])
        const route = useRoute()
        const loading = ref(false)
        const router = useRouter()
        const store = useStore()

        onMounted(() => {
            if (!route.params.id) {
                router.go(-1)
            }
            FETCH_MESSAGES(route.params.id)
            socket.on('connect', () => {
                console.log(socket.connected)
            })

            socket.on('disconnect', () => {
                socket.connect()
                console.log('connected false')
            })

            socket.on('receive-message', (response) => {
                sending_message.value = false
                if (
                    response.status_code == '200' &&
                    response.data.issue === route.params.id
                ) {
                    messages.value.push(response.data)
                }
            })

            socket.on('leave-room-response', (response) => {
                //TODO: CHECK RESPONSE STATUS
                /* console.log(response.data) */
            })
        })

        onUnmounted(() => {
            socket.close()
        })

        async function FETCH_MESSAGES(ID) {
            try {
                loading.value = true
                const response = await MessageService.getAll(ID)
                console.log(response)
                messages.value = response.data.data
                loading.value = false
            } catch (error) {
                loading.value = false
                console.log(error)
            }
        }
        const sending_message = ref(false)
        async function SEND_MESSAGE() {
            if (message_body.value == null) {
                sending_message.value = false
                return
            }
            try {
                sending_message.value = true
                const data = {
                    issue: route.params.id,
                    issue_data: store.state.issue.Issue,
                    sender: store.state.auth.user.pk,
                    sender_data: store.state.auth.user,
                    message_body: message_body.value,
                }

                socket.emit('send-message', data, (data) => {})
                message_body.value = ''
            } catch (error) {
                sending_message.value = false
                console.log(error)
            }
        }

        async function LEAVE_ROOM() {
            console.log('leaving romm emit')
            try {
                const data = {
                    issue_id: route.params.id,
                    user_id: store.state.auth.user.pk,
                    first_name: store.state.auth.user.first_name,
                    last_name: store.state.auth.user.last_name,
                }
                loading.value = true
                socket.emit('leave-room', data, (data) => {})
            } catch (error) {
                loading.value = false
                console.log(error)
            }
        }

        async function CHANGE_ISSUE_STATUS(status, status1) {
            try {
                const data = {
                    issue_id: route.params.id,
                    new_issue_status: status,
                    old_issue_status: status1,
                }
                loading.value = true
                await socket.emit('change-issue-status', data, (data) => {
                    console.log(data)
                })
                router.push('/Dashboard')
            } catch (error) {
                loading.value = false
                console.log(error)
            }
        }

        return {
            sidebarNavigation,
            message,
            messages,
            message_body,
            sending_message,
            open,
            router,
            route,
            store,
            loading,
            SEND_MESSAGE,
            CHANGE_ISSUE_STATUS,
            ISSUE_DATA: computed(() => store.getters['issue/Issue']),
        }
    },
}
</script>
