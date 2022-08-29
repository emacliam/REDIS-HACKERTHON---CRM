<template>
    <main
        class="absolute z-[100] right-20 top-10 bg-red-400 w-64 rounded-lg px-8 py-4"
    >
        {{ msg }}
    </main>
</template>

<script>
export default {
    props: ['theme', 'message'],
    setup(props) {
        const msg = ref(props.message)
        return {
            msg,
        }
    },
}
</script>

<style></style>
