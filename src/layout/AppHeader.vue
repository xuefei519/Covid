<template>
    <header class="dashboard header-global navbar-light">
            <base-nav class="" type="" effect="light" expand>
                <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                    <img src="img/brand/Quebec_logo_lily.svg" alt="logo">
                    <span style="vertical-align: middle">Quebec COVID-19 Dashboard</span>
                </router-link>

            </base-nav>
        <div class="container updateTime"><span>Mise à jour selon les données extraites le <span id="updatedDate">10 Mai 2020,</span></span> 18h</div>
    </header>
</template>
<script>
    import BaseNav from "@/components/BaseNav";
    import BaseDropdown from "@/components/BaseDropdown";
    import CloseButton from "@/components/CloseButton";
    import { headroom } from "vue-headroom"

    export default {
        components: {
            BaseNav,
            CloseButton,
            BaseDropdown,
            headroom
        }
    };
</script>
<style>
</style>
