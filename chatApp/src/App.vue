<template>
  <div id="app">
    <pre-load 
      :auth="auth" 
      :authenticated="authenticated"/>
    <router-view 
      :auth="auth" 
      :authenticated="authenticated"/>
    <side-bar/>
    <div id="main-container">
      <chat-section/>
      <member-list/>
      <cu-footer/>
    </div>

  </div>
</template>

<script>
import sideBar from "@/components/sideBar";
import cuFooter from "@/components/cuFooter";
import chatSection from "@/components/chatSection";
import memberList from "@/components/memberList";
import preLoad from "@/components/preLoad";

import AuthService from "./auth/AuthService";

const auth = new AuthService();

const { login, logout, authenticated, authNotifier, } = auth;

export default {
	name: "App",
	components: {
		"side-bar": sideBar,
		"cu-footer": cuFooter,
		"chat-section": chatSection,
		"member-list": memberList,
		"pre-load": preLoad,
	},
	data() {
		authNotifier.on("authChange", authState => {
			this.authenticated = authState.authenticated;
			console.log(authState);
			this.$store.dispatch("checkAuth");
		});
		return {
			auth,
			authenticated,
		};
	},
	computed: {
		count() {
			return this.$store.state.selectedMsgsCount;
		},
	},
	methods: {
		login,
		logout,
	},
};
</script>

<style>
@font-face {
  font-family: "Gubblebum Blocky";
  src: url("/assets/GUBBLO___.eot?") format("eot"), url("/assets/GUBBLO___.woff") format("woff"),
    url("/assets/GUBBLO___.ttf") format("truetype"),
    url("/assets/GUBBLO___.svg#Gubblebum-Blocky") format("svg");
  font-weight: normal;
  font-style: normal;
}

ol,
ul {
  margin: 0;
  margin-bottom: 0px !important;
}

body {
  margin: 0;
  /*	font-family: 'Open Sans', sans-serif; */
  font-family: "Raleway", sans-serif !important;
  color: #555 !important;
}

button::-moz-focus-inner,
button:active,
button:focus {
  border: 0;
  outline: none;
}

a:hover {
  color: #e96443 !important;
  text-decoration: none !important;
  transition: color 0.1s ease;
}

.material-icons {
  font-size: inherit !important;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}

input * {
  outline: none;
}

.clearfix {
  clear: both;
}

#main-container {
  position: relative;
  height: 100vh;
  margin-left: 80px;
  /*background-color: #e1e4e7 !important;*/
  /* #eaecee */
  background-color: transparent;
  background-image: url("assets/tile.gif");
  background-repeat: repeat;
  background-attachment: scroll;
  background-clip: border-box;
  background-origin: padding-box;
  background-size: auto auto;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute !important;
  width: 99%;
}

.fade-move {
  transition: transform 0.3s;
}

iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border: collapse;
  border-spacing: 0;
}
</style>