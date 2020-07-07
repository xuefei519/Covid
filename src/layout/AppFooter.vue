<template>
    <footer class=" footer-light">
        <div class="container dashContainer">
            <div class="row align-items-right justify-content-md-between">
                <div class="col-md-12" style="display: inline-block">
                    <img src="img/brand/Quebec_logo_lily.svg" style="height:24px;">
                    <span style="font-size:13px">Made by Xuefei</span>
                </div>

            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "DashboardFooter",
        data() {
            return {
                year: new Date().getFullYear(),
                modal: {
                    show: false
                }
            }
        }
    }
</script>
