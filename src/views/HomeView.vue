<template>
    <div class="home">
        <div class="container">
            <reviews-form />
            <review-stats />
            <review-list />
        </div>
    </div>
</template>
<script setup>
import ReviewsForm from "../components/reviews-form.vue";
import ReviewStats from "../components/review-stats.vue";
import ReviewList from "../components/review-list.vue";
</script>
