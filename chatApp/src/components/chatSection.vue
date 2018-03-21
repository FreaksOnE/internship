<template>
  <div 
    v-if="!showMenu && !preLoad"
    class="chat-section">
    <transition name="prop-slide">
      <div 
        v-if="selectedMsgsCount"
        class="msg-prop">
        <div 
          class="close-btn" 
          @click="deselectAllMsgs">
          <i class="material-icons">close</i>
        </div>
        <div 
          class="elem" 
          style="width: 140px;">
          <div class="label">
            selected messages&nbsp;{{ selectedMsgsCount }}
            <span style="font-size: 14px;padding: 0px 3px;font-weight: 700;"/>
          </div>
        </div>
        <div class="elem">
          <i class="material-icons">edit</i>
          <div class="label">Edit</div>
        </div>
        <div class="elem">
          <i class="material-icons">delete</i>
          <div class="label">Delete</div>
        </div>
        <div class="elem">
          <i class="material-icons">forward</i>
          <div class="label">Forward</div>
        </div>
        <div class="elem">
          <i class="material-icons">content_copy</i>
          <div class="label">Copy</div>
        </div>

      </div>
    </transition>
    <div 
      :class="{ open: selectedMsgsCount }"
      class="chat-cont">
      <transition 
        name="chatFade" 
        mode="out-in">
        <div 
          ref="scrollElem"
          class="chat">
          <transition-group 
            name="" 
            mode="out-in">
            <div 
              v-for="message in msgs" 
              :key="message._id" 
              :class="{ mine: message.from == userDetails._id }"
              class="msg-cont">
              <div 
                v-if="message.msgType == 'notification'"
                class="notification">
                {{ message.text }}
              </div>

              <div 
                v-if="userChange(message.queueNumber, message.conversationID) && message.msgType != 'notification'"
                class="user-change">
                {{ getUsername(message.from) }}
              </div>

              <div 
                v-if="userChange(message.queueNumber, message.conversationID) && message.from != userDetails._id && message.msgType != 'notification'"
                class="user-img">
                <img :src="getUserImage(message.from)">
              </div>

              <div 
                v-if="message.msgType != 'notification'" 
                :class="{ selected: message.selected, image: message.msgType == 'image' }"
                class="user-msg"
                @click="toggleSelectMsg(message._id)">
                <div class="time">{{ message.date.match(/\d\d:.+(?=\:)/g)[0] }}</div>
                <div class="text" >{{ message.text }}</div>
                <img 
                  v-if="message.msgType == 'image'"
                  :src="message.text">
              </div>
            </div>
          </transition-group>
          <div class="extra-padding"/>
      </div></transition>
    </div>
  </div>
</template>

<script>
//      v-bar="{}"

var _ = require("underscore");

export default {
	name: "ChatSection",
	computed: {
		selectedMsgsCount() {
			return this.$store.state.selectedMsgsCount;
		},
		msgs() {
			return this.$store.getters.getMsgs;
		},
		showMenu() {
			return this.$store.getters.getShowMenu;
		},
		userDetails() {
			return this.$store.getters.getUserDetails;
		},
		users() {
			return this.$store.getters.getUsers;
		},
		preLoad() {
			return this.$store.getters.getPreLoad;
		},
		hideChat() {
			return this.$store.getters.getHideChat;
		},
	},
	methods: {
		toggleSelectMsg: function(id) {
			this.$store.dispatch("toggleSelectMsg", id);
		},
		deselectAllMsgs: function() {
			this.$store.dispatch("deselectAllMsgs");
		},
		userChange: function(queue, convID) {
			if (queue < 1) {
				return false;
			} else {
				var firstMsg = _.findWhere(this.msgs, {
					conversationID: convID,
					queueNumber: queue,
				});
				var tempOffset = 1;
				var secondMsg;
				while (secondMsg == undefined) {
					secondMsg = _.findWhere(this.msgs, {
						conversationID: convID,
						queueNumber: queue - tempOffset,
					});
					tempOffset += 1;
				}

				if (firstMsg.from == secondMsg.from) {
					return false;
				} else {
					return true;
				}
			}
		},
		getUsername: function(userID) {
			var temp;
			temp = _.findWhere(this.users, {
				_id: userID,
			});
			if (temp != undefined) return temp.name;
			else return userID;
		},
		getUserImage: function(userID) {
			this.scrollBottom();
			var temp;
			temp = _.findWhere(this.users, {
				_id: userID,
			});
			if (temp != undefined) return temp.picture;
			else return userID;
		},
		scrollBottom: function() {
			var elem = this.$refs;
			console.log(elem);
			elem.scrollTop = elem.scrollHeight;
		},
	},
};
</script>

