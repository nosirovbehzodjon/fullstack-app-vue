<template>
    <div class="card" >
        <slot/>
    </div>
</template>

<script>
export default {
    name:"Card",
    props:{
        type:Boolean,
        default:false
    }
}
</script>
<style  scoped>
.card{
    background-color: #ffffff;
    color: #212121;
}
.card.reverse{
    background-color: #212121;
    color: #ffffff;
}
</style>