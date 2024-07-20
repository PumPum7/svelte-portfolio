<script>
	import * as m from '$lib/paraglide/messages.js';

	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime.js';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/stores';
</script>

<footer>
	<div>
		<ul class="links">
			<li>
				<a href="/">{m.home()}</a>
			</li>
			<li>
				<a href="https://twitter.com/Officer_Pum" target="_blank" rel="noreferrer">Twitter</a>
			</li>
			<li><a href="https://github.com/PumPum7/" target="_blank" rel="noreferrer">Github</a></li>

			<li>
				<a href="contact">{m.contact()}</a>
			</li>
			<li>Discord</li>
			<li><a href="https://github.com/PumPum7/svelte-portfolio/">{m.sourceCode()}</a></li>
			{#each availableLanguageTags as lang}
				<li>
					<a
						href={i18n.route($page.url.pathname)}
						hreflang={lang}
						aria-current={lang === languageTag() ? 'page' : undefined}
					>
						{lang === 'en' ? 'English' : 'Deutsch'}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</footer>

<style lang="scss">
	@use '../../variables' as var;

	footer {
		border-top: 1px solid;
		padding: 1rem 0;
		margin-top: 2rem;
		margin-bottom: 2rem;
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
