import React, { useState } from "react";

function ToggleSwitch() {

    return (
        <div className="toggle-switch">
            <input
                type="checkbox"
                className="toggle-switch__checkbox"
                name="toggleSwitch"
                id="toggleSwitch"
            />
            <label className="toggle-switch__label">Короткометражки</label>
        </div>
    );
}

export default ToggleSwitch;
