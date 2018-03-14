<template>
	<transition name="sidebarSlide">
			<div id="sidebar" :class="{ open: showMenu }">
			<div class="logo-cont" @click="toggleMenu"></div>
			<server-cont v-for="server in servers" :key="server._id">
					<div class="server-name"  slot="server-name" v-show="showMenu">
						<i class="material-icons" style="padding: 1px 4px 1px 0px; float: left;">group</i>
						{{ server.name }}
					</div>
					<div class="server-users" slot="members-count" v-show="showMenu">
						{{ server.members.length }}&nbsp;people
					</div>
				<span slot="notifications-count">
					<div class="notifications" v-if="server.notifications">
						{{ server.notifications }}
					</div>
				</span>
			</server-cont>
			<div class="addNew-btn" @click="fetchServers">
				<i class="material-icons">add</i>
			</div>
		</div>
	</transition>
</template>

<script>
var serverCont = {
	template:
		"<div class=\"server-cont\"><div class=\"server\"></div><slot name=\"server-name\">%server-name%</slot><slot name=\"members-count\">%members-count%</slot><slot name=\"notifications-count\">%notifications-count%</slot><div class=\"clearfix\"></div></div>"
};

export default {
	name: "sideBar",
	computed: {
		servers() {
			return this.$store.getters.getServers;
		},
		showMenu() {
			return this.$store.getters.getShowMenu;
		}
	},
	components: {
		"server-cont": serverCont
	},
	methods: {
		toggleMenu: function() {
			this.$store.dispatch("toggleMenu");
		},
		fetchServers() {
			this.$store.dispatch("fetchServers");
		}
	},
};
</script>

<style>
#sidebar {
	position: absolute;
	left: 0px;
	height: 100vh;
	width: 80px;
	background-color: #555;
	z-index: 10;
	transition: all 0.2s ease;
	box-shadow: 3px 0px 4px 0px rgba(0, 0, 0, 0.3);
	color: #eee;
}

#sidebar.open {
	width: 230px;
	padding: 0 20px;
}

#sidebar .logo-cont {
	position: relative;
	display: block;
	height: 50px;
	border-radius: 10px;
	background-color: #eee;
	margin: 20px 10px 12px 10px;
	cursor: pointer;
	box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.2);
	transition: all 0.2s ease;
}

#sidebar .logo-cont::after {
	content: "";
	position: absolute;
	bottom: -11px;
	height: 2px;
	width: 40px;
	left: 10px;
	background-color: #e1e4e7;
	transition: all 0.2s ease;
}

#sidebar.open .logo-cont::after {
	width: 190px;
}

#sidebar .server {
	width: 60px;
	height: 60px;
	border-radius: 30px;
	background-color: #eee;
	position: relative;
	margin: 10px 10px;
	box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.2);
	transition: all 0.2s ease;
	float: left;
}

#sidebar .server-name {
	padding-top: 25px;
	float: left;
	width: 130px;
}

#sidebar .server-users {
	float: left;
	width: 130px;
}

#sidebar .server-cont:hover .server,
#sidebar .logo-cont:hover,
#sidebar .addNew-btn:hover {
	box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.5);
}

#sidebar .server-cont {
	position: relative;
	font-size: 13px;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	height: 80px;
	overflow: hidden;
}

#sidebar .server-cont span {
	padding: 0 2px;
}

#sidebar .server-cont::after {
	content: "";
	position: absolute;
	bottom: 0px;
	height: 2px;
	width: 40px;
	left: 20px;
	background-color: #e1e4e7;
	transition: all 0.2s ease;
}

#sidebar.open .server-cont::after {
	width: 190px;
}

#sidebar .server-cont .notifications {
	position: absolute;
	top: 50px;
	left: 52px;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: lightcoral;
	text-align: center;
	line-height: 16px;
	color: #eee;
	font-size: 13px;
}

#sidebar .addNew-btn {
	height: 60px;
	border-radius: 30px;
	background-color: #eee;
	position: relative;
	display: block;
	margin: 10px 10px;
	cursor: pointer;
	box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.2);
	color: #555;
	font-size: 46px;
	text-align: center;
	transition: all 0.2s ease;
}

#sidebar.open .addNew-btn {
	height: 40px;
	font-size: 26px;
}

#sidebar .addNew-btn > * {
	padding: 7px;
}

</style>
