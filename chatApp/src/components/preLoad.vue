<template>
  <transition name="fade">
    <div 
      v-if="preLoad" 
      class="pre-loader-cont"
      @keyup.enter="enterApp">
      <!--<img src="../assets/loading.svg" alt="loading"/>-->
      <div 
        class="enter-btn" 
        @click="enterApp">
        Enter
      </div>
      <div 
        v-if="authenticated"
        class="logout-btn" 
        @click="logout">
        Logout
      </div>
    </div>
  </transition>
</template>

<script>

export default {
	name: "PreLoad",
	props: [
		"auth",
		"authenticated",
	],
	computed: {
		preLoad() {
			return this.$store.getters.getPreLoad;
		},
	},
	methods: {
		logout: function() {
			this.$store.dispatch("doLogout");
		},
		enterApp: function() {
			//console.log("auth: "+this.authenticated);
			if(this.authenticated){
				//this.$store.dispatch("doLogout");
				this.$store.dispatch("checkAuth").then(() => {
					this.$store.dispatch("togglePreLoad", false);
				});	
			} else {
				this.$store.dispatch("doLogin");
			}
		},
	},
};
</script>

<style>
	.pre-loader-cont {
		width: 100vw;
		height: 100vh;
		z-index: 1000;
		position: fixed;
		background-color: #222;
	}

	.pre-loader-cont .enter-btn {
		font-family: "Gubblebum Blocky";
		position: absolute;
		height: 50px;
		width: 260px;
		border: 2px solid #f08080;
		border-radius: 25px;
		top: 45%;
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
		color: #f08080;
		line-height: 50px;
		font-size: 30px;
		letter-spacing: 10px;
		user-select: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.pre-loader-cont .enter-btn:hover {
		letter-spacing: 15px;
	}

	.pre-loader-cont .logout-btn {
		position: absolute;
		height: 40px;
		width: 100px;
		border: 2px solid #f08080;
		border-radius: 25px;
		top: 10%;
		left: 5%;
		text-align: center;
		color: #f08080;
		line-height: 40px;
		font-size: 16px;
		user-select: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

</style>
