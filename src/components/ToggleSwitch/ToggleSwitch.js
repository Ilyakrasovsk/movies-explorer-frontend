import React from "react";

function ToggleSwitch(props) {

    return (
        <div className="toggle-switch">
            <input
                type="checkbox"
                className={'toggle-switch__checkbox'}
                name="toggleSwitch"
                id="toggleSwitch"
                checked={props.isActive}
                onChange={props.handleChange}
            />
            <label className="toggle-switch__label">Короткометражки</label>
        </div>
    );
}

export default ToggleSwitch;
