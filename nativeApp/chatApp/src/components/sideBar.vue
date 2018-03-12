<template>
<transition name="sidebarSlide">
    <div id="sidebar">
        <div class="logo-cont"></div>
        <div class="server-cont">
            <div class="server"></div>
            <div class="server-name"><i class="material-icons" style="padding: 1px 4px 1px 0px; float: left;">group</i></div>
            <div class="server-users">0 members</div>
            <!--<transition name="fade">-->
            <div class="notifications"></div>
            <!--</transition>-->
            <div class="clearfix"></div>
        </div>
        <div class="addNew-btn"><i class="material-icons">add</i></div>
    </div>
</transition>
</template>

<script>
    export default {
        name: 'sideBar',
        computed: {
            count() {
                return this.$store.state.selectedMsgsCount
            }
        }
    }
</script>

<style>
	
</style>
