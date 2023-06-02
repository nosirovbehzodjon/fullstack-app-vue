<template>
    <ul class="rating">
        <li v-for="n in 10" :key="`rating-${n}`">
            <input 
                type="radio"
                name="rating"
                v-model="selected"
                :id="`num${n}`"
                :value="n"
                :checked="selected===n"
            />
            <label :for="`num${n}`">{{n}}</label>
        </li>

    </ul>
</template>
<script>
export default{
    name:'RatingSelect',
    data(){
        return{
            selected:this.rating
        }
    },
    props:{
        rating:{
            type:Number
        }
    },
    watch:{
        selected(newVal){
            this.$emit("setRating",newVal)
        },
        rating(newVal){
            this.selected=newVal;
        }
    }
}
</script>