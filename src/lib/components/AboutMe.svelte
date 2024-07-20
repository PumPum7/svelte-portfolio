<script>
	import Card from '$lib/components/Card.svelte';
	import ArrowRight from '$lib/components/icons/ArrowRight.svelte';

	import * as m from '$lib/paraglide/messages.js';
</script>

<Card title="About me">
	<p>
		{m.aboutMeHeader()}
	</p>
	<ul>
		<li>
			<ArrowRight className="arrow-right-list" />
			{m.aboutMeWeb()}
		</li>
		<li>
			<ArrowRight className="arrow-right-list" />
			{m.aboutMeServer()}
		</li>
		<li>
			<ArrowRight className="arrow-right-list" />
			{m.aboutMeDatabase()}
		</li>
	</ul>
	<p>
		{m.aboutMePersonalHeader()}
	</p>
	<ul>
		<li>
			<ArrowRight className="arrow-right-list" />
			{m.aboutMePersonal1()}
		</li>
		<li>
			<ArrowRight className="arrow-right-list" />
			{m.aboutMePersonal2()}
		</li>
		<li>
			<ArrowRight className="arrow-right-list" />
			{m.aboutMePersonal3()}
		</li>
	</ul>
</Card>

<style lang="scss">
	@use '../../variables' as var;

	* {
		font-size: 18px;
	}

	li {
		list-style: none;
		margin-left: -40px;
		display: flex;
		align-items: center;
		padding-bottom: 16px;
	}

	:global(.arrow-right-list) {
		color: var.$nord8;
		height: 22px;
		margin-right: 10px;
	}
</style>
