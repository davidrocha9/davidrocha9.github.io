import { useState, useEffect } from 'react';

export const useLetterboxdFeed = (username = 'davidrocha9') => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use a CORS proxy to fetch the RSS feed
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        const feedUrl = `https://letterboxd.com/${username}/rss/`;
        const res = await fetch(corsProxy + encodeURIComponent(feedUrl));

        if (!res.ok) {
          throw new Error(`Failed to fetch feed: ${res.status}`);
        }

        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');

        const items = xml.querySelectorAll('item');
        const parsedFilms = Array.from(items).slice(0, 20).map((item) => {
          const title = item.querySelector('title')?.textContent || '';
          const link = item.querySelector('link')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent || '';
          const description = item.querySelector('description')?.textContent || '';

          // Extract image from description
          const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
          const image = imgMatch ? imgMatch[1] : null;

          // Extract rating (stars) from title
          const ratingMatch = title.match(/★+½?/);
          const rating = ratingMatch ? ratingMatch[0] : null;

          // Clean title (remove rating and year)
          const cleanTitle = title.replace(/,?\s*\d{4}\s*-?\s*★*½?\s*$/, '').trim();

          // Extract year
          const yearMatch = title.match(/(\d{4})/);
          const year = yearMatch ? yearMatch[1] : null;

          return {
            title: cleanTitle,
            year,
            rating,
            link,
            pubDate: new Date(pubDate).toLocaleDateString(),
            image,
          };
        });

        setFilms(parsedFilms);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [username]);

  const openLetterboxd = (url) => {
    const target = url || `https://letterboxd.com/${username}/`;
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  return {
    films,
    loading,
    error,
    openLetterboxd,
  };
};