'use strict';
const epinfer = require('epinfer');
const pad     = num => ('00' + num).slice(-Math.max(String(num).length, 2))

module.exports = (nzbname, threshold) => {
  let parsed = epinfer.parse(nzbname);
  if (parsed._score < (threshold || 100)) {
    return nzbname;
  }
  return [
    parsed.series,
    (parsed.season && parsed.episode) ?
      ( 'S' + pad(parsed.season) + 'E' + pad(parsed.episode) ) : null,
    parsed.title,
    parsed.screen_size,
    parsed.format || (parsed.video_codec === 'h265' ? 'HEVC' : null),
    (parsed.video_codec || 'x264').replace(/^h/, 'x') + '-' + parsed.release_group,
    parsed.extension,
  ].filter(s => !!s).map(s => s.replace(/\s+/g, '.')).join('.');
}
