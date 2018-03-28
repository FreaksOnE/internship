<template>
  <transition name="fade">
    <div 
      v-if="preLoad" 
      class="pre-loader-cont"
      @keyup.enter="enterApp">
      <!--<img src="../assets/loading.svg" alt="loading"/>-->
      
      <div 
        v-if="authenticated"
        class="logout-btn" 
        @click="logout">
        Logout
      </div>

      <div class="cu-container">
        <div 
          class="enter-btn" 
          @click="enterApp">
          Enter
        </div>
        <div class="app-dl">
          <a 
            class="win" 
            href="/chatApp-win32-x64.zip">
            <div class="desc">Download<br> Windows executable</div>
          </a>
          <a 
            class="linux"
            href="/chatApp-linux-x64.zip">
            <div class="desc">Download<br> Linux executable</div>
          </a>
        </div>
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

.cu-container {
	height: 140px;
	position: absolute;
	top: calc(50% - 70px);
	width: 100%;
	text-align: center;
}

.app-dl {
	position: relative;
	width: 270px;
	height: auto;
	right: 20px;
	float: right;
}

.app-dl > * {
	display: block;
	width: 100%;
	height: 70px;
	cursor: pointer;
	transition: all 0.2s ease;
	position: relative;
	color: #555 !important;
}

.app-dl > *:hover {
	color: #555 !important;
}

.app-dl > *:hover {
	color: #555;
}

.app-dl .desc {
	font-size: 14px;
	line-height: 20px;
	text-align: left;
	padding-left: 10px;
	padding-top: 15px;
}

.app-dl > .win::before {
	font-family: "Font Awesome";
	content: "\f17a";
	position: relative;
	float: right;
	width: 70px;
	font-size: 38px;
	user-select: none;
	color: inherit;
	line-height: 70px;
	text-align: center;
}

.app-dl > .win::after {
	position: absolute;
	content: "";
	height: 50px;
	width: 0px;
	overflow: height;
	border-right: 3px solid #eee;
	right: 0px;
	top: 10px;
	background-color: #eee;
	z-index: -1;
	transition: all 0.3s ease;
}

.app-dl > .win:hover:after, .app-dl > .linux:hover:after {
	width: 267px;
}

.app-dl > .linux::before {
	font-family: "Font Awesome";
	content: "\f17c";
	position: relative;
	float: right;
	width: 70px;
	font-size: 38px;
	user-select: none;
	color: inherit;
	line-height: 70px;
	text-align: center;
}

.app-dl > .linux::after {
	position: absolute;
	content: "";
	height: 50px;
	width: 0px;
	overflow: height;
	border-right: 3px solid #eee;
	right: 0px;
	top: 10px;
	background-color: #eee;
	z-index: -1;
	transition: all 0.3s ease;
}


	.pre-loader-cont {
		width: 100vw;
		height: 100vh;
		z-index: 1000;
		position: fixed;
		background-color: #222;
	}

	.pre-loader-cont .enter-btn {
		font-family: "Gubblebum Blocky";
		position: relative;
		height: 100px;
		width: 300px;
		/*border: 2px solid #f08080;
		letter-spacing: 10px;
		border-radius: 25px;*/
		color: #555;
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
		line-height: 100px;
		font-size: 100px;
		user-select: none;
		cursor: pointer;
		transition: all 0.3s ease;
		display: inline-block;
		padding: 20px;
	}

	.pre-loader-cont .enter-btn:hover {
		color: #f08080;
	}

	.pre-loader-cont .logout-btn {
		position: absolute;
		height: 40px;
		width: 100px;
		/*border: 2px solid #f08080;*/
		border-radius: 4px;
		top: 20px;
		right: 20px;
		background-color: #111;
		text-align: center;
		color: #555;
		line-height: 40px;
		font-size: 16px;
		user-select: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

</style>
