// `dangerouslySetInnerHTML={{ __html: tainted }}` compiles to exactly this
// React.createElement call. The tainted document.URL flows straight into a
// raw-HTML injection sink — DOM XSS.
const dirty = document.URL.split("#")[1] || "";
const el = React.createElement("div", { dangerouslySetInnerHTML: { __html: dirty } });
ReactDOM.render(el, document.getElementById("root"));
