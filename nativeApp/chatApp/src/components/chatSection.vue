<template>
<div class="chat-section">
	<transition name="prop-slide">
		<div class="msg-prop">
			<div class="close-btn">
				<i class="material-icons">close</i>
			</div>
			<div class="elem" style="width: 140px;">
				<div class="label">
					selected messages&nbsp;<span style="font-size: 14px;padding: 0px 3px;font-weight: 700;"></span>
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
	<div class="chat-cont">
		<div class="chat">
			<!--<transition-group name="msg-in" mode="out-in">
				<div class="msg-cont">
					<div class="notification"></div>
					<div class="user-change"></div>
					<div class="user-img"><img></div>
					<div class="user-msg">
						<div class="time"></div>
						<div class="text"></div>
					</div>
					<div class="user-msg image">
						<div class="time"></div>
						<img>
					</div>
				</div>
			</transition-group>-->
		</div>
	</div>
</div>
</template>

<script>
	export default {
		name: 'chatSection',
		computed: {
			count() {
				return this.$store.state.selectedMsgsCount
			}
		}
	}

</script>

<style>
	.chat-section {
		/*width: 100%;*/
		height: 100%;
		transition: width 0.3s ease;
		margin-right: 250px;
		position: relative;
	}

	.chat-section .chat-cont {
		height: 100%;
		overflow-y: scroll;
	}

	.chat-section .chat-cont.open {}

	.chat-section .chat-cont.open .chat {
		padding-top: 65px;
	}

	.chat-section .chat {
		padding: 15px 0px 130px 0px;
		position: relative;
		transition: all 0.2s ease;
	}

	.chat-section .chat {}

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
		height: 400px;
	}

	.chat-section .msg-cont .user-msg.image img {
		width: 380px;
		height: 360px;
		position: relative;
		left: 10px;
		top: 25px;
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

	.chat-section .msg-prop .elem>i {
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
		/*background-color: #eee;
    min-width: 240px;
    width: 20%;*/
		margin: 12px auto 4px auto;
		text-align: center;

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
		background-color: #555;
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

</style>
