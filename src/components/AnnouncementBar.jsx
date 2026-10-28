import { SITE } from '../config/site.js';

export default function AnnouncementBar() {
  if (!SITE.announcement) return null;
  return (
    <div className="vel-announce" role="region" aria-label="Announcement">
      <p>{SITE.announcement}</p>
    </div>
  );
}
