// Testing aid for the full-screen loaders.
//
// Next removes loading.js the instant the page is ready, so on a local machine
// the loader flashes past in well under a second and cannot be reviewed. This
// holds the page back on purpose so the animation can be watched end to end.
//
// Enabled only by an env var, and deliberately not by a hardcoded number: the
// delay slows the page for EVERY visitor, so it must be impossible to leave on
// by accident. .env is gitignored, so this never reaches a deployment.
//
//   NEXT_PUBLIC_LOADER_DELAY=8000   # 8 seconds, for watching the loader
//   NEXT_PUBLIC_LOADER_DELAY=0      # or remove the line entirely — off
//
// Unset, zero or unparseable means no delay and no timer is created at all.

const configuredDelay = () => {
  const raw = Number(process.env.NEXT_PUBLIC_LOADER_DELAY);
  if (!Number.isFinite(raw) || raw <= 0) return 0;
  // Capped so a stray extra zero cannot wedge a page for three minutes.
  return Math.min(raw, 30000);
};

export const loaderDelay = async () => {
  const ms = configuredDelay();
  if (ms === 0) return;
  console.warn(
    `[loader] holding the page for ${ms}ms — NEXT_PUBLIC_LOADER_DELAY is set. ` +
      `Remove it from .env before deploying.`
  );
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export default loaderDelay;
