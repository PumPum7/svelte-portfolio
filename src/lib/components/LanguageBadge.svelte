<script lang="ts">
	export let language: { name: string };
</script>

<span class="language-badge {language.name.toLowerCase().replace(' ', '-')}"
>{language.name}</span>


<style lang="scss">
	.language-badge {
		font-size: 14px;
		font-weight: 600;
		border-radius: 18px;
		width: fit-content;
		padding: 4px 8px;
		color: #ffffff;
		background-color: #6e7681; // Default gray
		
		&.rust { background-color: #dea584; }
		&.javascript { background-color: #f1e05a; color: #000000; }
		&.kotlin { background-color: #A97BFF; }
		&.python { background-color: #3572A5; }
		&.dockerfile { background-color: #384d54; }
		&.shell { background-color: #89e051; color: #000000; }
		&.jupyter { background-color: #DA5B0B; }
		&.c { background-color: #555555; }
		&.html { background-color: #e34c26; }
		&.typescript { background-color: #3178c6; }
		&.go { background-color: #00ADD8; }
		&.css { background-color: #563d7c; }
		&.unknown { background-color: #8b949e; }
	}
</style>