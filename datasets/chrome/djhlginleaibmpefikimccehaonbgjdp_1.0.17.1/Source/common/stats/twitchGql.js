// Public Twitch GraphQL client for channel-stats feature.
//
// Uses the same web Client-ID that twitch.tv itself ships, so requests look
// like ordinary browser traffic and need no OAuth. Returns up to the latest
// 100 ARCHIVE VOD nodes for a given login.
//
// Two-tier cache + single-flight: prevents the MutationObserver-driven
// stampede pattern documented in the topup-spam bug and survives tab reload
// via chrome.storage.local (24 h TTL — fresh enough for stream schedule).

const GQL_URL = 'https://gql.twitch.tv/gql';
const CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';
const VIDEOS_TTL_MS = 24 * 60 * 60 * 1000;
const STORAGE_PREFIX = 'ggsel_stats_videos:';

const memCache = new Map();
const inflight = new Map();

const VIDEOS_QUERY = `
  query GetVideos($login: String!, $first: Int!) {
    user(login: $login) {
      videos(first: $first, type: ARCHIVE, sort: TIME) {
        edges {
          node {
            id
            title
            createdAt
            lengthSeconds
            game {
              name
              displayName
              slug
              boxArtURL(width: 52, height: 72)
            }
          }
        }
      }
    }
  }
`;

async function gqlRequest(query, variables) {
  const response = await fetch(GQL_URL, {
    method: 'POST',
    headers: {
      'Client-ID': CLIENT_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    throw new Error(`twitch_gql_${response.status}`);
  }
  return response.json();
}

async function readStorageCache(login) {
  if (!globalThis.chrome?.storage?.local) return null;
  try {
    const key = STORAGE_PREFIX + login;
    const result = await chrome.storage.local.get(key);
    const entry = result[key];
    if (!entry || !entry.expiresAt) return null;
    if (Date.now() > entry.expiresAt) {
      chrome.storage.local.remove(key).catch(() => {});
      return null;
    }
    return Array.isArray(entry.videos) ? entry.videos : null;
  } catch (_) {
    return null;
  }
}

async function writeStorageCache(login, videos) {
  if (!globalThis.chrome?.storage?.local) return;
  try {
    const key = STORAGE_PREFIX + login;
    await chrome.storage.local.set({
      [key]: { videos, expiresAt: Date.now() + VIDEOS_TTL_MS },
    });
  } catch (_) {
    // best effort; quota errors silently skipped
  }
}

function normalizeEdges(edges) {
  return edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.title,
    createdAt: edge.node.createdAt,
    lengthSeconds: edge.node.lengthSeconds,
    game: edge.node.game?.displayName || edge.node.game?.name || null,
    gameSlug: edge.node.game?.slug || null,
    gameBoxArt: edge.node.game?.boxArtURL || null,
  }));
}

export async function getChannelVideos(login) {
  if (!login || typeof login !== 'string') return [];
  const key = login.toLowerCase();

  const cached = memCache.get(key);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.videos;
  }

  if (inflight.has(key)) {
    return inflight.get(key);
  }

  const promise = (async () => {
    const fromStorage = await readStorageCache(key);
    if (fromStorage) {
      memCache.set(key, { videos: fromStorage, expiresAt: Date.now() + VIDEOS_TTL_MS });
      return fromStorage;
    }

    const result = await gqlRequest(VIDEOS_QUERY, { login: key, first: 100 });
    const edges = result?.data?.user?.videos?.edges || [];
    const videos = normalizeEdges(edges);

    memCache.set(key, { videos, expiresAt: Date.now() + VIDEOS_TTL_MS });
    if (videos.length > 0) {
      writeStorageCache(key, videos).catch(() => {});
    }
    return videos;
  })();

  inflight.set(key, promise);
  try {
    return await promise;
  } finally {
    inflight.delete(key);
  }
}

export function aggregateGames(videos) {
  const map = new Map();
  for (const v of videos) {
    if (!v.game) continue;
    const key = v.game;
    let entry = map.get(key);
    if (!entry) {
      entry = {
        name: v.game,
        slug: v.gameSlug,
        boxArt: v.gameBoxArt,
        totalSeconds: 0,
        lastPlayedAt: v.createdAt,
        streamCount: 0,
      };
      map.set(key, entry);
    }
    entry.totalSeconds += v.lengthSeconds || 0;
    entry.streamCount += 1;
    if (new Date(v.createdAt) > new Date(entry.lastPlayedAt)) {
      entry.lastPlayedAt = v.createdAt;
    }
  }
  return Array.from(map.values()).sort((a, b) => b.totalSeconds - a.totalSeconds);
}

export function aggregateSummary(videos) {
  if (!videos.length) {
    return { streamCount: 0, totalHours: 0, avgHours: 0, rangeDays: 0 };
  }
  const totalSec = videos.reduce((s, v) => s + (v.lengthSeconds || 0), 0);
  const dates = videos.map((v) => new Date(v.createdAt).getTime());
  const rangeDays = Math.max(
    1,
    Math.round((Math.max(...dates) - Math.min(...dates)) / (24 * 3600 * 1000)),
  );
  return {
    streamCount: videos.length,
    totalHours: totalSec / 3600,
    avgHours: totalSec / 3600 / videos.length,
    rangeDays,
  };
}

export function __resetCachesForTest() {
  memCache.clear();
  inflight.clear();
}
