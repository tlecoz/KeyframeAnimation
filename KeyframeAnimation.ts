


export class KeyframeAnimation {

    private static index: number = 0;
    private static animationStyles: HTMLStyleElement[] = [];

    public static pxUnitProperties: string[] = [
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
    ]

    public durationInSecond: number = 1;
    public delayInSecond: number = 1;
    public direction: "normal" | "reverse" | "alternate" | "alternate-reverse" = "normal";
    public iterationCount: number = 1;
    public timingFunction: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear" | "step-start" | "step-end" = "ease";
    public fillMode: "none" | "forwards" | "backwards" | "both" = "forwards";
    public playState: "paused" | "running" = "running";


    private steps: any[] = [];
    private htmlStyle: HTMLStyleElement | null = null;

    constructor(
        durationInSecond: number = 1,
        delayInSecond: number = 0,
        direction: "normal" | "reverse" | "alternate" | "alternate-reverse" = "normal",
        iterationCount: number = 1,
        timingFunction: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear" | "step-start" | "step-end" = "ease",
        fillMode: "none" | "forwards" | "backwards" | "both" = "forwards",
        playState: "paused" | "running" = "running",
    ) {


        this.durationInSecond = durationInSecond;
        this.delayInSecond = delayInSecond;
        this.direction = direction;
        this.iterationCount = iterationCount;
        this.timingFunction = timingFunction;
        this.fillMode = fillMode;
        this.playState = playState;
    }

    public addStep(o: any = null): void {
        if (!o && this.steps.length > 0) this.steps.push(this.steps[this.steps.length - 1])
        this.steps.push(o);
    }

    public generateCss(): any {
        if (this.steps.length < 2) return {};

        const name = "anim_" + KeyframeAnimation.index++;

        let css = "@keyframes " + name + ' {\n';
        let pct, len = this.steps.length;
        for (let i = 0; i < len; i++) {
            pct = i / (len - 1);

            css += Math.round(pct * 100) + "% " + this.formatCssObj(this.steps[i]) + "\n";
        }
        css += "}"
        console.log(css)
        this.publishCssToHtml(css);

        return {
            animation: name + " " + this.durationInSecond + "s " + this.timingFunction + " " + this.delayInSecond + "s " + this.iterationCount + " " + this.direction + " " + this.fillMode + " " + this.playState
        }

    }
    public static clearAll(): void {
        for (let i = 0; i < this.animationStyles.length; i++) {
            try {
                document.head.removeChild(this.animationStyles[i]);
            } catch (e) {

            }
        }
        this.animationStyles = [];
    }

    public clearStep = () => {
        this.steps = [];
    }

    //-------

    private formatCssProperty(property: string): string {
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        let char = "";
        for (let i = 0; i < property.length; i++) {
            char = property[i];
            if (upper.indexOf(char) === -1) result += char;
            else {
                result += "-" + char.toLowerCase();
            }
        }
        return result;
    }




    private formatCssValue(propName: string, val: any): any {
        if (KeyframeAnimation.pxUnitProperties.indexOf(propName) !== -1) {
            if (typeof val === "number") {
                return val + "px";
            }
        }
        return val;
    }

    private formatCssObj(o: any): string {
        let result: string = "{";
        let prop: string;
        for (let z in o) {
            prop = this.formatCssProperty(z);
            result += prop + ":" + this.formatCssValue(prop, o[z]) + ";";
        }
        return result + "}";
    }





    private publishCssToHtml(css: string) {

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