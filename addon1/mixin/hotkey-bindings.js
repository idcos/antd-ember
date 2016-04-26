import Em from 'ember';
/**
 * A mixin to enhance an `Ember.View` with hotkey support.
 * 
 * To use, inherit this mixin in your view:
 *
 * ```javascript
 * MyView = Em.View.extend(HotkeysMixin, {
 *   hotkeysBindings: ['ctrl-a']
 *
 *   actions: {
 *       'ctrl-a': function() {
 *           console.log("Ctrl-a was pressed!");
 *       }
 *   }
 * });
 * ```
 *
 * @class HotkeysMixin
 * @public
 */
export default Em.Mixin.create({
    /**
     * Add `hotkeysBindings` property as a `concatenatedProperties`.
     * @property concatenatedProperties
     * @type array
     */
    concatenatedProperties: ['hotkeysBindings'],
    keyMap: {
        8: "backspace",
        9: "tab",
        13: "return",
        16: "shift",
        17: "ctrl",
        18: "alt",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        224: "meta",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12"
    },
    keyPressHandler: function(e, type) {
        var command;
        command = `${type}-`;
        if (e.ctrlKey) {
            command += "ctrl+";
        }
        if (e.altKey) {
            command += "alt+";
        }
        if (e.shiftKey) {
            command += "shift+";
        }
        if (e.metaKey) {
            command += "meta+";
        }
        if (this.keyMap[e.which]) {
            command += this.keyMap[e.which];
        } else {
            command += String.fromCharCode(e.which).toLowerCase();
        }
        if (this.get(`_actions.${command}`)) {
            // Em.debug("hotkey command: " + command);
            this.send(command);
        }
    },
    keyDown: function(e) {
        return this.keyPressHandler(e, 'keydown');
    },
    keyUp: function(e) {
        return this.keyPressHandler(e, 'keyup');
    },
    keyPress: function(e) {
        return this.keyPressHandler(e, 'keypress');
    }
});