import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eventsFilePath = path.join(__dirname, 'events.json');

const getHistory = async (req, res) => {
  try {
    const data = await readFile(eventsFilePath, 'utf-8');
    let events = JSON.parse(data);

    //sort events by date and time (most recent at the top)
    events.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB - dateA;
    });

    res.json(events);
  } catch (err) {
    console.error('Error reading events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export { getHistory };