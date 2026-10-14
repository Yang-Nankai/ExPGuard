// Render top-N games list with progress bars sized relative to the leader.
// Each entry links to the corresponding Twitch directory page.

const MAX_ITEMS = 10;

function formatHours(h) {
  if (h < 1) return `${Math.round(h * 60)} мин`;
  if (h < 10) return `${h.toFixed(1)} ч`;
  return `${Math.round(h)} ч`;
}

function pluralize(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return '';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'а';
  return 'ов';
}

function formatLastPlayed(iso) {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (24 * 3600 * 1000));
  if (diffDays <= 0) return 'сегодня';
  if (diffDays === 1) return 'вчера';
  if (diffDays < 7) return `${diffDays} дн. назад`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} нед. назад`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} мес. назад`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years} г. назад`;
}

function renderItem(game, topHours, rank) {
  const hours = game.totalSeconds / 3600;
  const pct = topHours > 0 ? Math.max(4, Math.round((hours / topHours) * 100)) : 0;

  const li = document.createElement('li');
  li.className = 'ggsel-stats-game-item';

  const link = document.createElement('a');
  link.className = 'ggsel-stats-game-link';
  link.href = game.slug
    ? `https://www.twitch.tv/directory/category/${game.slug}`
    : `https://www.twitch.tv/directory/game/${encodeURIComponent(game.name)}`;
  link.target = '_blank';
  link.rel = 'noopener';
  link.title = `Открыть категорию «${game.name}» на Twitch`;

  const art = document.createElement('div');
  art.className = 'ggsel-stats-game-art';
  if (game.boxArt) {
    const img = document.createElement('img');
    img.src = game.boxArt;
    img.alt = '';
    img.loading = 'lazy';
    art.appendChild(img);
  } else {
    art.textContent = '🎮';
    art.classList.add('ggsel-stats-game-art-empty');
  }
  link.appendChild(art);

  const body = document.createElement('div');
  body.className = 'ggsel-stats-game-body';

  const header = document.createElement('div');
  header.className = 'ggsel-stats-game-header';

  const name = document.createElement('span');
  name.className = 'ggsel-stats-game-name';
  name.textContent = `${rank}. ${game.name}`;
  header.appendChild(name);

  const hoursEl = document.createElement('span');
  hoursEl.className = 'ggsel-stats-game-hours';
  hoursEl.textContent = formatHours(hours);
  header.appendChild(hoursEl);
  body.appendChild(header);

  const barTrack = document.createElement('div');
  barTrack.className = 'ggsel-stats-game-bar';
  const barFill = document.createElement('div');
  barFill.className = 'ggsel-stats-game-bar-fill';
  barFill.style.width = `${pct}%`;
  barTrack.appendChild(barFill);
  body.appendChild(barTrack);

  const meta = document.createElement('div');
  meta.className = 'ggsel-stats-game-meta';
  meta.textContent = `${game.streamCount} стрим${pluralize(game.streamCount)} · ${formatLastPlayed(game.lastPlayedAt)}`;
  body.appendChild(meta);

  link.appendChild(body);
  li.appendChild(link);
  return li;
}

export function render(games) {
  const container = document.createElement('div');
  container.className = 'ggsel-stats-games';

  if (!games || games.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'ggsel-stats-empty';
    empty.textContent = 'Нет данных об играх за последние стримы.';
    container.appendChild(empty);
    return container;
  }

  const topHours = games[0].totalSeconds / 3600;
  const list = document.createElement('ol');
  list.className = 'ggsel-stats-games-list';

  const top = games.slice(0, MAX_ITEMS);
  for (let i = 0; i < top.length; i++) {
    list.appendChild(renderItem(top[i], topHours, i + 1));
  }
  container.appendChild(list);

  if (games.length > MAX_ITEMS) {
    const more = document.createElement('div');
    more.className = 'ggsel-stats-games-more';
    more.textContent = `… и ещё ${games.length - MAX_ITEMS}`;
    container.appendChild(more);
  }

  return container;
}
