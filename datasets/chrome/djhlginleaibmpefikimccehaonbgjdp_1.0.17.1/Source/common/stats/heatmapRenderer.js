// Build a 7×24 hours-by-day matrix from Twitch VODs and render it as a
// heatmap. Color scale is theme-aware: dark theme uses transparent dark
// cells fading into Twitch purple; light theme uses pale grey fading into
// Twitch purple. The cell color is computed in JS (not CSS) because the
// intensity is a continuous interpolation across 5 stops.

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const COLOR_STOPS_DARK = [
  { t: 0.00, rgba: [255, 255, 255, 0.04] },
  { t: 0.20, rgba: [145, 71, 255, 0.20] },
  { t: 0.50, rgba: [145, 71, 255, 0.45] },
  { t: 0.80, rgba: [145, 71, 255, 0.75] },
  { t: 1.00, rgba: [191, 148, 255, 0.95] },
];

const COLOR_STOPS_LIGHT = [
  { t: 0.00, rgba: [0, 0, 0, 0.06] },
  { t: 0.20, rgba: [145, 71, 255, 0.20] },
  { t: 0.50, rgba: [145, 71, 255, 0.50] },
  { t: 0.80, rgba: [145, 71, 255, 0.80] },
  { t: 1.00, rgba: [119, 44, 232, 1.00] },
];

export function buildMatrix(videos) {
  const matrix = Array.from({ length: 7 }, () => Array(24).fill(0));
  for (const video of videos) {
    const startDate = new Date(video.createdAt);
    const durationMinutes = Math.ceil((video.lengthSeconds || 0) / 60);
    for (let minute = 0; minute < durationMinutes; minute += 60) {
      const slotTime = new Date(startDate.getTime() + minute * 60 * 1000);
      const day = (slotTime.getDay() + 6) % 7;
      const hour = slotTime.getHours();
      const remainingMinutes = durationMinutes - minute;
      matrix[day][hour] += Math.min(remainingMinutes, 60) / 60;
    }
  }
  return matrix;
}

function normalizeMatrix(matrix) {
  let max = 0;
  for (const row of matrix) {
    for (const val of row) {
      if (val > max) max = val;
    }
  }
  if (max === 0) return matrix.map((row) => row.map(() => 0));
  return matrix.map((row) => row.map((val) => val / max));
}

function rgbaString([r, g, b, a]) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function cellColor(value, stops) {
  if (value <= 0) return rgbaString(stops[0].rgba);
  for (let i = 1; i < stops.length; i++) {
    if (value <= stops[i].t) {
      const prev = stops[i - 1];
      const next = stops[i];
      const span = next.t - prev.t;
      const k = span === 0 ? 0 : (value - prev.t) / span;
      return rgbaString([
        Math.round(prev.rgba[0] + (next.rgba[0] - prev.rgba[0]) * k),
        Math.round(prev.rgba[1] + (next.rgba[1] - prev.rgba[1]) * k),
        Math.round(prev.rgba[2] + (next.rgba[2] - prev.rgba[2]) * k),
        +(prev.rgba[3] + (next.rgba[3] - prev.rgba[3]) * k).toFixed(3),
      ]);
    }
  }
  return rgbaString(stops[stops.length - 1].rgba);
}

function tooltipText(day, hour, rawHours) {
  const dayName = DAYS[day];
  const hourStr = `${String(hour).padStart(2, '0')}:00`;
  if (rawHours === 0) return `${dayName}, ${hourStr} — оффлайн`;
  if (rawHours < 1) return `${dayName}, ${hourStr} — редко онлайн`;
  return `${dayName}, ${hourStr} — ${Math.round(rawHours)} ч за период`;
}

function formatHours(h) {
  if (!h || h < 0.1) return '—';
  const hours = Math.floor(h);
  const mins = Math.round((h - hours) * 60);
  if (hours === 0) return `${mins} мин`;
  if (mins === 0) return `${hours} ч`;
  return `${hours} ч ${mins} мин`;
}

function legendLabel(text) {
  const el = document.createElement('span');
  el.className = 'ggsel-stats-heatmap-legend-label';
  el.textContent = text;
  return el;
}

function statItem(label, value) {
  const item = document.createElement('div');
  item.className = 'ggsel-stats-stat';
  const v = document.createElement('div');
  v.className = 'ggsel-stats-stat-value';
  v.textContent = value;
  const l = document.createElement('div');
  l.className = 'ggsel-stats-stat-label';
  l.textContent = label;
  item.appendChild(v);
  item.appendChild(l);
  return item;
}

export function render(matrix, summary, { theme = 'dark' } = {}) {
  const stops = theme === 'light' ? COLOR_STOPS_LIGHT : COLOR_STOPS_DARK;
  const normalized = normalizeMatrix(matrix);

  const container = document.createElement('div');
  container.className = 'ggsel-stats-heatmap';

  const grid = document.createElement('div');
  grid.className = 'ggsel-stats-heatmap-grid';

  const hourLabels = document.createElement('div');
  hourLabels.className = 'ggsel-stats-heatmap-hour-labels';
  const corner = document.createElement('span');
  corner.className = 'ggsel-stats-heatmap-corner';
  hourLabels.appendChild(corner);
  for (let h = 0; h < 24; h++) {
    const label = document.createElement('span');
    label.className = 'ggsel-stats-heatmap-hour-label';
    label.textContent = h % 3 === 0 ? String(h).padStart(2, '0') : '';
    hourLabels.appendChild(label);
  }
  grid.appendChild(hourLabels);

  for (let d = 0; d < 7; d++) {
    const row = document.createElement('div');
    row.className = 'ggsel-stats-heatmap-row';

    const dayLabel = document.createElement('span');
    dayLabel.className = 'ggsel-stats-heatmap-day-label';
    dayLabel.textContent = DAYS[d];
    row.appendChild(dayLabel);

    for (let h = 0; h < 24; h++) {
      const cell = document.createElement('div');
      cell.className = 'ggsel-stats-heatmap-cell';
      cell.style.backgroundColor = cellColor(normalized[d][h], stops);
      cell.title = tooltipText(d, h, matrix[d][h]);
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  container.appendChild(grid);

  const legend = document.createElement('div');
  legend.className = 'ggsel-stats-heatmap-legend';
  legend.appendChild(legendLabel('редко'));
  const scale = document.createElement('div');
  scale.className = 'ggsel-stats-heatmap-legend-scale';
  for (let i = 0; i <= 6; i++) {
    const swatch = document.createElement('span');
    swatch.className = 'ggsel-stats-heatmap-legend-swatch';
    swatch.style.backgroundColor = cellColor(i / 6, stops);
    scale.appendChild(swatch);
  }
  legend.appendChild(scale);
  legend.appendChild(legendLabel('часто'));
  container.appendChild(legend);

  if (summary && summary.streamCount > 0) {
    const stats = document.createElement('div');
    stats.className = 'ggsel-stats-heatmap-stats';
    stats.appendChild(statItem('Стримов', String(summary.streamCount)));
    stats.appendChild(statItem('Средняя длина', formatHours(summary.avgHours)));
    stats.appendChild(statItem('Всего часов', Math.round(summary.totalHours).toString()));
    stats.appendChild(statItem('За период', `${summary.rangeDays} дн.`));
    container.appendChild(stats);
  }

  return container;
}
