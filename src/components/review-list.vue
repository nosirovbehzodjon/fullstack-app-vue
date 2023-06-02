<template>
    <div>
        <p v-if="!store.reviewsContent || store.reviewsContent.length === 0">
            No Reviews Yet
        </p>
        <div class="reviewList" v-else>
            <review-item
                v-for="(item, i) in store.reviewsContent"
                :key="i"
                :item="item"
            />
        </div>
    </div>
</template>

<script setup>
import ReviewItem from "./review-item.vue";
import { useReviewsStore } from "../stores/reviews";
const store = useReviewsStore();
</script>
