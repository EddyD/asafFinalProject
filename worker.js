self.addEventListener('message', function (e) {
    self.postMessage(calcPrice(e.data));
}, false);

function calcPrice(distance) {
    if (distance < 90000) {
        return (Math.round(1.2 * distance / 1000));
    } else {
        return (Math.round(0.9 * distance / 1000));

    }
}
