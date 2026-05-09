module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const csvUrl = process.env.GOOGLE_SHEET_CSV_URL;
  if (!csvUrl) return res.status(200).json([]);

  try {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error(`Sheet fetch failed: ${response.status}`);

    const csv = await response.text();
    const beats = parseBeatsFromCSV(csv);

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).json(beats);
  } catch (err) {
    console.error('Error fetching beats:', err);
    res.status(500).json({ error: err.message });
  }
};

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

function parseBeatsFromCSV(csv) {
  const lines = csv.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];

  return lines.slice(1).map(line => {
    const v = parseCSVLine(line);
    const title = v[1] || '';
    return {
      id: v[0] || title,
      title,
      bpm: parseInt(v[2]) || 0,
      key: v[3] || '',
      tags: (v[4] || '').split(',').map(t => t.trim()).filter(Boolean),
      category: (v[5] || '').trim() === 'Loop Pack' ? 'Loop Pack' : 'Loop',
      tier: v[6] || '',
      coverUrl: v[7] || `https://picsum.photos/seed/${encodeURIComponent(title)}/400/400`,
      mp3Url: v[8] || '',
      licenses: [
        { type: 'Personal',    price: parseFloat(v[11]) || 2,  description: 'Standard WAV loop. Non-profit use.' },
        { type: 'Commercial',  price: parseFloat(v[12]) || 15, description: 'WAV + Stems. For-profit use & placements.' },
      ],
      active: (v[13] || '').trim().toUpperCase() === 'YES',
    };
  }).filter(b => b.active && b.title);
}
