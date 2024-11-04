// set up as a SPA -
// for mobile, the application must be built as a prerendered, yet
// dynamic application, which essentially means shipping it as a SPA
// (for mobile we use the static adapter)
export const ssr = false;
export const prerender = true;
