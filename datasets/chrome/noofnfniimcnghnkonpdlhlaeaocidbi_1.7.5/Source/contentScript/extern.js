class  FakeMutationObserver {
    contructor(callback) {}
    disconnect() {}
    observe(target, options) {}
    takeRecords() {
        return []
    }
}
window.MutationObserver = FakeMutationObserver;
// console.log(window.MutationObserver);