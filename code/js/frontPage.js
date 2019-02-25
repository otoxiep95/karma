
// import { TimelineMax, CSSPlugin, AttrPlugin } from "gsap/all";

// //without this line, CSSPlugin and AttrPlugin may get dropped by your bundler...
// const plugins = [CSSPlugin, AttrPlugin];
// NOT WORKING

"use strict";


window.onload = startAnimFront();

function startAnimFront() {
  let t = new TimelineMax();
  console.log("start anim");
  t.fromTo(
    "#welcome_screen",
    0.5, // duration
    { opacity: 0.7, alpha: 1 },
    { opacity: 1, alpha: 0, ease: Power1.easeOut },
    0 // starting in the scope
  )
    .fromTo(
      "#welcome_screen",
      3,
      { scale: 1.2 },
      { ease: Back.easeOut, scale: 1.1 },
      0
    )
    .fromTo(
      "#logo",
      3,
      { opacity: 0.7, scale: 0.7 },
      { ease: Back.easeOut, opacity: 1, scale: 0.9 },
      0
    )

    .fromTo(
      "#top_nav, #bottom_nav",
      1,
      { opacity: 0 },
      { ease: Power1.easeinOut, opacity: 1 },
      1
    )
    .to("#logo", 0.7, { left: "-100vw", opacity: 0, ease: Power1.easeOut }, 3.5)
    .from(
      "#under_const",
      0.7,
      { left: "100vw", opacity: 0, ease: Back.easeOut.config(1) },
      3.8
    )
    .from(
      "#more",
      2,
      { left: "100vw", opacity: 0, ease: Back.easeOut.config(1) },
      4.8
    );
}

// function logoOut() {
//   let t = new TimelineMax();
//   t.to("#logo", 1.5, { left: "-100vw", ease: Power1.easeIn }, 0);
// }

// onComplete: logoOut
// .fromTo(
//     "#under_const",
//     1,
//     { opacity: 0, left: "45vw" },
//     { opacity: 1, left: "50vw", ease: Back.easeOut },
//     1
//   )
//   .fromTo(
//     "#more",
//     1,
//     { opacity: 0 },
//     { opacity: 1, ease: Power1.easeOut },
//     1.5
//   );
