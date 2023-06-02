import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useReviewsStore = defineStore("reviews", {
    state: () => ({
        reviews: [],
        editedData: {
            editable: false,
            item: null,
        },
    }),
    actions: {
        async addReview(review) {
            const response = await fetch("http://localhost:5000/reviews/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(review),
            });
            const newReview = await response.json();
            console.log(newReview);
            this.reviews = [newReview, ...this.reviews];
        },
        async fetchReview() {
            try {
                const response = await fetch(
                    "http://localhost:5000/reviews?_sort=id&_order=desc"
                );
                const data = await response.json();
                this.reviews = data;
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        async updateReview(review) {
            const response = await fetch(
                `http://localhost:5000/reviews/${review.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(review),
                }
            );
            const data = await response.json();
            let reviews = this.reviews.map((item) =>
                item.id === review.id ? { ...item, ...data } : item
            );
            this.reviews = reviews;
            this.fetchReview();
            let editedData = {
                editable: false,
                item: null,
            };
            this.editedData = editedData;
        },
        async deleteReview(review) {
            await fetch(`http://localhost:5000/reviews/${review.id}`, {
                method: "DELETE",
            });
            this.reviews = this.reviews.filter((rev) => rev.id !== review.id);
            this.fetchReview();
        },

        editReview(review) {
            let editedData = {
                editable: true,
                item: review,
            };
            this.editedData = editedData;
        },
    },
    getters: {
        averageRating(state) {
            let temp =
                state.reviews.reduce((acc, cur) => {
                    return acc + cur.rating;
                }, 0) / state.reviews.length;
            temp = temp.toFixed(1).replace(/[.,]0$/, "");
            return temp;
        },
        reviewsCount(state) {
            return state.reviews.length;
        },
        reviewsContent() {
            return this.reviews;
        },
        editedContent() {
            return this.editedData;
        },
    },
});
