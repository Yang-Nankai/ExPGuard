// This is purposefully not indented so it is well formed in the source view of the browser
function _c_w_(a = []) {
  // This is a helper function used by the Inspector to push a group to the console
  // It's in a separate script to keep the console footprint to a minimum
  a.forEach(i => {
    i.call()
  })
}
