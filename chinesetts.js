/**
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org/>
 */

/**
 * name     : chinesetts.js
 * version  : 8
 * updated  : 2015-07-16
 * license  : http://unlicense.org/ The Unlicense
 * git      : https://github.com/pffy/javascript-chinesetts
 *
 */
var ChineseTextToSpeech = function() {

  // timeout offest in milliseconds (1500 = 1.5 seconds)
  var _pace = 1500,

    // han4 yu3 pin1 yin1 (w/ tone numbers) input
    _pinyinDeck = [],

    // unique set of piny1 yin1 tones from pinyinDeck
    _toneBank = [],

    // timeouts and time offets
    _timeDeck = [],

    // audio HTML, event handlers
    _toneBankHTML = '',

    // outputHTML with toneBank HTML and more
    _outputHtml = '',

    // pin1 yin1 input
    _inputPinyin = '';


    // should this item be skipped?
    function skipThisItem(str) {

      // if item is blank
      if(str.length < 1) {
        return true;
      }

    return false;
    }

    // clears prior cadence, starts new cadence
    function startCadence() {

      var lap = 0;

      if(_timeDeck.length > 0) {

        // clear the timeouts
        clearCadence();

        // clear the deck
        _timeDeck.length = 0;

      }

      // add timeouts using time offset
      for(var x in _pinyinDeck) {

        if(skipThisItem(_pinyinDeck[x])) {
          continue;
        }

        lap += _pace;

        _timeDeck[x] = setTimeout(
          '(new ChineseTextToSpeech()).playPinyin("'
            + _pinyinDeck[x]  + '");', lap);
      }

    console.info('_timeDeck is an array of setTimeout references');
    console.log(_timeDeck);
  }

  // cross-browser getObject
  function getObject(id) {

   var object = { };

   if (document.layers) {
      object = document.layers[id];
    } else if (document.all) {
      object = document.all[id];
    } else if (document.getElementById) {
      object = document.getElementById(id);
    }

    return object;
  }

  // (attempts) to clear all timeouts
  function clearCadence() {
    for(var k in _timeDeck) {
      clearTimeout(_timeDeck[k]);
    }
  }

  // builds output HTML
  function buildHtml() {
    for(var b in _toneBank) {
      buildAudioHtml(_toneBank[b]);
    }

    finishAudioHtml();
  }

  // builds HTML audio tags and JavaScript event listeners
  function buildAudioHtml(pinyinId) {

    // HTML5 audio tone banks
    _outputHtml += '<audio class="tts" id="' + pinyinId
      + 'tone" controls="controls">';
    _outputHtml += '<source src="mp3snd/mp3/' + pinyinId
      + '.mp3" type="audio/mpeg" />';
    _outputHtml += '<source src="oggsnd/ogg/' + pinyinId
      + '.ogg" type="audio/ogg" />';
    _outputHtml += '</audio>';

    // event listeners will re-load audio after they have 'ended'
    _outputHtml += '<script type="text/javascript">';
    _outputHtml += 'document.getElementById("' + pinyinId
      + 'tone").addEventListener("ended", function() {';
    _outputHtml += '  document.getElementById("' + pinyinId + 'tone").load();';
    _outputHtml += '}, false);';
    _outputHtml += '</script>';

  }


  // adds CSS for tone bank HTML
  function finishAudioHtml() {

    // style sheet making the HTML5 audio invisible
    _outputHtml += '<style id="sheet" type="text/css">';
    _outputHtml += 'audio.tts {';
    _outputHtml += ' visibility: hidden;';
    _outputHtml += ' display: none;';
    _outputHtml += '}';
    _outputHtml += '</style>';
  }

  // builds HTML tone bank with unique tones
  function buildToneBank() {

    startover: for(var i=0; i < _pinyinDeck.length; i++) {

      for(var j = 0; j < _toneBank.length; j++) {
        if(_toneBank[j] == _pinyinDeck[i])
          continue startover;
      }

      // (push) add more pinyin to tone bank
      _toneBank.push(_pinyinDeck[i]);
    }

    console.info('_toneBank is an array of unique pinyin sounds');
    console.log(_toneBank);
  }


  // builds array of all pin1 yin1 input
  function buildPinyinDeck() {
    _pinyinDeck = _inputPinyin.split(" ");
  }

  return {

    /**
     * getHtml() Gets HTML5 Audio tone banks
     *
     * @param void
     * @return string outputHtml
     */
    getHtml : function() {
      return _outputHtml;
    },

    /**
     * getInput() Gets pinyin input
     *
     * @param void
     * @return string inputPinyin
     */
    getInput: function () {
      return _inputPinyin;
    },

    /**
     * setInput() Sets pinyin input
     *
     * Returns this object
     *
     * @param string inputString
     * @return ChineseTextToSpeech object
     */
    setInput: function (inputString) {

      _inputPinyin = inputString.trim();

      buildPinyinDeck();
      buildToneBank();
      buildHtml();

      return this;
    },

    /**
     * speak() Sets pace of playback cadence
     *
     * @param void
     * @return void
     */
    speak: function () {
      startCadence();
    },

    /**
     * stop() Attempts to stop playback cadence
     *
     * @param void
     * @return void
     */
    stop: function () {
      clearCadence();
    },

    /**
     * setPace() Sets pace of playback cadence
     *
     * Returns this object
     *
     * @param integer paceValue
     * @return ChineseTextToSpeech object
     */
    setPace: function (paceValue) {
      _pace = paceValue;
      return this;
    },

    /**
     * playPinyin() Plays a single pinyin tone bank
     *
     * Returns this object
     *
     * @param string pinyinId
     * @return ChineseTextToSpeech object
     */
    playPinyin: function (pinyinId) {
      var d = getObject(pinyinId + 'tone');
      d.play();
    }

  };
};



// one newline? two newlines? ... or was it three?