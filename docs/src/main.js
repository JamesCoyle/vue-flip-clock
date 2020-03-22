import Vue from 'vue'

import app from './app.vue'

Vue.config.productionTip = false

new Vue({
	render: function(h) {
		return h(app)
	},
}).$mount('#app')
