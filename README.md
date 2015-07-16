javascript-chinesetts
=====================

Mandarin Chinese Text-to-Speech processing using native speaker voices

## COMPATIBILITY ##

+ If your browser has WebKit, you should be peachy keen.

|  **Browser** | **Works** |
|  ------- | ------- |
|  [Google Chrome](https://www.google.com/chrome/) | **Yes.** |
|  [Opera](www.opera.com/) | **Yes.** |
|  [Safari](https://www.apple.com/safari/) | **Yes.** |
|  [Firefox 28+](https://www.mozilla.org/en-US/firefox/new/) | **Nope.** |
|  [Firefox < 28](http://ftp.mozilla.org/pub/mozilla.org/firefox/releases/27.0.1/) | **Yes.** |
|  MSIE 11 | **OK.** |
|  Microsoft Edge] | **Dunno.** |

## GETTING STARTED ##

+ Using local web server? Must run from localhost (HTTP).

+ Using PHP built-in server from repo root (as docroot):
  + PHP Command Line: `> php -S localhost:8888`
  + Open in Google Chrome: `http://localhost:8888/demo.html`
    + [Firefox not supported](https://github.com/pffy/javascript-chinesetts/issues/2) right now.

## SYNOPSIS ##

```
+ ChineseTextToSpeech()
  + getHtml() : string
  + getInput() : string
  + setInput(string) : ChineseTextToSpeech
  + speak() : void
  + stop() : void
  + setPace(integer) : ChineseTextToSpeech
  + playPinyin(string) : void

```