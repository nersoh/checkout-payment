export default class App {
    static init() {
        window.parent.postMessage({ height: document.body.scrollHeight }, "http://localhost:5173");
    }
}