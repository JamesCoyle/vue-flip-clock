<template>
	<div class="flip-clock">
		<template v-for="(chunk, index) in chunks">
			<span :key="index" class="chunk" :class="['chunk-' + (chunks.length - index)]">
				<template v-if="isNaN(chunk)">{{ chunk }}</template>
				<template v-else>
					<flip-clock-digit v-for="(digit, index) in chunk.match(/\d/g)" :key="index" :digit="digit" :duration="duration"></flip-clock-digit>
				</template>
			</span>
		</template>
	</div>
</template>

<script>
import FlipClockDigit from './flip-clock-digit'

export default {
	components: {
		FlipClockDigit,
	},

	props: {
		display: String,
		duration: {
			type: Number,
			default: 100,
		},
	},

	computed: {
		chunks() {
			if (!this.display) return []
			return this.display.match(/\d+|\D+/g)
		},
	},
}
</script>

<style>
.flip-clock {
	padding: 16px;
	font-size: 64px;
}

.chunk {
	position: relative;
}
</style>
