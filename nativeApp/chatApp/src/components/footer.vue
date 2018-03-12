<template>
<transition name="slideUp">
	<div class="cu-footer">
		<div class="profile-ico-container">
			<div class="profile-ico"><i class="fa fa-user-circle-o"></i>
				<!--<img>-->
			</div>
		</div>
		<div class="inp-section">
			<div class="msg-input">
				<div class="status"></div>
				<input type="text" placeholder="Write a message...">
				<button type="button" class="send-btn"><i class="material-icons">send</i></button>
				<i class="material-icons">keyboard_voice</i>
				<i class="material-icons">add_a_photo</i>
				<i class="material-icons">attachment</i>
				<div class="user-options">
					<div class="logout">
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
        name: 'footer',
        computed: {
            count() {
                return this.$store.state.selectedMsgsCount
            }
        }
    }
</script>

<style>
	
</style>
