<template>
    <Header />
    <RouterView />
</template>
<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import Header from "./components/header.vue";
import { useReviewsStore } from "./stores/reviews";
const store = useReviewsStore();
onMounted(() => {
    store.fetchReview();
});
</script>
