<template>
  <transition name="slideUp">
    <div 
      v-if="!showMenu && !showProfile && !preLoad" 
      :class="{ open: userOptions }"
      class="cu-footer">
      <div class="profile-ico-container">
        <div 
          class="profile-ico" 
          @click="toggleUserOptions"><img :src="userDetails.picture">
          <!--<img>-->
        </div>
      </div>
      <div class="inp-section">
        <div class="msg-input">
          <div class="status"/>
          <input 
            ref="msg"
            v-model="msgText" 
            type="text" 
            placeholder="Write a message..." 
            @keyup.enter="sendMessage">
          <button 
            type="button" 
            class="send-btn" 
            @click="sendMessage"><i class="material-icons">send</i></button>
          <i class="material-icons">keyboard_voice</i>
          <i class="material-icons">add_a_photo</i>
          <i class="material-icons">attachment</i>
          <div class="user-options">
            <div 
              class="logout" 
              @click="logout">
              <i class="material-icons">exit_to_app</i>
              <div class="label">Signout</div>
            </div>
            <div class="settings">
              <i class="material-icons">settings</i>
              <div class="label">Settings</div>
            </div>
            <div class="change-status">
              <div class="label">Away</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
	name: "CuFooter",
	data: function() {
		return {
			msgText: "",
		};
	},
	computed: {
		userOptions() {
			return this.$store.getters.getShowUserOptions;
		},
		showMenu() {
			return this.$store.getters.getShowMenu;
		},
		showProfile() {
			return this.$store.getters.getShowProfile;
		},
		userDetails() {
			return this.$store.getters.getUserDetails;
		},
		preLoad() {
			return this.$store.getters.getPreLoad;
		},
	},
	methods: {
		toggleUserOptions: function() {
			this.$store.dispatch("toggleUserOptions");
		},
		logout: function() {
			this.$store.dispatch("doLogout");
		},
		sendMessage: function() {
			var userMsg = {
				msgType: "message",
				text: "",
				conversationID: this.$store.getters.getOpenedChat,
			};

			if (this.msgText) {
				userMsg.text = this.msgText;
				this.msgText = "";
				this.$refs.msg.focus();
				if (this.msgText.match(/:img:$/g)) {
					this.msgText = this.msgText.match(/.+(?=:.*:)/g)[0];
					userMsg.msgType = "image";
				}

				this.$store.dispatch("sendMessage", userMsg);
			}
		},
	},
};
</script>

<style>
.cu-footer {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 80px;
  z-index: 3;
  transition: all 0.2s ease;
}

.cu-footer .profile-ico-container {
  height: 80px;
  width: 120px;
  left: 0px;
  position: absolute;
  bottom: 0px;
}

.cu-footer .profile-ico {
  position: relative;
  height: 54px;
  width: 54px;
  border-radius: 50%;
  background-color: #eee;
  margin: auto;
  bottom: -10px;
  cursor: pointer;
  font-size: 54px;
  color: #555;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.cu-footer .profile-ico img {
  width: 54px;
  position: absolute;
  top: 0px;
  left: 0px;
}

.cu-footer .profile-ico i {
  position: relative;
  left: 0px;
  top: 0px;
}

.cu-footer .inp-section {
  height: 100%;
  /*width: 100%;*/
  transition: width 0.3s ease;
  margin-right: 250px;
}

.cu-footer .inp-section .status {
  position: absolute;
  font-size: 12px;
  top: -15px;
  left: 10px;
}

.cu-footer .inp-section .msg-input {
  display: block;
  margin: 0px 55px 0px 120px;
  height: 120px;
  position: relative;
  background-color: #555;
  border-top-right-radius: 10px;
  color: #eee;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.3);
  border-top-left-radius: 10px;
  top: 0px;
  font-size: 20px;
}

.cu-footer.open {
  height: 120px;
}

.cu-footer .inp-section .msg-input > i {
  line-height: 33px;
  width: 36px;
  text-align: center;
  color: #aaa;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  float: right;
}

.cu-footer .inp-section .msg-input > i:first-of-type {
  margin-right: 20px;
}

.cu-footer .inp-section .msg-input .user-options {
  width: 100%;
  height: 40px;
  float: right;
}

.cu-footer .inp-section .msg-input .user-options > div {
  width: 100px;
  float: left;
  height: 100%;
  text-align: center;
  cursor: pointer;
}

.user-options .label {
  font-size: 12px;
  float: left;
  height: 40px;
  line-height: 40px;
}

.cu-footer .inp-section .msg-input .user-options i {
  padding: 10px 2px 10px 12px;
  font-size: 20px;
  float: left;
}

.cu-footer .inp-section .msg-input::after {
  content: "";
  width: 96%;
  height: 2px;
  background-color: #666;
  position: absolute;
  left: 0;
  top: 44px;
  right: 0;
  margin: auto;
}

.cu-footer .inp-section .msg-input input {
  height: 46px;
  width: 100%;
  padding: 0px 50px 0px 20px;
  border: none;
  background: none;
  float: left;
  color: #eee;
}

.cu-footer .inp-section .msg-input .send-btn {
  height: 46px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: right;
  padding-right: 15px;
  position: absolute;
  z-index: 3;
  right: 0px;
  font-size: 24px;
  color: #eee;
}

.slideUp-enter-active,
.slideUp-leave-active {
  transition: all 0.2s;
}
.slideUp-enter,
.slideUp-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
