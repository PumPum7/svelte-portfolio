<script>
	import Card from "$lib/components/Card.svelte";
	import ArrowRight from "$lib/components/icons/ArrowRight.svelte";
</script>

<Card title="About me">
	<p>
		As a software developer hailing from Austria, I am skilled in using a variety of technologies to
		bring cutting-edge projects to life!
	</p>
	<ul>
		<li>
			<ArrowRight className="arrow-right-list" />
			Proficient in Typescript, React, Next, TailwindCSS, and Svelte for front end development
		</li>
		<li>
			<ArrowRight className="arrow-right-list" />
			Experienced in GoLang, Python, and Typescript for backend work
		</li>
		<li>
			<ArrowRight className="arrow-right-list" />
			Skilled in using MongoDB, SQL, and FaunaDB for databases
		</li>
	</ul>
	<p>
		When I'm not busy coding, you can find me indulging in a few of my favorite hobbies and
		pastimes, including:
	</p>
	<ul>
		<li>
			<ArrowRight className="arrow-right-list" />
			Cooking up delicious meals and trying out new recipes in the kitchen
		</li>
		<li>
			<ArrowRight className="arrow-right-list" />
			Hitting the slopes and skiing to my heart's content in the great outdoors
		</li>
		<li>
			<ArrowRight className="arrow-right-list" />
			Collecting NFTs and exploring the exciting world of digital art and collectibles
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
