const { generateWAMessageFromContent } = require('../../lib/index.js');
const crypto = require('crypto');

/**
 * Creates an interactive Fruit Bonanza Slots Game payload
 * rendered via the WhatsApp GenAI Unified Response HTML primitive.
 *
 * @returns {object} WhatsApp message payload
 */
function createSlotsPage() {
    const htmlPayload = `<html><head><style>
*{box-sizing:border-box}html,body{margin:0;width:100%;overflow:hidden;background:transparent;font-family:Arial,sans-serif;overscroll-behavior:none}body{padding:9px;background:radial-gradient(circle at 50% 12%,#5b2d18,#160908 55%,#030202)}.machine{position:relative;overflow:hidden;padding:13px 34px 18px 13px;border:4px solid #2b0c05;border-radius:30px;background:linear-gradient(105deg,#1e0704,#8c3515 8%,#3b1008 20%,#611e0c 52%,#2b0906 82%,#9c401b 94%,#2a0b06);box-shadow:inset 0 0 0 3px #e6a139,inset 0 0 0 7px #5d210b,inset 0 20px 35px #ffb52a22,0 8px 0 #210705,0 14px 24px #000c;touch-action:none}.machine:before{content:"";position:absolute;inset:8px;border:2px solid #ffba3d;border-radius:22px;pointer-events:none;box-shadow:inset 0 0 11px #ff7b00}.lights{height:9px;margin:0 14px 8px;border:2px solid #6f2608;border-radius:8px;background:repeating-radial-gradient(circle at 6px 50%,#fffbd3 0 2px,#ffbd00 3px 5px,#641800 6px 12px);box-shadow:0 0 12px #ff8a00;animation:lights .55s steps(2) infinite}.title{padding:11px 4px 8px;border:3px solid #ffc54c;border-radius:50% 50% 11px 11px/30% 30% 10px 10px;color:#fff2a1;background:radial-gradient(ellipse at 50% 0,#12b2bc,#075165 58%,#06182a);box-shadow:inset 0 0 0 4px #74300d,inset 0 -11px 18px #001726,0 4px 0 #3b1207;text-align:center;font:25px Impact,Arial Black,sans-serif;letter-spacing:1px;text-shadow:0 3px #8f1c0c,2px 0 #8f1c0c,-2px 0 #8f1c0c}.jackpot{width:75%;margin:5px auto 8px;padding:4px;border:2px solid #ffcf5b;border-radius:10px;color:#ffe7a1;background:linear-gradient(#741523,#29060e);box-shadow:inset 0 2px 5px #ff667744;text-align:center;font:bold 10px monospace;letter-spacing:1px}.stats{display:flex;margin:0 2px 9px;padding:5px;border:2px solid #b66b20;border-radius:9px;background:linear-gradient(#210c08,#070303);box-shadow:inset 0 0 9px #000,0 3px 0 #4a1909}.stat{flex:1;border-right:1px solid #754016;color:#d6a15b;text-align:center;font:bold 10px monospace}.stat:last-child{border:0}.stat b{display:block;margin-top:2px;color:#fff0bb;font-size:15px;text-shadow:0 0 6px #f80}.frame{position:relative;padding:9px;border:5px solid #9b4e12;border-radius:18px;background:linear-gradient(90deg,#4b1c08,#ffd873 5%,#6a2709 10%,#6a2709 90%,#ffd873 95%,#421506);box-shadow:inset 0 0 0 3px #2b0d05,0 4px 0 #301005,0 8px 15px #000b}.reelbox{position:relative;display:grid;grid-template-columns:repeat(5,1fr);height:192px;overflow:hidden;border:3px solid #1d0804;border-radius:11px;background:#140604;box-shadow:inset 0 13px 20px #000,inset 0 -13px 20px #000}.reel{position:relative;overflow:hidden;border-right:2px solid #6e421e;background:linear-gradient(90deg,#a58149,#fffce4 17%,#fffdf0 50%,#f7e9bd 82%,#8e6a38);box-shadow:inset 7px 0 8px #573b1d66,inset -7px 0 8px #573b1d66}.reel:last-child{border:0}.reel:after{content:"";position:absolute;z-index:2;inset:0;pointer-events:none;background:linear-gradient(#3b1d0fbb 0,transparent 18%,transparent 80%,#281208cc 100%);box-shadow:inset 0 9px 11px #0005,inset 0 -9px 11px #0005}.strip{position:absolute;left:0;right:0;top:0;transform:translate3d(0,0,0);will-change:transform,filter}.strip.moving{filter:blur(1.4px) saturate(1.2)}.sym{height:64px;display:grid;place-items:center;border-bottom:1px solid #9f7e4f66;color:#d30f1c;font-family:Apple Color Emoji,Segoe UI Emoji,Arial Black,sans-serif;font-size:clamp(26px,8vw,40px);line-height:1;text-shadow:0 3px 0 #721018,0 0 4px #fff;transform:translateZ(0)}.sym.s4{font:900 42px Impact,Arial Black,sans-serif;color:#ef1726;-webkit-text-stroke:2px #850815;text-shadow:0 3px #5d0509,0 0 5px #fff}.sym.s5{font:900 16px Arial Black,sans-serif;color:#fff4c4;background:radial-gradient(ellipse at center,#e22d35 0,#6f0910 52%,transparent 54%);text-shadow:0 2px #401010}.sym.win{animation:win .5s ease-in-out infinite;background:radial-gradient(circle,#fff8a9,#ffae00 55%,transparent 72%)}.shine{position:absolute;z-index:3;inset:4px 8% 55%;border-radius:50%;background:linear-gradient(#fff7,transparent);pointer-events:none}.payline{position:absolute;z-index:4;left:9px;right:9px;height:3px;opacity:0;background:#fff5a1;box-shadow:0 0 7px #fff,0 0 14px #ff3d00;pointer-events:none}.payline.on{animation:line 1s ease infinite}.p0{top:20%}.p1{top:50%}.p2{top:80%}.message{height:34px;margin:9px 2px 7px;display:grid;place-items:center;border:2px solid #a55c19;border-radius:8px;color:#ffd46a;background:#150504;box-shadow:inset 0 0 8px #000;text-align:center;font:bold 14px monospace;text-shadow:0 0 7px #f60}.console{display:grid;grid-template-columns:1fr 1.7fr;gap:8px;margin:0 3px;padding:10px 9px 13px;border:3px solid #8e4914;border-radius:9px 9px 17px 17px;background:linear-gradient(#d69a49,#63300f 37%,#2a0b06 39%,#4b1509);box-shadow:inset 0 2px #ffe0a0,0 5px #1c0704,0 9px 12px #0008;transform:perspective(300px) rotateX(4deg)}button{height:53px;border:3px solid #351006;border-radius:13px;color:#fff;font-weight:900;touch-action:none}.bet{background:linear-gradient(#42c4df,#086184 53%,#03334c);box-shadow:inset 0 4px 4px #fff8,0 4px #051e2a}.spin{background:radial-gradient(circle at 50% 32%,#8aff77,#20a72d 47%,#075b17 76%);box-shadow:inset 0 4px 5px #e3ffdc,0 4px #07350e,0 0 14px #3cff4a;font-size:18px;text-shadow:0 2px #06420d}.tray{width:49%;height:19px;margin:14px auto 0;border:4px solid #48200b;border-radius:4px 4px 10px 10px;background:#090303;box-shadow:inset 0 6px 9px #000,0 3px #c47c29}.leverTrack{position:absolute;z-index:5;right:9px;top:211px;width:20px;height:150px;border:2px solid #3d1809;border-radius:13px;background:linear-gradient(90deg,#321006,#df9a39,#52200a);box-shadow:inset 0 0 5px #000}.lever{position:absolute;left:-4px;top:8px;width:28px;height:112px;transform-origin:50% 88%;transition:transform .34s cubic-bezier(.2,.8,.2,1);touch-action:none}.lever:before{content:"";position:absolute;left:11px;top:17px;width:7px;height:86px;border:2px solid #333;border-radius:4px;background:linear-gradient(90deg,#444,#fff 48%,#666 64%,#222)}.lever:after{content:"";position:absolute;left:0;width:29px;height:29px;border:3px solid #650000;border-radius:50%;background:radial-gradient(circle at 35% 25%,#fff,#ff7777 13%,#ed1720 37%,#850007 74%);box-shadow:inset -5px -6px 7px #490000,0 4px 5px #000,0 0 9px #f22}.lever.pull{transform:rotate(36deg)}.over{position:absolute;z-index:10;inset:0;display:grid;place-items:center;text-align:center;color:#ffe5a0;background:#080100ed}.over.off{display:none}.over h2{margin:0 0 8px;color:#ff3449;text-shadow:0 0 12px #f00}.over button{padding:0 22px;background:#ffd15a;color:#271204}@keyframes lights{50%{filter:brightness(1.7)}}@keyframes win{50%{transform:scale(1.09);filter:brightness(1.4)}}@keyframes line{50%{opacity:1}}
</style><style>.reelbox{display:block;height:205px;padding:0;background:#160704}
#reelCanvas{display:block;width:100%;height:100%;border-radius:8px;touch-action:none}
</style><style>body{padding:15px 13px 29px;perspective:950px}
.machine{transform-origin:50% 88%;transform:perspective(850px) rotateX(1.2deg) translateZ(0);box-shadow:inset 0 0 0 3px #f0b64b,inset 0 0 0 8px #501708,inset 14px 0 24px #ffb3421f,inset -15px 0 25px #16030199,0 9px 0 #180503,0 17px 0 #421508,0 27px 35px #000e}
.machine:after{content:"";position:absolute;z-index:-2;left:7%;right:7%;bottom:-30px;height:30px;border-radius:50%;background:radial-gradient(ellipse,#000d 0,#0008 42%,transparent 73%);filter:blur(4px)}
.title{transform:perspective(500px) rotateX(-3deg) translateZ(8px);box-shadow:inset 0 0 0 4px #74300d,inset 0 -13px 20px #001522,0 5px 0 #351006,0 10px 16px #0009}
.frame{transform:perspective(650px) rotateX(-1.5deg) translateZ(7px);box-shadow:inset 0 0 0 3px #2b0d05,inset 0 12px 13px #fff2b21c,0 6px 0 #291006,0 13px 19px #000c}
.console{transform:perspective(420px) rotateX(8deg) translateZ(5px);transform-origin:50% 0;box-shadow:inset 0 3px #ffe4ac,0 7px #1b0704,0 15px 20px #000b}
.machine.charging{animation:crateCharge .56s cubic-bezier(.36,.07,.19,.97) both}
.machine.charging .lights{animation:warningFlash .12s steps(2) infinite}
.machine.charging .frame{animation:frameTension .56s ease both}
.machine.charging .title{animation:signTension .56s ease both}
@keyframes crateCharge{0%{transform:perspective(850px) rotateX(1.2deg) rotateZ(0) translate(0,0) scale(1)}12%{transform:perspective(850px) rotateX(2deg) rotateZ(-.8deg) translate(-2px,1px) scale(.995)}25%{transform:perspective(850px) rotateX(.2deg) rotateZ(1deg) translate(3px,-1px) scale(1.008)}39%{transform:perspective(850px) rotateX(2.2deg) rotateZ(-1.15deg) translate(-3px,1px) scale(.998)}52%{transform:perspective(850px) rotateX(.3deg) rotateZ(.9deg) translate(3px,-2px) scale(1.012)}66%{transform:perspective(850px) rotateX(2deg) rotateZ(-.55deg) translate(-2px,1px) scale(1.004)}79%{transform:perspective(850px) rotateX(.7deg) rotateZ(.35deg) translate(1px,-1px) scale(1.01)}100%{transform:perspective(850px) rotateX(1.2deg) rotateZ(0) translate(0,0) scale(1)}}
@keyframes warningFlash{50%{filter:brightness(2.2) saturate(1.8);box-shadow:0 0 21px #ffca28}}
@keyframes frameTension{45%{transform:perspective(650px) rotateX(-2.5deg) translateZ(13px) scale(1.012)}100%{transform:perspective(650px) rotateX(-1.5deg) translateZ(7px)}}
@keyframes signTension{45%{transform:perspective(500px) rotateX(-5deg) translateZ(15px)}100%{transform:perspective(500px) rotateX(-3deg) translateZ(8px)}}
</style><style>.machine.charging{animation:leverDip .28s cubic-bezier(.25,.8,.25,1) both}
.machine.charging .frame,.machine.charging .title{animation:none}
.machine.reelKick{animation:reelKick .13s cubic-bezier(.2,.8,.3,1)}
@keyframes leverDip{0%{transform:perspective(850px) rotateX(1.2deg) translateY(0) scale(1)}42%{transform:perspective(850px) rotateX(2.4deg) translateY(3px) scale(.994)}72%{transform:perspective(850px) rotateX(.5deg) translateY(-2px) scale(1.004)}100%{transform:perspective(850px) rotateX(1.2deg) translateY(0) scale(1)}}
@keyframes reelKick{0%{transform:perspective(850px) rotateX(1.2deg) translateX(0)}35%{transform:perspective(850px) rotateX(1.7deg) translateX(-1.5px) translateY(1px)}70%{transform:perspective(850px) rotateX(.8deg) translateX(1px) translateY(-1px)}100%{transform:perspective(850px) rotateX(1.2deg) translateX(0)}}
</style><style>.machine.charging,.machine.reelKick{animation:none!important}
.machine.charging .frame,.machine.charging .title,.machine.charging .lights{animation:none!important}
.leverTrack{right:9px;top:211px;width:24px;height:158px;overflow:hidden;border-radius:12px}
.lever{left:0;top:7px;width:24px;height:100px;transform:none;transform-origin:50% 50%;transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.lever:before{left:8px;top:18px;width:7px;height:77px}
.lever:after{left:0;top:0;width:24px;height:24px;border-width:2px}
.lever.pull{transform:translateY(47px)}
</style><style>
/* Fixed-pivot lever: the mount stays still; only the arm swings. */
.machine{
    padding-right:70px!important;
}

.leverTrack{
    position:absolute!important;
    right:8px!important;
    top:205px!important;
    width:56px!important;
    height:150px!important;
    overflow:hidden!important;
    border-radius:16px!important;
    transform:none!important;
}

.leverTrack:after{
    content:"";
    position:absolute;
    left:2px;
    bottom:1px;
    width:27px;
    height:27px;
    z-index:3;
    border:2px solid #5b2509;
    border-radius:50%;
    box-sizing:border-box;
    background:radial-gradient(circle at 35% 30%,#fff6c8 0 8%,#f7bd3d 9% 25%,#9b3d08 52%,#3a1205 76%);
    box-shadow:inset 0 0 0 3px #ffda67,0 2px 5px #000b;
}

.lever{
    position:absolute!important;
    left:2px!important;
    top:auto!important;
    bottom:9px!important;
    width:27px!important;
    height:105px!important;
    transform:rotate(0deg)!important;
    transform-origin:13.5px 95px!important;
    transition:transform .34s cubic-bezier(.2,.88,.25,1.08)!important;
    z-index:2!important;
}

.lever:before{
    left:10px!important;
    top:18px!important;
    width:7px!important;
    height:80px!important;
    border-radius:5px!important;
    background:linear-gradient(90deg,#321003 0,#f3c56f 20%,#fff5cf 43%,#9b4c18 72%,#260b02 100%)!important;
    box-shadow:0 2px 4px #000b!important;
}

.lever:after{
    left:1px!important;
    top:0!important;
    width:24px!important;
    height:24px!important;
    border-width:2px!important;
}

.lever.pull{
    transform:rotate(17deg)!important;
}

</style><style>
/* Front-facing pull: fixed lower pivot with perspective foreshortening. */
.lever{
    transform:none!important;
    transform-origin:50% 100%!important;
    transition:none!important;
}

.lever:before{
    transform:scaleY(1)!important;
    transform-origin:50% 100%!important;
    transition:transform .34s cubic-bezier(.2,.85,.25,1)!important;
}

.lever:after{
    transform:translateY(0) scale(1)!important;
    transform-origin:50% 50%!important;
    transition:transform .34s cubic-bezier(.2,.85,.25,1.08)!important;
}

.lever.pull{
    transform:none!important;
}

.lever.pull:before{
    transform:scaleY(.56)!important;
}

.lever.pull:after{
    transform:translateY(36px) scale(1.16)!important;
}

</style><style>
/* Rigid front-pulling lever assembly. */
.machine{padding-right:62px!important}
.leverTrack{right:8px!important;top:205px!important;width:47px!important;height:150px!important;overflow:hidden!important}
.leverTrack:after{left:9px!important;bottom:5px!important;width:27px!important;height:27px!important;z-index:4!important}
.lever{left:0!important;right:0!important;bottom:12px!important;top:auto!important;width:100%!important;height:112px!important;transform:none!important}
.lever:before,.lever:after{display:none!important}
.leverArm{position:absolute;left:20px;bottom:7px;width:7px;height:91px;border:2px solid #292929;border-radius:5px;box-sizing:border-box;background:linear-gradient(90deg,#3c3c3c,#fff 43%,#8a8a8a 68%,#252525);box-shadow:0 2px 4px #000b;transform:scaleY(1);transform-origin:50% 100%;transition:transform .34s cubic-bezier(.2,.82,.25,1)}
.leverKnob{position:absolute;left:-10px;top:-13px;width:27px;height:27px;border:3px solid #650000;border-radius:50%;box-sizing:border-box;background:radial-gradient(circle at 35% 25%,#fff,#ff7777 13%,#ed1720 37%,#850007 74%);box-shadow:inset -5px -6px 7px #490000,0 4px 5px #000,0 0 9px #f22;transform:scaleY(1) scale(1);transition:transform .34s cubic-bezier(.2,.82,.25,1)}
.lever.pull .leverArm{transform:scaleY(.52)}
.lever.pull .leverKnob{transform:scaleY(1.9231) scale(1.12)}

</style><style>
.leverTrack{display:none!important}
html,body{min-height:0!important}
body{padding:4px!important}
.machine{padding:8px 10px 10px!important;border-width:3px!important;border-radius:22px!important;box-shadow:inset 0 0 0 2px #e6a139,inset 0 0 0 5px #5d210b,inset 0 14px 25px #ffb52a22,0 5px 0 #210705,0 9px 16px #000c!important}
.machine:before{inset:6px!important;border-radius:17px!important}
.lights{height:7px!important;margin:0 12px 5px!important}
.title{padding:7px 4px 5px!important;font-size:21px!important}
.jackpot{margin:3px auto 5px!important;padding:3px!important}
.stats{margin:0 2px 6px!important;padding:4px!important}
.stat b{font-size:13px!important;margin-top:1px!important}
.frame{padding:6px!important;border-width:4px!important;border-radius:14px!important}
.reelbox{height:150px!important;border-radius:9px!important}
.message{height:29px!important;margin:6px 2px 5px!important;font-size:12px!important}
.console{gap:7px!important;margin:0 3px!important;padding:7px 8px 9px!important}
button{height:44px!important}
.spin{font-size:16px!important}
.tray{height:14px!important;margin-top:9px!important;border-width:3px!important}

</style><style>
body{background:radial-gradient(circle at 50% 8%,#1d6a50,#0f4938 48%,#07291f)!important}
.machine{border-color:#071f18!important;background:linear-gradient(110deg,#061e17,#1b644b 10%,#0b382a 24%,#15543f 54%,#092f24 82%,#28775a 94%,#071f18)!important;box-shadow:inset 0 0 0 2px #b9954d,inset 0 0 0 5px #163f31,inset 0 14px 24px #73d2a31c,0 5px 0 #041a13,0 9px 16px #000b!important}
.machine:before{border-color:#b59349!important;box-shadow:inset 0 0 9px #4fa57a66!important}
.lights{border-color:#123d2f!important;background:repeating-radial-gradient(circle at 6px 50%,#dfffdc 0 2px,#82c878 3px 5px,#164936 6px 12px)!important;box-shadow:0 0 9px #67b881!important}
.title{border-color:#b99a54!important;color:#e9e3bc!important;background:radial-gradient(ellipse at 50% 0,#2b8a6c,#11513f 58%,#082a24)!important;box-shadow:inset 0 0 0 4px #244f3d,inset 0 -10px 17px #061e19,0 4px 0 #071d16!important;text-shadow:0 2px #193f31,2px 0 #193f31,-2px 0 #193f31!important}
.jackpot{border-color:#a98c4d!important;color:#ded7ad!important;background:linear-gradient(#245d48,#0b3025)!important;box-shadow:inset 0 2px 5px #8ed3a233!important}
.stats,.message{border-color:#537d64!important;background:linear-gradient(#102d24,#061812)!important}
.stat{border-color:#416452!important;color:#91b59f!important}.stat b,.message{color:#e3dfbb!important;text-shadow:0 0 6px #62a77d!important}
.frame{border-color:#315c47!important;background:linear-gradient(90deg,#09271e,#b49a59 5%,#174936 10%,#174936 90%,#b49a59 95%,#09271e)!important;box-shadow:inset 0 0 0 3px #071b15,0 4px 0 #09271e,0 8px 15px #000a!important}
.reelbox{border-color:#071c15!important;background:#071a14!important;box-shadow:inset 0 9px 15px #0009,inset 0 -9px 15px #0009!important}
.shine{display:none!important}
.console{border-color:#416a53!important;background:linear-gradient(#9c8c59,#315d48 37%,#0a2e22 39%,#123e2f)!important;box-shadow:inset 0 2px #d9c992,0 5px #061d16,0 9px 12px #0008!important}
.bet{background:linear-gradient(#4f9a77,#216348 53%,#103d2d)!important;box-shadow:inset 0 4px 4px #d8ffe055,0 4px #092a20!important}
.spin{background:radial-gradient(circle at 50% 32%,#a8d96f,#4b8d46 47%,#1e542f 76%)!important;box-shadow:inset 0 4px 5px #e8ffd488,0 4px #12351e,0 0 12px #79b85c88!important}
.tray{border-color:#244d3a!important;background:#061a13!important;box-shadow:inset 0 6px 9px #000,0 3px #897945!important}
</style><style>
.payline{height:3px!important;background:linear-gradient(90deg,transparent,#dfff8a 18%,#fff5b0 50%,#7fe091 82%,transparent)!important;box-shadow:0 0 7px #efffa8,0 0 15px #65c984!important;transform:scaleX(.15);transform-origin:50% 50%}
.payline.on{opacity:1!important;animation:jungleLine 1.15s cubic-bezier(.2,.8,.2,1) infinite!important}
.machine.winner .message{animation:jungleDisplay .7s ease-in-out 2!important}
.machine.winner .lights{animation:jungleLights .22s steps(2) 6!important}
.machine.winner .title{animation:jungleTitle .7s ease-in-out 2!important}
@keyframes jungleLine{0%{transform:scaleX(.08);filter:brightness(1)}45%{transform:scaleX(1);filter:brightness(1.8)}75%,100%{transform:scaleX(1);opacity:0}}
@keyframes jungleDisplay{50%{color:#fff8bd;box-shadow:inset 0 0 14px #7ddc8a,0 0 13px #74ce82;filter:brightness(1.35)}}
@keyframes jungleLights{50%{filter:brightness(2.2) saturate(1.4)}}
@keyframes jungleTitle{50%{filter:brightness(1.35);text-shadow:0 0 12px #cfff91,0 2px #193f31}}
</style><style>
.machine{
    box-shadow:inset 0 0 0 2px #b9954d,inset 0 0 0 5px #163f31,inset 0 14px 24px #73d2a31c!important;
}
</style><style>
html,body{width:100%!important}
body{padding:0!important}
.machine{width:100%!important;margin:0!important}
</style></head><body><div class="machine" id="machine"><div class="lights"></div><div class="title">FRUIT BONANZA</div><div class="jackpot">JACKPOT · 10,000 CREDITS</div><div class="stats"><div class="stat">CREDITS<b id="credits">500</b></div><div class="stat">BET<b id="betValue">10</b></div><div class="stat">BEST WIN<b id="best">0</b></div></div><div class="frame"><div id="reelbox" class="reelbox"><canvas id="reelCanvas"></canvas></div><div class="shine"></div><i class="payline p0"></i><i class="payline p1"></i><i class="payline p2"></i></div><div id="message" class="message">SPIN TO PLAY</div><div class="console"><button id="bet" class="bet">BET +</button><button id="spin" class="spin">SPIN</button></div><div class="tray"></div><div class="leverTrack"><div id="lever" class="lever"><i class="leverArm"><i class="leverKnob"></i></i></div></div><div id="over" class="over off"><div><h2>GAME OVER</h2><p>Keine Credits mehr.<br>Best Win: <b id="finalBest">0</b></p><button id="restart">NEW GAME</button></div></div></div><script>(function(){
var labels=['🍒','🍋','🔔','💎','7','BAR'],weights=[30,25,18,12,8,7],pays=[2,3,5,8,12,20],credits=500,bet=10,best=0,busy=false,winCells=[],reels=[],sparks=[],winUntil=0,canvas=document.getElementById('reelCanvas'),ctx=canvas.getContext('2d'),C=document.getElementById('credits'),BV=document.getElementById('betValue'),BS=document.getElementById('best'),MSG=document.getElementById('message'),SP=document.getElementById('spin'),BT=document.getElementById('bet'),LV=document.getElementById('lever'),OV=document.getElementById('over'),FB=document.getElementById('finalBest'),MCH=document.getElementById('machine'),PL=document.querySelectorAll('.payline'),D=Math.min(devicePixelRatio||1,2),W,H,last=0,startTime=0;
function pick(){var n=Math.random()*100,s=0;for(var i=0;i<weights.length;i++){s+=weights[i];if(n<s)return i}return 0}
function buildStrip(){var a=[];for(var i=0;i<80;i++)a.push(pick());return a}
function resize(){var r=canvas.getBoundingClientRect();W=r.width;H=r.height;canvas.width=Math.round(W*D);canvas.height=Math.round(H*D);ctx.setTransform(D,0,0,D,0,0);draw()}
function ui(){C.textContent=credits;BV.textContent=bet;BS.textContent=best}
function clearWins(){winCells=[];sparks=[];winUntil=0;MCH.classList.remove('winner');for(var i=0;i<PL.length;i++)PL[i].classList.remove('on')}
for(var c=0;c<5;c++)reels.push({strip:buildStrip(),pos:Math.floor(Math.random()*60),speed:0,stop:0,stopped:true,decelStart:null,from:0,target:0});
function mod(n,m){return((n%m)+m)%m}
function symbol(col,row,index,x,y,w,h,curve){var value=reels[col].strip[mod(index,reels[col].strip.length)],won=winCells.some(function(v){return v[0]===col&&v[1]===row}),pulse=won?1+.09*Math.sin(performance.now()/85):1;if(won){var glow=ctx.createRadialGradient(x+w/2,y+h/2,2,x+w/2,y+h/2,w*.72);glow.addColorStop(0,'rgba(255,247,159,.92)');glow.addColorStop(.48,'rgba(119,205,94,.62)');glow.addColorStop(1,'rgba(44,126,75,0)');ctx.fillStyle=glow;ctx.fillRect(x,y,w,h)}ctx.save();ctx.translate(x+w/2,y+h/2);ctx.scale(pulse,curve*pulse);ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor=won?'#d9ff75':'rgba(18,55,38,.28)';ctx.shadowBlur=won?16:3;if(value===4){ctx.font='900 '+Math.floor(h*.72)+'px Impact,Arial Black';ctx.lineWidth=4;ctx.strokeStyle='#790914';ctx.strokeText('7',0,2);ctx.fillStyle='#f31c2b';ctx.fillText('7',0,2)}else if(value===5){ctx.font='900 '+Math.floor(h*.29)+'px Arial Black';ctx.fillStyle='#861019';ctx.beginPath();ctx.ellipse(0,0,w*.38,h*.25,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff0b4';ctx.fillText('BAR',0,1)}else{ctx.font=Math.floor(h*.56)+'px Apple Color Emoji,Segoe UI Emoji,sans-serif';ctx.fillText(labels[value],0,1)}ctx.restore()}
function draw(){if(!W||!H)return;ctx.clearRect(0,0,W,H);var rw=W/5,rh=H/3;for(var c=0;c<5;c++){var x=c*rw,reel=reels[c],base=Math.floor(reel.pos),frac=reel.pos-base;var bg=ctx.createLinearGradient(x,0,x+rw,0);bg.addColorStop(0,'#8f6a39');bg.addColorStop(.16,'#fff8d8');bg.addColorStop(.5,'#fffdf0');bg.addColorStop(.84,'#f0dfad');bg.addColorStop(1,'#79552c');ctx.fillStyle=bg;ctx.fillRect(x,0,rw,H);ctx.save();ctx.beginPath();ctx.rect(x,0,rw,H);ctx.clip();ctx.filter=reel.speed>5?'blur(1.3px)':'none';for(var k=-1;k<5;k++){var y=(k-frac)*rh,row=k;var center=(y+rh/2)/H,curve=.78+.22*Math.cos((center-.5)*Math.PI);symbol(c,row,base+k,x,y,rw,rh,curve);ctx.strokeStyle='rgba(92,57,20,.25)';ctx.beginPath();ctx.moveTo(x,y+rh);ctx.lineTo(x+rw,y+rh);ctx.stroke()}ctx.restore();ctx.filter='none';if(c){ctx.fillStyle='#573512';ctx.fillRect(x-1,0,2,H)}}var shade=ctx.createLinearGradient(0,0,0,H);shade.addColorStop(0,'rgba(23,7,2,.72)');shade.addColorStop(.13,'rgba(0,0,0,0)');shade.addColorStop(.48,'rgba(255,255,255,0)');shade.addColorStop(.86,'rgba(0,0,0,0)');shade.addColorStop(1,'rgba(20,5,1,.78)');ctx.fillStyle=shade;ctx.fillRect(0,0,W,H);ctx.strokeStyle='rgba(20,61,43,.45)';ctx.strokeRect(.5,.5,W-1,H-1);drawSparks()}
function drawSparks(){var now=performance.now();for(var i=0;i<sparks.length;i++){var s=sparks[i],t=(now-s.born)/1000;if(t<0)continue;var a=Math.max(0,1-t/1.25);if(!a)continue;ctx.save();ctx.globalAlpha=a;ctx.translate(s.x+s.vx*t,s.y+s.vy*t+85*t*t);ctx.rotate(t*s.spin);ctx.fillStyle=s.color;ctx.shadowColor=s.color;ctx.shadowBlur=5;ctx.fillRect(-s.size/2,-s.size/2,s.size,s.size*1.8);ctx.restore()}}
function celebrate(now){draw();if(now<winUntil)requestAnimationFrame(celebrate);else{sparks=[];MCH.classList.remove('winner');draw()}}
function startWin(){var colors=['#e7d277','#9ce277','#4ebc78','#fff4b0'];sparks=[];for(var i=0;i<34;i++)sparks.push({x:W*(.1+Math.random()*.8),y:H*(.28+Math.random()*.44),vx:(Math.random()-.5)*70,vy:-45-Math.random()*75,born:performance.now()+Math.random()*180,size:2+Math.random()*3,spin:(Math.random()-.5)*12,color:colors[i%colors.length]});winUntil=performance.now()+1450;MCH.classList.add('winner');requestAnimationFrame(celebrate)}
function frame(now){if(!busy)return;var dt=Math.min((now-last)/1000,.035);last=now;var stopped=0;for(var c=0;c<5;c++){var r=reels[c],elapsed=now-startTime;if(elapsed<180){r.speed=23*(elapsed/180);r.pos+=r.speed*dt}else if(elapsed<r.stop){r.speed=23;r.pos+=r.speed*dt}else{if(r.decelStart===null){r.decelStart=now;r.from=r.pos;r.target=Math.ceil(r.pos)+7}var p=Math.min(1,(now-r.decelStart)/720),ease=1-Math.pow(1-p,4);r.pos=r.from+(r.target-r.from)*ease;r.speed=(r.target-r.from)*4*Math.pow(1-p,3)/.72;if(p>=1){r.pos=r.target;r.speed=0;r.stopped=true}}if(r.stopped)stopped++}draw();if(stopped===5){busy=false;setTimeout(evaluate,150)}else requestAnimationFrame(frame)}
function boardValue(col,row){var r=reels[col];return r.strip[mod(Math.round(r.pos)+row,r.strip.length)]}
function evaluate(){LV.classList.remove('pull');var patterns=[[0,0,0,0,0],[1,1,1,1,1],[2,2,2,2,2],[0,1,2,1,0],[2,1,0,1,2]],total=0,wins=[];patterns.forEach(function(p,pi){var a=boardValue(0,p[0]),count=1;for(var x=1;x<5&&boardValue(x,p[x])===a;x++)count++;if(count>=3){total+=Math.floor(bet*pays[a]*(count===3?1:count===4?2:5));wins.push({p:p,n:count,line:pi})}});if(total){credits+=total;best=Math.max(best,total);wins.forEach(function(w){for(var x=0;x<w.n;x++)winCells.push([x,w.p[x]]);if(w.line<3)PL[w.line].classList.add('on')});MSG.textContent=total>=bet*20?'JACKPOT +'+total:'WIN +'+total;startWin()}else MSG.textContent='YOU LOOSER';SP.disabled=false;BT.disabled=false;ui();draw();if(credits<10)setTimeout(gameover,800);else if(bet>credits){bet=10;ui()}}
function spin(){if(busy||credits<bet)return;busy=true;clearWins();credits-=bet;ui();SP.disabled=true;BT.disabled=true;MSG.textContent='GOOD LUCK';LV.classList.add('pull');startTime=performance.now();last=startTime;for(var c=0;c<5;c++){reels[c].speed=0;reels[c].stop=1050+c*220;reels[c].stopped=false;reels[c].decelStart=null}requestAnimationFrame(frame)}
function gameover(){FB.textContent=best;OV.className='over'}
BT.onclick=function(){if(busy)return;bet=bet===10?20:bet===20?50:10;if(bet>credits)bet=10;ui()};SP.onclick=spin;LV.onclick=spin;document.getElementById('restart').onclick=function(){credits=500;bet=10;best=0;busy=false;OV.className='over off';MSG.textContent='SPIN TO PLAY';SP.disabled=false;BT.disabled=false;clearWins();ui();draw()};addEventListener('resize',resize);ui();resize();
})();
</script></body></html>`;

    return {
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: 1,
                    unifiedResponse: {
                        data: Buffer.from(JSON.stringify({
                            __typename: "GenAIUnifiedResponse",
                            response_id: crypto.randomUUID(),
                            sections: [{
                                __typename: "GenAIUnifiedResponseSection",
                                view_model: {
                                    __typename: "GenAISingleLayoutViewModel",
                                    primitive: {
                                        __typename: "FOAHtmlPrimitiveDemoDONOTUSE",
                                        trusted_sources: [],
                                        payload: htmlPayload
                                    }
                                }
                            }]
                        })).toString('base64')
                    },
                    contextInfo: {
                        isForwarded: true,
                        forwardOrigin: 4
                    }
                }
            }
        }
    };
}

module.exports = { createSlotsPage };
