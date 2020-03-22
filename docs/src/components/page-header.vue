<template>
	<header :class="$style.header" :style="[lastColors, nextColors, blend]">
		<div>
			<h1 class="title">FlipClock.vue</h1>
			<h2 class="h3">Version {{ version }}</h2>
		</div>
		<flip-clock :class="$style.time" :display="timeStr" :duration="200"></flip-clock>
		<div class="flex" :class="$style.buttons">
			<paper-button type="contained" tag="a" href="https://github.com/JamesCoyle/vue-flip-clock">GitHub</paper-button>
			<paper-button type="contained" tag="a" href="https://www.buymeacoffee.com/JamesCoyle">Donate</paper-button>
		</div>
	</header>
</template>

<script>
import PaperButton from '@jamescoyle/paper-vue/component/paper-button'
import FlipClock from '../../../lib/flip-clock'

const gradientDefinitions = Object.freeze({
	0: ['#263238', '#1A237E', '#0D47A1', '#004D40', '#1B5E20'],
	4: ['#263238', '#1A237E', '#0D47A1', '#004D40', '#1B5E20'],
	6: ['#3F51B5', '#039BE5', '#FF8F00', '#827717', '#33691E'],
	8: ['#42A5F5', '#29B6F6', '#FFF176', '#43A047', '#8BC34A'],
	12: ['#42A5F5', '#29B6F6', '#B2EBF2', '#66BB6A', '#9CCC65'],
	16: ['#42A5F5', '#29B6F6', '#B2EBF2', '#66BB6A', '#9CCC65'],
	17: ['#3F51B5', '#039BE5', '#FF8F00', '#827717', '#33691E'],
	18: ['#4527A0', '#1565C0', '#B71C1C', '#827717', '#33691E'],
	20: ['#263238', '#1A237E', '#0D47A1', '#004D40', '#1B5E20'],
	24: ['#263238', '#1A237E', '#0D47A1', '#004D40', '#1B5E20'],
})
const timeslots = Object.keys(gradientDefinitions)

export default {
	components: {
		PaperButton,
		FlipClock,
	},

	props: {
		time: Date,
		version: String,
	},

	computed: {
		timeStr() {
			return this.time.toLocaleTimeString(undefined, {
				hourCycle: 'h23',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			})
		},

		msSinceMidnight() {
			const date = new Date(this.time.getTime())
			return date.getTime() - date.setHours(0, 0, 0, 0)
		},

		hoursSinceMidnight() {
			return (this.msSinceMidnight / 1000 / 60 / 60) % 24
		},

		lastSlot() {
			return timeslots.reduce((result, current) => (current < this.hoursSinceMidnight ? current : result), 0)
		},

		lastColors() {
			const colors = gradientDefinitions[this.lastSlot]
			return {
				'--last-sky-top': colors[0],
				'--last-sky-middle': colors[1],
				'--last-sky-bottom': colors[2],
				'--last-ground-top': colors[3],
				'--last-ground-bottom': colors[4],
			}
		},

		nextSlot() {
			return timeslots.find((stop) => stop >= this.hoursSinceMidnight) || 0
		},

		nextColors() {
			const colors = gradientDefinitions[this.nextSlot]
			return {
				'--next-sky-top': colors[0],
				'--next-sky-middle': colors[1],
				'--next-sky-bottom': colors[2],
				'--next-ground-top': colors[3],
				'--next-ground-bottom': colors[4],
			}
		},

		blend() {
			return {
				'--blend': (this.hoursSinceMidnight - this.lastSlot) / (this.nextSlot - this.lastSlot),
			}
		},
	},
}
</script>

<style lang="scss" module>
.header {
	position: relative;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-evenly;
	align-items: center;
	padding: 6.4rem 6.4rem 1.6rem 6.4rem;
	color: white;
	background: black;
	text-align: center;
	border-radius: 0 0 2.4rem 2.4rem;
	overflow: hidden;

	* {
		z-index: 1;
	}

	&::before,
	&::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 0;
		transition: backgroundImage 100ms;
	}

	&::before {
		background: linear-gradient(180deg, var(--last-sky-top, black) 0%, var(--last-sky-middle, black) 36%, var(--last-sky-bottom, black) 64%, var(--last-ground-top, black) 64%, var(--last-ground-bottom, black) 100%);
	}

	&::after {
		background: linear-gradient(180deg, var(--next-sky-top, black) 0%, var(--next-sky-middle, black) 36%, var(--next-sky-bottom, black) 64%, var(--next-ground-top, black) 64%, var(--next-ground-bottom, black) 100%);
		opacity: var(--blend);
	}
}

.buttons {
	margin-top: 3.2rem;

	* {
		margin: 0 0.8rem;
	}
}

.time :global {
	.chunk::after {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translate(-50%, 16px);
		font-size: 16px;
	}

	.chunk-5::after {
		content: 'Hours';
	}

	.chunk-3::after {
		content: 'Minutes';
	}

	.chunk-1::after {
		content: 'Seconds';
	}
}
</style>
