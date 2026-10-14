const resetScroll = () => {
  const list = document.getElementsByClassName("scroll-anchor");
  for (let i = 0; i < list.length; i++) {
    let o = list[i];
    if (o) {
      o.scrollLeft = 0;
      o.scrollTop = 0;
    }
  }
};
const scrollDown = () => {
  const list = document.getElementsByClassName("scroll-anchor");
  for (let i = 0; i < list.length; i++) {
    let o = list[i];
    if (o) {
      o.scrollLeft = 0;
      o.scrollTop = 99999;
    }
  }
};
const useResetScroll = () => {
  return {
    resetScroll,
    scrollDown
  };
};

export { useResetScroll as u };
