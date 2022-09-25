"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyframeAnimation = void 0;
class KeyframeAnimation {
    constructor(durationInSecond = 1, delayInSecond = 0, direction = "normal", iterationCount = 1, timingFunction = "ease", fillMode = "forwards", playState = "running") {
        this.durationInSecond = 1;
        this.delayInSecond = 1;
        this.direction = "normal";
        this.iterationCount = 1;
        this.timingFunction = "ease";
        this.fillMode = "forwards";
        this.playState = "running";
        this.steps = [];
        this.htmlStyle = null;
        this.clearStep = () => {
            this.steps = [];
        };
        this.durationInSecond = durationInSecond;
        this.delayInSecond = delayInSecond;
        this.direction = direction;
        this.iterationCount = iterationCount;
        this.timingFunction = timingFunction;
        this.fillMode = fillMode;
        this.playState = playState;
    }
    addStep(o = null) {
        if (!o && this.steps.length > 0)
            this.steps.push(this.steps[this.steps.length - 1]);
        this.steps.push(o);
    }
    generateCss() {
        if (this.steps.length < 2)
            return {};
        const name = "anim_" + KeyframeAnimation.index++;
        let css = "@keyframes " + name + ' {\n';
        let pct, len = this.steps.length;
        for (let i = 0; i < len; i++) {
            pct = i / (len - 1);
            css += Math.round(pct * 100) + "% " + this.formatCssObj(this.steps[i]) + "\n";
        }
        css += "}";
        console.log(css);
        this.publishCssToHtml(css);
        return {
            animation: name + " " + this.durationInSecond + "s " + this.timingFunction + " " + this.delayInSecond + "s " + this.iterationCount + " " + this.direction + " " + this.fillMode + " " + this.playState
        };
    }
    static clearAll() {
        for (let i = 0; i < this.animationStyles.length; i++) {
            try {
                document.head.removeChild(this.animationStyles[i]);
            }
            catch (e) {
            }
        }
        this.animationStyles = [];
    }
    //-------
    formatCssProperty(property) {
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        let char = "";
        for (let i = 0; i < property.length; i++) {
            char = property[i];
            if (upper.indexOf(char) === -1)
                result += char;
            else {
                result += "-" + char.toLowerCase();
            }
        }
        return result;
    }
    formatCssValue(propName, val) {
        if (KeyframeAnimation.pxUnitProperties.indexOf(propName) !== -1) {
            if (typeof val === "number") {
                return val + "px";
            }
        }
        return val;
    }
    formatCssObj(o) {
        let result = "{";
        let prop;
        for (let z in o) {
            prop = this.formatCssProperty(z);
            result += prop + ":" + this.formatCssValue(prop, o[z]) + ";";
        }
        return result + "}";
    }
    publishCssToHtml(css) {
        if (this.htmlStyle) {
            KeyframeAnimation.animationStyles.splice(KeyframeAnimation.animationStyles.indexOf(this.htmlStyle), 1);
        }
        this.htmlStyle = document.createElement("style");
        let sheet = null;
        document.head.appendChild(this.htmlStyle);
        //sheet = this.htmlStyle.sheet;
        //if (sheet) sheet.insertRule(css, sheet.cssRules.length);
        this.htmlStyle.innerHTML = css;
        KeyframeAnimation.animationStyles.push(this.htmlStyle);
    }
}
exports.KeyframeAnimation = KeyframeAnimation;
KeyframeAnimation.index = 0;
KeyframeAnimation.animationStyles = [];
KeyframeAnimation.pxUnitProperties = [
    "width",
    "height",
    "top",
    "left",
    "bottom",
    "right",
    "fontSize",
    "padding",
    "margin",
    "paddingTop",
    "paddingLeft",
    "paddingRight",
    "paddingBottom",
    "marginTop",
    "marginLeft",
    "marginRight",
    "marginBottom",
    "gap",
];
