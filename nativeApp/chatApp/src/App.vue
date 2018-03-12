<template>
    <div id="app">
        <!--<img src="./assets/logo.png">
        <router-view/>-->
		<side-bar></side-bar>
		<div id="main-container">
			<cu-footer></cu-footer>
		</div>
        
    </div>
</template>

<script>
	import sideBar from '@/components/sideBar';
	import footer from '@/components/footer';
	
	export default {
		name: 'App',
		data() {
			return {
				msg: 'hello'
			}
		},
		computed: {
			count() {
				return this.$store.state.selectedMsgsCount
			}
		},
		components: {
			'side-bar': sideBar,
			'cu-footer': footer,
			
		}
	}

</script>

<style>


</style>
