<template>
	<div :class="$style.wrapper">
		<page-header :time="currentTime" :version="version"></page-header>
		<main :class="$style.main">
			<p>
				Vue FlipClock is a simple and easy to use component which allows you to add a retro style numeric display to your project. Simply pass in a string and it will convert each digit into a flip clock digit while preserving all other characters as-is. Every time the passed string updates, the digits will automatically animate to reflect the change.
			</p>

			<section>
				<h2>Basic usage</h2>
				<p>Install from <a href="https://www.npmjs.com/package/@jamescoyle/flip-clock">NPM</a> using your prefered package manager. I recommend <a href="https://pnpm.js.org/">PNPM</a>.</p>

				<pre><code>pnpm install @jamescoyle/flip-clock</code></pre>

				<p>Import the component. </p>

				<pre><code>import FlipClock from '@jamescoyle/flip-clock'

	export default {
		components: {
			FlipClock,
		}
	}</code></pre>

				<p>
					Use the component in your template:
				</p>

				<pre><code>&lt;template&gt;
		&lt;flip-clock display="12:34:56"&gt;&lt;/flip-clock&gt;
	&lt;/template&gt;</code></pre>
			</section>

			<section>
				<h2>Customization</h2>

				<p>FlipClock is easily customized using CSS. The easiest way to learn is to open the devtools in your browser and play around with the markup.</p>

				<p> Each group of digits or non-digits in the display string is wrapped in its own span with the class <code>chunk</code>. Each chunk also has a unique class <code>chunk-x</code> where <var>x</var> is the postition of the chunk from the right hand side. As a chunk is positioned relatively by default, this allows for custom labels to be added easily with absolutely positioned pseudo elements. It is also easy to adjust styles for each chunk separately.</p>
			</section>

			<!-- <h2>Examples</h2> -->

			<!-- <h2>Theming</h2> -->
		</main>
	</div>
</template>

<script>
import PageHeader from './components/page-header'

import FlipClock from '../../lib/flip-clock'
import { version } from './version'

export default {
	components: {
		PageHeader,
		FlipClock,
	},

	data: () => ({
		currentTime: new Date(),
		fakeTime: new Date(),
		counter: 0,
		version,
	}),

	mounted() {
		setInterval(() => {
			this.currentTime = new Date()
			this.counter++
		}, 500)
	},
}
</script>

<style lang="scss">
@import '~@jamescoyle/paper-css/index';
@import '~@jamescoyle/paper-css/layout/flex';

:root {
	--primary: var(--gray-2);
	--on-primary: var(--on-gray-2);
	--container-radius: 100rem;
}
</style>

<style lang="scss" module>
.wrapper {
	margin: 0 auto;
	width: 80ch;
}

.main {
	padding: var(--gutter);
}

code {
	display: inline-block;
	padding: 0 0.4rem;
}

pre {
	margin-bottom: 1.6rem;
	padding: 0.8rem;
}

code,
pre {
	background: hsl(0, 0%, 90%);
	border-radius: 0.8rem;
}
</style>
