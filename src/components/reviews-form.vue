<template>
    <Card>
        <form @submit.prevent="handleSuubmit">
            <h2>How would you rate your service with us!</h2>
            <rating-select :rating="rating" @setRating="setRating" />
            <div class="input-group">
                <input
                    type="text"
                    placeholder="Write a review"
                    v-model="text"
                />
                <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="btnDisabled"
                >save</button>
            </div>
            <div class="message" v-if="message !== ''">
                {{ message }}
            </div>
        </form>
    </Card>
</template>
<script setup>
import { ref, warn, watch } from "vue";
import RatingSelect from "./rating-select.vue";
import Card from "./shared/card.vue";
import { useReviewsStore } from "../stores/reviews";
import { storeToRefs } from "pinia";
const store = useReviewsStore();
const text = ref("");
const btnDisabled = ref(true);
const message = ref("");
const rating = ref(10);

const { editedContent } = storeToRefs(store);
watch(editedContent, (newData) => {
    if (newData.editable) {
        text.value = newData.item.text;
        rating.value = newData.item.rating;
    }
});
watch(text, (newVal) => {
    if (newVal.trim().length <= 10) {
        btnDisabled.value = true;
        message.value = "Text must be at least 10 characters";
    } else {
        btnDisabled.value = false;
        message.value = '';
    }
});
const handleSuubmit = () => {
    const newReview = {
        text: text.value,
        rating: rating.value,
    };
    if (!store.editedContent.editable) {
        store.addReview(newReview);
    } else {
        store.updateReview({
            ...newReview,
            id: store.editedContent.item.id,
        });
    }
};

const setRating = (val) => {
    rating.value = val;
    console.log(val);
};
</script>
