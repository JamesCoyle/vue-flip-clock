<template>
	<span class="flip-clock-digit" :style="{ '--duration': duration + 'ms' }">
		<transition mode="out-in" :duration="{ enter: 0, leave: duration }">
			<span class="digit" :key="digit">{{ digit }}</span>
		</transition>

		<span class="digit top" :key="digit">{{ digit }}</span>

		<transition name="flip" mode="out-in">
			<span class="digit flipper" :key="digit">{{ digit }}</span>
		</transition>
	</span>
</template>

<script>
export default {
	props: {
		digit: String,
		duration: {
			type: Number,
			default: 100,
		},
	},
}
</script>

<style>
.flip-clock-digit {
	position: relative;
	margin: 4px;
	padding: 0 8px;
	border-radius: 8px;
	display: inline-block;
	perspective: 150px;
	transform-style: preserve-3d;
}

.flip-clock-digit::before {
	content: '0';
	opacity: 0;
}

.digit {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: white;
	color: black;
	border-radius: 8px;
	text-align: center;
}

.top {
	bottom: unset;
	height: 49%;
	overflow: hidden;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

.flipper {
	backface-visibility: hidden;
}

.flip-enter-active,
.flip-leave-active {
	transition: transform var(--duration) cubic-bezier(0.4, 0, 1, 1);
}

.digit.flip-enter {
	transform: rotateX(90deg);
	transition-duration: calc(var(--duration) * 0.35);
}

.digit.flip-enter-to,
.digit.flip-leave {
	transform: rotateX(0deg);
	transition-duration: calc(var(--duration) * 0.65);
}

.digit.flip-leave-to {
	transform: rotateX(-90deg);
}
</style>
