<template>
    <div>
        <transition>

            <router-view></router-view>
        </transition>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>