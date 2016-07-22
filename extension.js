const St = imports.gi.St;
const Main = imports.ui.main;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const Gio = imports.gi.Gio;

const icon = "display-brightness-symbolic";
const brightnesses = [ 1.0, 0.7071, 0.5, 0.3536 ];

function _setBrightness(brightness) {
    try {
        Main.Util.trySpawnCommandLine("xrandr --output eDP-1 --brightness " + brightness);
    } catch (e) {
        global.log(e);
    }
}


let button, brightnessIndex;

function _onButtonPress(button) {
    brightnessIndex++;
    if (Math.abs(brightnessIndex) === brightnesses.length || Math.abs(brightnessIndex) === 1) {
        brightnessIndex = -brightnessIndex;
    }
    _setBrightness(brightnesses[Math.abs(brightnessIndex)-1]);
}


function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    child = new St.Icon({ icon_name: icon,
                          style_class: 'system-status-icon' });
    button.set_child(child);
    button.connect('button-press-event', _onButtonPress);
    brightnessIndex = 1;
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
