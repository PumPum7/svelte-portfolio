<footer>
	<div>
		<ul class="links">
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="https://twitter.com/Officer_Pum" target="_blank" rel="noreferrer">Twitter</a>
			</li>
			<li><a href="https://github.com/PumPum7/" target="_blank" rel="noreferrer">Github</a></li>

			<li>
				<a href="contact">Contact me</a>
			</li>
			<li>Discord</li>
			<li><a href="https://github.com/PumPum7/svelte-portfolio/">Source Code</a></li>
		</ul>
	</div>
</footer>

<style lang="scss">
	@use '../../variables' as var;

	footer {
		border-top: 1px solid;
		height: 70px;
		padding: 1rem 0;
		margin-top: 2rem;
	}

	ul.links {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 16px;
		list-style: none;
	}

	div {
		@media screen and (max-width: var.$breakpointMedium) {
			width: 100%;
		}

		width: 50%;
		margin: auto;
	}

	a {
		color: var(--primary-text-color);
		text-decoration: none;
		text-align: center;
	}
</style>
