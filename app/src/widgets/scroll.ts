let waitingEl: any, waitingF: () => void;

function isScrolledIntoView(el: any) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    return elemTop < window.innerHeight && elemBottom >= 0;
}

document.onscroll = () => {
    if (waitingEl && isScrolledIntoView(waitingEl)) {
        waitingEl = undefined;
        waitingF();
    }
}

let waitingScroll;
// trigger
export const addScroll = (element: any, f: () => void) => {
    waitingEl = element;
    waitingF = f;
};
