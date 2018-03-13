<template>
	<transition name="memberListSlide">
		<div class="member-list" v-if="!showMenu">
			<div class="online">
				<div class="header">online-0</div>
				<!--<transition-group name="fade">-->
				<user-cont v-for="user in users" :key="user.id">
					<span slot="user-picture">
						<img :src="user.picture">
					</span>
					<span slot="display-name">{{ user.name }}</span>
					<span slot="user-status">{{ user.online ? 'online' : 'offline' }}</span>
				</user-cont>
				<!--</transition-group>-->
			</div>
			<div class="offline">
				<div class="header">offline-0</div>
				<!--<transition-group name="fade">-->

				<!--</transition-group>-->
			</div>

			<transition name="fade">
				<div class="profile" style="display: none;">
					<div class="pf-container">
						<div class="user-image">
							<img>
						</div>
						<div class="close-btn">
							<i class="material-icons">keyboard_arrow_right</i>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
var userCont = {
	template:
			"<div class=\"user\"><div class=\"user-image\"><slot name=\"user-picture\">%user-picture%</slot></div><span style=\"float:left;width:130px;\"><div class=\"user-name\"><slot name=\"display-name\">%display-name%</slot></div><div class=\"user-status\"><slot name=\"user-status\">%user-status%</slot></div></span></div>"
};

export default {
	name: "memberList",
	computed: {
		showMenu() {
			return this.$store.getters.getShowMenu;
		},
		users() {
			return this.$store.getters.getUsers;
		}
	},
	components: {
		"user-cont": userCont
	}
};
</script>

<style>
	.member-list {
		position: absolute;
		width: 250px;
		height: 100%;
		background-color: #555;
		right: 0px;
		top: 0px;
		color: #eee;
		z-index: 5;
		transition: all 0.35s ease;
		box-shadow: -3px 0px 4px 0px rgba(0, 0, 0, 0.3);
	}

	.member-list.open {
		width: 100%;
	}

	.member-list>* {
		position: relative;
		width: 80%;
		margin: auto;
		padding-top: 25px;
	}

	.member-list .header {
		font-size: 17px;
		position: relative;
		padding-bottom: 8px;
	}

	.member-list .header::after {
		content: "";
		width: 100%;
		height: 2px;
		background-color: #666;
		position: absolute;
		left: 0px;
		bottom: 0px;
	}

	.member-list .user {
		width: 100%;
		height: 60px;
		display: block;
		position: relative;
		cursor: pointer;
	}

	.member-list .user .user-image {
		height: 40px;
		width: 40px;
		margin: 10px 10px 10px 0px;
		background-color: #eee;
		border-radius: 50%;
		box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.2);
		float: left;
		overflow: hidden;
	}

	.member-list .user .user-image img {
		width: 40px;
	}

	.member-list .user .user-name {
		width: 150px;
		float: left;
		padding-top: 13px;
		font-size: 16px;
		padding-bottom: 3px;
	}

	.member-list .user .user-status {
		font-size: 10px;
		width: 150px;
		float: left;
	}

	.member-list .profile {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		padding: 0px;
	}

	.member-list .profile .close-btn {
		position: absolute;
		top: 0px;
		right: 0px;
		height: 390px;
		width: 50px;
		color: #555;
		font-size: 50px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.member-list .profile .close-btn:hover {
		color: #eee;
	}

	.member-list .profile .close-btn>i {
		margin: 170px 0px;
	}

	.member-list .profile .pf-container {
		content: "";
		height: 60%;
		width: 100%;
		position: absolute;
		top: 20%;
		left: 0px;
		background-color: rgba(0, 0, 0, 0.5);
		box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.6);
		min-height: 390px;
	}

	.member-list .profile .user-image {
		width: 300px;
		height: 300px;
		border-radius: 10px;
		background-color: #eee;
		position: absolute;
		right: 70px;
		top: -70px;
		box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.3);
		overflow: hidden;
	}

	.member-list .profile .user-image img {
		width: 300px;
		height: 300px;
	}

	.memberListSlide-enter-active,
	.memberListSlide-leave-active {
		transition: all .2s;
	}

	.memberListSlide-enter,
	.memberListSlide-leave-to {
		opacity: .0;
		transform: translateX(40px);
	}
</style>