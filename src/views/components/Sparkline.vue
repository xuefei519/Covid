<template>
    <v-sparkline
            :value="value"
            :gradient="gradient"
            :smooth="radius || false"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            auto-draw
    ></v-sparkline>
</template>

<script>

    export default{
        name: "Sparkline",
        props: {
            vaule: {
                type: Array
            },
            gradient: {
                type: Array
            },
            radius:  {
                type: Number,
                default: 50
            },
        }

    };
</script>

<style scoped>

</style>




