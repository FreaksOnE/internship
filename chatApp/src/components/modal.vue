<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div style="float: left;">
            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button 
                  class="modal-ok-button" 
                  @click="$emit('create')">Create</button>
                <button 
                  class="modal-cancel-button" 
                  @click="$emit('close')">Cancel</button>
                <div class="clearfix"/>
              </slot>
            </div>
          </div>
          <div class="modal-image">
            <slot name="image"/>
          </div>
          <div class="clearfix"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
	name: "Modal",
	computed: {
		
	},
	methods: {
		
	},
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  border-radius: 6px;
  color: #777;
  text-align: center;
  overflow: hidden;
  height: 190px;
}

.modal-header {
  padding: 0 30px;
  width: 260px;
  text-transform: uppercase;
  padding-top: 20px;
}

.modal-body {
  margin: 18px 0;
  padding: 0 30px;
  width: 260px;
}

.modal-body input {
  border: none;
  border-bottom: 1px solid #777;
  width: 260px;
  height: 25px;
  padding-top: 10px;
}

.modal-footer {
  padding: 0 30px;
  width: 260px;
}

.modal-footer button {
  width: 46%;
  height: 36px;
  border: 2px solid #777;
  font-weight: 700;
  float: left;
  margin: 0 2%;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  background: none;
}

.modal-footer button:hover {
  color: #fff;
  border-color: #555;
  background-color: #555;
  box-shadow: 3px 0px 6px 0px rgba(0, 0, 0, 0.3);
}

.modal-image {
  float: right;
  width: 180px;
  overflow: hidden;
}

.modal-image img {
  position: relative;
  left: -55px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
  
