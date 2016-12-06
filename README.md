# NZB file name cleanup

Library and CLI tool to help clean up NZB file names.

## Installation

```
# library only
$ npm i nzb-cleanup

# cli tool
$ npm i nzb-cleanup -g
```

## Library

The library exports a single function that will take an NZB file name, and return a cleaned up version of it:

```
const cleanup = require('nzb-cleanup');
let NZBNAME   = '[Gr0uP] my tv show season 3 episode 8 awesome title HDTV H.264.nzb';

console.log( cleanup(NZBNAME) );
// → My.Tv.Show.S03E08.Awesome.Title.HDTV.x264-Gr0uP.nzb
```

The function takes an optional numerical argument to specify a score threshold, below which the original file name will be returned (to prevent mis-parsing particularly badly formatted file names). The default threshold is 100 (a typical successful parse yields a score of about 300 or higher).

## CLI

The CLI tool accepts one or more NZB file names to clean up, and optionally an option to set the threshold (see _Library_):

```
$ nzb-cleanup [-t threshold] NZBNAME [NZBNAME ...]
```

## Thanks

Thanks to @skerit for their awesome [`epinfer`](https://github.com/skerit/epinfer) module!
