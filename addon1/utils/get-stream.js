import Em from 'ember';

var utils = Em.__loader.require('ember-metal/streams/utils');
var Stream = Em.__loader.require('ember-metal/streams/stream')['default'];

var NullStream = new Stream(function() { return null; });

function sourceStream(objStream, keyStream) {
  var key = utils.read(keyStream);

  if (Em.isNone(key)) {
    return NullStream;
  } else {
    return objStream.get(key);
  }
}

function setupStream(view, obj, key, stream) {
  stream._objStream = obj;
  stream._keyStream = key;
  stream._objLabel = obj && obj._label;
  stream._keyLabel = key && key._label;

  stream._objStreamDidChange = function() {
    this.notify();
  };

  stream._keyStreamDidChange = function() {
    this._setSourceStream(sourceStream(obj, key));
    this.notify();
  };

  stream._setSourceStream = function(newStream) {
    if (newStream !== this.stream) {
      utils.unsubscribe(this.stream, this._onNotify, this);
      this.stream = newStream;
      utils.subscribe(this.stream, this._onNotify, this);
    }
  };

  utils.subscribe(obj, stream._objStreamDidChange, stream);
  utils.subscribe(key, stream._keyStreamDidChange, stream);

  stream._setSourceStream(sourceStream(obj, key));
  stream._isGetHelperStream = true;
}

function getStreamFromView(view, obj, key) {
  var objGuid = Em.guidFor(obj);
  var keyGuid = Em.guidFor(key);
  var accessKey = `get-helper:${objGuid}-${keyGuid}`;

  var stream = view._getBindingForStream(accessKey);
  if (!stream._isGetHelperStream) {
    setupStream(view, obj, key, stream);
  }
  return stream;
}

export default function getStream(view, obj, key) {
  if (utils.isStream(obj) && utils.isStream(key)) {
    return getStreamFromView(view, obj, key);
  } else if (utils.isStream(obj) && !utils.isStream(key)) {
    return obj.get(key);
  } else if (!utils.isStream(obj) && !utils.isStream(key)) {
    return Em.get(obj, key);
  }
}
