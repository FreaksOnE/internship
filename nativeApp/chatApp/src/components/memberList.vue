<template>
  <transition name="memberListSlide">
    <div 
      v-if="!showMenu && !preLoad" 
      :class="{ open: showProfile }"
      class="member-list">
      <div 
        v-if="!showProfile"
        class="online">
        <div class="header">online-{{ onlineMembers.length }}</div>
        <transition-group name="fade">
          <user-cont 
            v-for="user in onlineMembers" 
            :key="user._id" 
            @click.native="toggleShowProfile">
            <span slot="user-picture">
              <img :src="user.picture">
            </span>
            <span slot="display-name">{{ user.name }}</span>
            <span slot="user-status">{{ user.online ? 'online' : 'offline' }}</span>
          </user-cont>
        </transition-group>
      </div>
      <div 
        v-if="!showProfile"
        class="offline">
        <div class="header">offline-{{ offlineMembers.length }}</div>
        <transition-group name="fade">
          <user-cont 
            v-for="user in offlineMembers" 
            :key="user._id" 
            @click.native="toggleShowProfile">
            <span slot="user-picture">
              <img :src="user.picture">
            </span>
            <span slot="display-name">{{ user.name }}</span>
            <span slot="user-status">{{ user.online ? 'online' : 'offline' }}</span>
          </user-cont>
        </transition-group>
      </div>

      <transition name="fade">
        <div 
          v-if="showProfile"
          class="profile">
          <div class="pf-container">
            <div class="user-image">
              <img>
            </div>
            <div 
              class="close-btn" 
              @click="toggleShowProfile">
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
    "<div class=\"user\"><div class=\"user-image\"><slot name=\"user-picture\">%user-picture%</slot></div><span style=\"float:left;width:130px;\"><div class=\"user-name\"><slot name=\"display-name\">%display-name%</slot></div><div class=\"user-status\"><slot name=\"user-status\">%user-status%</slot></div></span></div>",
};

export default {
	name: "MemberList",
	components: {
		"user-cont": userCont,
	},
	computed: {
		showMenu() {
			return this.$store.getters.getShowMenu;
		},
		users() {
			return this.$store.getters.getUsers;
		},
		showProfile() {
			return this.$store.getters.getShowProfile;
		},
		openedChat() {
			return this.$store.getters.getOpenedChat;
		},
		chatMembers() {
			return this.$store.getters.getMembersObj;
		},
		onlineMembers() {
			return this.$store.getters.getOnlineMembers;
		},
		offlineMembers() {
			return this.$store.getters.getOfflineMembers;
		},
		preLoad() {
			return this.$store.getters.getPreLoad;
		},
	},
	methods: {
		toggleShowProfile: function() {
			this.$store.dispatch("toggleShowProfile");
			/*console.log(this.onlineMembers);
			console.log(this.offlineMembers);
			console.log("users length:"+this.chatMembers.length);*/
		},
	},
};
</script>

<style>
.vb > .vb-dragger {
  z-index: 5;
  width: 12px;
  right: 0;
  cursor: pointer;
}

.vb > .vb-dragger > .vb-dragger-styler {
  backface-visibility: hidden;
  transform: rotate3d(0, 0, 0, 0);
  transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  background-color: rgba(85, 85, 85, 0.6);
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(85, 85, 85, 0.6);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgb(85, 85, 85);
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: rgb(85, 85, 85);
  /*margin: 3px 3px 3px 0;
  height: 100%;*/
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgb(85, 85, 85);
}

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
  overflow: auto;
}

.member-list.open {
  width: 100%;
}

.member-list > * {
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
  /*background-color: #eee;*/
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

.member-list .profile .close-btn > i {
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
  transition: all 0.2s;
}

.memberListSlide-enter,
.memberListSlide-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>