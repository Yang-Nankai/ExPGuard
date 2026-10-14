// Streak flame icon - traced from the source PNG so it matches exactly. Warm-orange
// flame body with an electric-blue teardrop core (real sampled gradients). Filled,
// two-tone; used by the achievements streak hero / pill. The potrace <g> flips Y,
// so the gradients run y1=1 -> y2=0 to keep light at the visual top.
export default `
  <svg width="24px" height="24px" viewBox="47 38 206 206" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="infi-flame-o" x1="0" y1="1" x2="0" y2="0"><stop stop-color="#FEB402"></stop><stop offset="1" stop-color="#FE7C00"></stop></linearGradient>
      <linearGradient id="infi-flame-b" x1="0" y1="1" x2="0" y2="0"><stop stop-color="#00DEFE"></stop><stop offset="1" stop-color="#0F74FD"></stop></linearGradient>
    </defs>
    <g transform="translate(0,300) scale(0.1,-0.1)">
      <path d="M1371 2556 c-9 -11 -9 -25 0 -58 6 -24 11 -84 11 -133 0 -148 -54 -282 -159 -396 -77 -83 -103 -79 -113 16 -7 70 -29 71 -93 3 -156 -165 -240 -377 -239 -608 1 -429 316 -760 722 -760 513 0 853 524 679 1045 -31 91 -97 223 -124 245 -22 19 -40 6 -54 -38 -19 -57 -68 -114 -95 -110 -19 3 -22 11 -28 101 -9 126 -38 229 -95 341 -39 76 -64 108 -147 191 -91 90 -208 175 -242 175 -6 0 -17 -6 -23 -14z" fill="url(#infi-flame-o)"></path>
      <path d="M1426 1583 c-16 -35 -68 -115 -114 -176 -124 -164 -137 -195 -137 -337 0 -110 2 -118 33 -182 83 -171 266 -242 419 -164 138 69 219 240 192 405 -20 125 -109 292 -231 434 -53 60 -67 70 -108 80 -23 5 -28 0 -54 -60z" fill="url(#infi-flame-b)"></path>
    </g>
  </svg>
`;
