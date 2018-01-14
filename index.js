'use strict';
const epinfer = require('epinfer');
const debug   = require('debug')('nzb-cleanup');
const pad     = num => ('00' + num).slice(-Math.max(String(num).length, 2))

module.exports = (nzbname, threshold) => {
  let parsed = epinfer.parse(nzbname);
  debug(parsed);
  if (parsed._score < (threshold || 100)) {
    return nzbname;
  }
  return [
    parsed.series,
    (parsed.season != null && parsed.episode != null) ?
      ( 'S' + pad(parsed.season) + 'E' + pad(parsed.episode) ) : null,
    parsed.title,
    (parsed.release_type || '').toUpperCase(),
    parsed.screen_size,
    parsed.channel,
    parsed.format || (parsed.video_codec === 'h265' ? 'HEVC' : null),
    [
      (parsed.video_codec || 'x264').replace(/^h/, 'x'),
      parsed.release_group,
    ].filter(s => !!s).join('-'),
    parsed.extension,
  ].filter(s => !!s).map(s => s.replace(/\s+/g, '.')).join('.');
}
