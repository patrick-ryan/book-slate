import adapterStatic from '@sveltejs/adapter-static';
import adapterNode from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const adapter = process.env.ADAPTER === 'node' ? adapterNode : adapterStatic;
const adapterConfig =
	process.env.ADAPTER === 'node'
		? {
				out: 'build-node'
		  }
		: {
				fallback: 'index.html',
				pages: 'build-static',
				assets: 'build-static'
		  };


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	// preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(adapterConfig)
	},
	prerender: { entries: [] }
};

export default config;