<style>
.extra-padding {
  width: 100%;
  padding: 70px 0px;
}


.chatFade-enter-active,
.chatFade-leave-active {
  transition: all 0.3s ease;
}

.chatFade-enter,
.chatFade-leave-to {
  opacity: 0;
}

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

.chat-section {
  /*width: 100%;*/
  height: 100%;
  transition: width 0.3s ease;
  margin-right: 250px;
  position: relative;
}

.chat-section .chat-cont {
  height: 100%;
  overflow-y: auto;
}

.chat-section .chat-cont.open .chat {
  padding-top: 65px;
}

.chat-section .chat {
  /*padding: 15px 0px 130px 0px;*/
  transition: all 0.2s ease;
  position: relative;
}

.chat-section .msg-cont {
  /*padding-top: 15px;
	margin-bottom: 10px;*/
  padding-right: 0;
  padding-left: 80px;
  display: block;
  position: relative;
  overflow: hidden;
}

.chat-section .msg-cont .user-change {
  height: 15px;
  font-size: 10px;
  padding: 0px 30px;
  text-align: left;
}

.chat-section .msg-cont.mine .user-change {
  text-align: right;
}

.chat-section .msg-cont.mine {
  padding-left: 0;
  padding-right: 20px;
}

.chat-section .msg-cont .user-msg {
  background: #fff;
  min-width: 50px;
  border-radius: 10px;
  position: relative;
  margin-bottom: 8px;
  margin-left: 25px;
  margin-right: 25px;
  float: left;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  max-width: 550px;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;
  color: #222;
}

.chat-section .msg-cont .user-msg.selected {
  background-color: #555 !important;
  color: #eee !important;
}

.chat-section .msg-cont .user-msg.image {
  width: 400px;
  height: auto;
}

.chat-section .msg-cont .user-msg.image img {
  width: 380px;
  height: 360px;
  position: relative;
  left: 10px;
  top: 25px;
  padding-bottom: 35px;
}

.chat-section .msg-prop {
  width: 98%;
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 20px;
  margin: auto;
  min-height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #555;
  color: #eee;
  z-index: 3;
  padding-right: 2%;
}

.chat-section .msg-prop .elem {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  float: right;
  width: 100px;
  text-align: center;
  font-size: 18px;
}

.chat-section .msg-prop .close-btn {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 40px;
  text-align: center;
  float: right;
  font-size: 18px;
}

.chat-section .msg-prop .close-btn i {
  padding: 16px 0px;
}

.chat-section .msg-prop .elem > i {
  padding: 16px 20px 15px 3px;
  float: right;
}

.chat-section .msg-prop .elem .label {
  float: right;
  font-size: 12px;
  text-align: right;
  height: 50px;
  line-height: 50px;
}

.chat-section .msg-cont.mine .user-msg {
  float: right;
  background-color: #eee;
}

.chat-section .msg-cont .notification {
  position: relative;
  font-size: 12px;
  padding: 4px;
  border-radius: 6px;
  margin: 12px auto 4px auto;
  text-align: center;
  user-select: none;
  cursor: default;
}

.chat-section .msg-cont .user-name {
  position: absolute;
  font-size: 10px;
  top: 2px;
  left: 30px;
  color: #888;
  user-select: none;
}

.chat-section .msg-cont .user-msg .time {
  position: absolute;
  font-size: 9px;
  top: 3px;
  right: 10px;
  color: #888;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.chat-section .msg-cont.mine .user-msg .time {
  left: 10px;
}

.chat-section .msg-cont .user-msg .text {
  position: relative;
  padding: 15px;
  font-size: 13px;
  padding-right: 30px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

.chat-section .msg-cont.mine .user-msg .text {
  padding: 15px;
  padding-left: 30px;
}

.chat-section .msg-cont .user-img {
  position: absolute;
  width: 50px;
  height: 50px;
  /*background-color: #555;*/
  left: 30px;
  top: 12px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.chat-section .msg-cont .user-img img {
  width: 50px;
}

.prop-slide-enter-active,
.prop-slide-leave-active {
  transition: all 0.2s ease;
}
.prop-slide-enter,
.prop-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.msg-in-enter-active,
.msg-in-leave-active {
  transition: all 0.1s;
}
.msg-in-enter,
.msg-in-leave-to {
  opacity: 0;
}
</style>