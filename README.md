javascript-chinesetts
=====================

Mandarin Chinese Text-to-Speech processing using native speaker voices

+ JavaScript written with a few JavaScript Style Guides:
  + http://javascript.crockford.com/code.html
  + http://contribute.jquery.org/style-guide/js/
  + http://guides.sproutcore.com/style_guide.html
  + https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Coding_Style#JavaScript_practices
  + https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
  + https://github.com/airbnb/javascript

## GETTING STARTED ##

+ Using local web server? Must run from localhost.
+ For example:
  + http://localhost/demo.html
  + http://localhost:80/demo.html

+ Using PHP build in server from repo root:
  + PHP Command Line: `php -S localhost:8888`
  + Browser: `http://localhost:8888/demo.html`

## COMPATIBILITY ##

+ Firefox 28 - **FAILED**
  + Details in [Issue #2](https://github.com/pffy/javascript-chinesetts/issues/2)

*****

+ [Chrome 34](https://www.google.com/chrome/) _(recommended)_ - **OK**
+ Firefox 27 - **OK**
+ Opera 20 - **OK**
+ MSIE 11 - **OK**

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