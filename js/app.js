(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    !function n(s, r, o) {
        function a(i, t) {
            if (!r[i]) {
                if (!s[i]) {
                    var e = "function" == typeof require && require;
                    if (!t && e) return e(i, !0);
                    if (h) return h(i, !0);
                    throw (e = new Error("Cannot find module '" + i + "'")).code = "MODULE_NOT_FOUND", 
                    e;
                }
                e = r[i] = {
                    exports: {}
                }, s[i][0].call(e.exports, (function(t) {
                    return a(s[i][1][t] || t);
                }), e, e.exports, n, s, r, o);
            }
            return r[i].exports;
        }
        for (var h = "function" == typeof require && require, t = 0; t < o.length; t++) a(o[t]);
        return a;
    }({
        1: [ function(t, i, e) {
            "use strict";
            window.SlotMachine = t("./slot-machine");
        }, {
            "./slot-machine": 3
        } ],
        2: [ function(t, i, e) {
            "use strict";
            var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            i.exports = function(t) {
                setTimeout((function() {
                    return n(t);
                }), 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0);
            };
        }, {} ],
        3: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            var r = t("./timer"), o = t("./raf"), a = {
                active: 0,
                delay: 200,
                auto: !1,
                spins: 5,
                randomize: null,
                onComplete: null,
                inViewport: !0,
                direction: "up",
                transition: "ease-in-out"
            }, h = "slotMachineNoTransition", u = "slotMachineBlurFast", c = "slotMachineBlurMedium", l = "slotMachineBlurSlow", f = "slotMachineBlurTurtle", d = "slotMachineGradient", v = d;
            n = (n(g, [ {
                key: "changeSettings",
                value: function(i) {
                    var e = this;
                    Object.keys(i).forEach((function(t) {
                        e[t] = i[t];
                    }));
                }
            }, {
                key: "_wrapTiles",
                value: function() {
                    var i = this;
                    this.container = document.createElement("div"), this.container.classList.add("slotMachineContainer"), 
                    this.container.style.transition = "1s ease-in-out", this.element.appendChild(this.container), 
                    this._fakeFirstTile = this.tiles[this.tiles.length - 1].cloneNode(!0), this.container.appendChild(this._fakeFirstTile), 
                    this.tiles.forEach((function(t) {
                        i.container.appendChild(t);
                    })), this._fakeLastTile = this.tiles[0].cloneNode(!0), this.container.appendChild(this._fakeLastTile);
                }
            }, {
                key: "_setBounds",
                value: function() {
                    var t = this.getTileOffset(this.active), i = this.getTileOffset(this.tiles.length), e = this.getTileOffset(this.tiles.length);
                    this._bounds = {
                        up: {
                            key: "up",
                            initial: t,
                            first: 0,
                            last: e,
                            to: this._maxTop,
                            firstToLast: e,
                            lastToFirst: 0
                        },
                        down: {
                            key: "down",
                            initial: t,
                            first: i,
                            last: 0,
                            to: this._minTop,
                            firstToLast: e,
                            lastToFirst: 0
                        }
                    };
                }
            }, {
                key: "_changeTransition",
                value: function() {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.delay, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.transition;
                    this.container.style.transition = t / 1e3 + "s " + i;
                }
            }, {
                key: "_changeTransform",
                value: function(t) {
                    this.container.style.transform = "matrix(1, 0, 0, 1, 0, " + t + ")";
                }
            }, {
                key: "_isGoingBackward",
                value: function() {
                    return this.nextActive > this.active && 0 === this.active && this.nextActive === this.tiles.length - 1;
                }
            }, {
                key: "_isGoingForward",
                value: function() {
                    return this.nextActive <= this.active && this.active === this.tiles.length - 1 && 0 === this.nextActive;
                }
            }, {
                key: "getTileOffset",
                value: function(t) {
                    for (var i = 0, e = 0; e < t; e++) i += this.tiles[e].offsetHeight;
                    return this._minTop - i;
                }
            }, {
                key: "_resetPosition",
                value: function(t) {
                    this.container.classList.toggle(h), this._changeTransform(isNaN(t) ? this.bounds.initial : t), 
                    this.container.offsetHeight, this.container.classList.toggle(h);
                }
            }, {
                key: "prev",
                value: function() {
                    return this.nextActive = this.prevIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "next",
                value: function() {
                    return this.nextActive = this.nextIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "_getDelayFromSpins",
                value: function(t) {
                    var i = this.delay;
                    switch (this.transition = "linear", t) {
                      case 1:
                        i /= .5, this.transition = "ease-out", this._animationFX = f;
                        break;

                      case 2:
                        i /= .75, this._animationFX = l;
                        break;

                      case 3:
                        i /= 1, this._animationFX = c;
                        break;

                      case 4:
                        i /= 1.25, this._animationFX = c;
                        break;

                      default:
                        i /= 1.5, this._animationFX = u;
                    }
                    return i;
                }
            }, {
                key: "shuffle",
                value: function(i, e) {
                    var t, n = this;
                    return "function" == typeof i && (e = i), this.running = !0, this.visible || !0 !== this.inViewport ? (t = this._getDelayFromSpins(i), 
                    this._changeTransition(t), this._changeTransform(this.bounds.to), o((function() {
                        var t;
                        !n.stopping && n.running && (t = i - 1, n._resetPosition(n.bounds.first), 1 < t ? n.shuffle(t, e) : n.stop(e));
                    }), t)) : this.stop(e), this.nextActive;
                }
            }, {
                key: "stop",
                value: function(t) {
                    var i = this;
                    if (!this.running || this.stopping) return this.nextActive;
                    this.running = !0, this.stopping = !0, Number.isInteger(this.nextActive) || (this.nextActive = this.custom), 
                    this._isGoingBackward() ? this._resetPosition(this.bounds.firstToLast) : this._isGoingForward() && this._resetPosition(this.bounds.lastToFirst), 
                    this.active = this.nextActive;
                    var e = this._getDelayFromSpins(1);
                    return this._changeTransition(e), this._animationFX = v, this._changeTransform(this.getTileOffset(this.active)), 
                    o((function() {
                        i.stopping = !1, i.running = !1, i.nextActive = null, "function" == typeof i.onComplete && i.onComplete(i.active), 
                        "function" == typeof t && t.apply(i, [ i.active ]);
                    }), e), this.active;
                }
            }, {
                key: "run",
                value: function() {
                    var t = this;
                    this.running || (this._timer = new r((function() {
                        t.visible || !0 !== t.inViewport ? t.shuffle(t.spins, (function() {
                            t._timer.reset();
                        })) : o((function() {
                            t._timer.reset();
                        }), 500);
                    }), this.auto));
                }
            }, {
                key: "destroy",
                value: function() {
                    var i = this;
                    this._fakeFirstTile.remove(), this._fakeLastTile.remove(), this.tiles.forEach((function(t) {
                        i.element.appendChild(t);
                    })), this.container.remove();
                }
            }, {
                key: "active",
                get: function() {
                    return this._active;
                },
                set: function(t) {
                    ((t = Number(t)) < 0 || t >= this.tiles.length || isNaN(t)) && (t = 0), this._active = t;
                }
            }, {
                key: "direction",
                get: function() {
                    return this._direction;
                },
                set: function(t) {
                    this.running || (this._direction = "down" === t ? "down" : "up");
                }
            }, {
                key: "bounds",
                get: function() {
                    return this._bounds[this._direction];
                }
            }, {
                key: "transition",
                get: function() {
                    return this._transition;
                },
                set: function(t) {
                    this._transition = t || "ease-in-out";
                }
            }, {
                key: "visibleTile",
                get: function() {
                    var t = this.tiles[0].offsetHeight, i = this.container.style.transform || "";
                    i = parseInt(i.replace(/^matrix\(-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?(-?\d+)\)$/, "$1"), 10);
                    return Math.abs(Math.round(i / t)) - 1;
                }
            }, {
                key: "random",
                get: function() {
                    return Math.floor(Math.random() * this.tiles.length);
                }
            }, {
                key: "custom",
                get: function() {
                    var t;
                    return this.randomize ? (((t = this.randomize(this.active)) < 0 || t >= this.tiles.length) && (t = 0), 
                    t) : this.random;
                }
            }, {
                key: "_prevIndex",
                get: function() {
                    var t = this.active - 1;
                    return t < 0 ? this.tiles.length - 1 : t;
                }
            }, {
                key: "_nextIndex",
                get: function() {
                    var t = this.active + 1;
                    return t < this.tiles.length ? t : 0;
                }
            }, {
                key: "prevIndex",
                get: function() {
                    return "up" === this.direction ? this._nextIndex : this._prevIndex;
                }
            }, {
                key: "nextIndex",
                get: function() {
                    return "up" === this.direction ? this._prevIndex : this._nextIndex;
                }
            }, {
                key: "visible",
                get: function() {
                    var t = this.element.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, e = window.innerWidth || document.documentElement.clientWidth;
                    i = t.top <= i && 0 <= t.top + t.height, t = t.left <= e && 0 <= t.left + t.width;
                    return i && t;
                }
            }, {
                key: "_animationFX",
                set: function(i) {
                    var t = this, e = this.delay / 4;
                    o((function() {
                        [].concat(function(t) {
                            if (Array.isArray(t)) {
                                for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
                                return e;
                            }
                            return Array.from(t);
                        }(t.tiles), [ t._fakeLastTile, t._fakeFirstTile ]).forEach((function(t) {
                            t.classList.remove(u, c, l, f), i !== v && t.classList.add(i);
                        })), i === v ? t.container.classList.remove(d) : t.container.classList.add(d);
                    }), e);
                }
            } ]), g);
            function g(t, i) {
                !function(t) {
                    if (!(t instanceof g)) throw new TypeError("Cannot call a class as a function");
                }(this), this.element = t, this.tiles = [].slice.call(this.element.children), this.running = !1, 
                this.stopping = !1, this.element.style.overflow = "hidden", this._wrapTiles(), this._minTop = -this._fakeFirstTile.offsetHeight, 
                this._maxTop = -this.tiles.reduce((function(t, i) {
                    return t + i.offsetHeight;
                }), 0), this.changeSettings(Object.assign({}, a, i)), this._setBounds(), this._resetPosition(), 
                !1 !== this.auto && this.run();
            }
            i.exports = n;
        }, {
            "./raf": 2,
            "./timer": 4
        } ],
        4: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            function r(t, i) {
                return function(t) {
                    if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
                }(this), this.cb = t, this.initialDelay = i, this.delay = i, this.startTime = null, 
                this.timer = null, this.running = !1, this.resume(), this;
            }
            i.exports = (n(r, [ {
                key: "_start",
                value: function() {
                    var t = this;
                    this.timer = setTimeout((function() {
                        t.running = !1, t.cb(t);
                    }), this.delay);
                }
            }, {
                key: "cancel",
                value: function() {
                    this.running = !1, clearTimeout(this.timer);
                }
            }, {
                key: "pause",
                value: function() {
                    this.running && (this.delay -= (new Date).getTime() - this.startTime, this.cancel());
                }
            }, {
                key: "resume",
                value: function() {
                    this.running || (this.running = !0, this.startTime = (new Date).getTime(), this._start());
                }
            }, {
                key: "reset",
                value: function() {
                    this.cancel(), this.delay = this.initialDelay, this._start();
                }
            }, {
                key: "add",
                value: function(t) {
                    this.pause(), this.delay += t, this.resume();
                }
            } ]), r);
        }, {} ]
    }, {}, [ 1 ]);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    const cristall = document.querySelector(".header-wrapper__icon");
    let main_count = document.querySelector(".circle__count");
    let points = document.querySelector(".header-wrapper__points");
    if (sessionStorage.getItem("points")) {
        if (document.querySelector(".main")) points.innerHTML = sessionStorage.getItem("points");
        if (document.querySelector(".bonus")) points.innerHTML = sessionStorage.getItem("points");
        if (document.querySelector(".picture-one")) points.innerHTML = sessionStorage.getItem("points");
        if (document.querySelector(".picture-two")) points.innerHTML = sessionStorage.getItem("points");
        if (document.querySelector(".picture-three")) points.innerHTML = sessionStorage.getItem("points");
    }
    if (sessionStorage.getItem("count")) {
        if (document.querySelector(".main")) main_count.innerHTML = sessionStorage.getItem("count");
        if (document.querySelector(".picture-one")) main_count.innerHTML = sessionStorage.getItem("count");
        if (document.querySelector(".picture-two")) main_count.innerHTML = sessionStorage.getItem("count");
        if (document.querySelector(".picture-three")) main_count.innerHTML = sessionStorage.getItem("count");
    }
    if (document.querySelector(".main")) {
        if (sessionStorage.getItem("complete-1-all")) document.querySelector(".main__item_one").classList.add("_active-one");
        if (sessionStorage.getItem("complete-2-all")) document.querySelector(".main__item_two").classList.add("_active-two");
        if (sessionStorage.getItem("complete-3-all")) document.querySelector(".main__item_three").classList.add("_active-three");
    }
    let timeArray = [];
    function getUniqeNum(min, max) {
        let randomItem = Math.floor(Math.random() * (max - min) + min);
        if (timeArray.includes(randomItem)) return getUniqeNum(min, max); else if (!timeArray.includes(randomItem)) {
            timeArray.push(randomItem);
            return randomItem;
        }
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".acces-preloader__button")) {
            preloader.classList.add("_hide");
            sessionStorage.setItem("preloader", true);
            wrapper.classList.add("_visible");
        }
        if (targetElement.closest(".main__button")) {
            let a = +main_count.innerHTML;
            let b = +points.innerHTML;
            if (b > 30) {
                let a_after = a + 1;
                sessionStorage.setItem("points", b - 30);
                sessionStorage.setItem("count", a_after);
                main_count.innerHTML = a_after;
                points.innerHTML = b - 30;
                if (a_after > 0) document.querySelector(".circle__count").classList.remove("_hide");
            }
        }
        if (targetElement.closest(".circle_zoom")) {
            let a = +main_count.innerHTML;
            if (document.querySelector(".picture-one")) {
                if (a > 0) {
                    let a_after = a - 1;
                    sessionStorage.setItem("count", a_after);
                    main_count.innerHTML = a_after;
                    let randomNumber = getUniqeNum(0, 4);
                    if (0 == randomNumber) {
                        document.querySelectorAll(".picture-slot_one").forEach((el => {
                            el.classList.add("_active");
                        }));
                        document.querySelector(".picture-one__button_red").classList.add("_lock");
                    } else if (1 == randomNumber) {
                        document.querySelector(".picture-slot_two").classList.add("_active");
                        document.querySelector(".picture-one__button_yellow").classList.add("_lock");
                    } else if (2 == randomNumber) {
                        document.querySelector(".picture-slot_three").classList.add("_active");
                        document.querySelector(".picture-one__button_blue").classList.add("_lock");
                    } else if (3 == randomNumber) {
                        document.querySelectorAll(".picture-slot_four").forEach((el => {
                            el.classList.add("_active");
                        }));
                        document.querySelector(".picture-one__button_corral").classList.add("_lock");
                    }
                    if (4 == timeArray.length) {
                        document.querySelector(".circle_zoom").classList.add("_lock");
                        setTimeout((() => {
                            document.querySelector(".play").classList.add("_active");
                        }), 2e3);
                    }
                }
            } else if (document.querySelector(".picture-two")) {
                if (a > 0) {
                    let a_after = a - 1;
                    sessionStorage.setItem("count", a_after);
                    main_count.innerHTML = a_after;
                    let randomNumber = getUniqeNum(0, 3);
                    if (0 == randomNumber) {
                        document.querySelector(".picture-slot_seven").classList.add("_active");
                        document.querySelector(".picture-two__button_one").classList.add("_lock");
                    } else if (1 == randomNumber) {
                        document.querySelector(".picture-slot_watermelon").classList.add("_active");
                        document.querySelector(".picture-two__button_two").classList.add("_lock");
                    } else if (2 == randomNumber) {
                        document.querySelector(".picture-slot_cherry").classList.add("_active");
                        document.querySelector(".picture-two__button_three").classList.add("_lock");
                    }
                    if (3 == timeArray.length) {
                        document.querySelector(".circle_zoom").classList.add("_lock");
                        setTimeout((() => {
                            document.querySelector(".play").classList.add("_active");
                        }), 2e3);
                    }
                }
            } else if (document.querySelector(".picture-three")) if (a > 0) {
                let a_after = a - 1;
                sessionStorage.setItem("count", a_after);
                main_count.innerHTML = a_after;
                let randomNumber = getUniqeNum(0, 3);
                if (0 == randomNumber) {
                    document.querySelector(".picture-slot_sky").classList.add("_active");
                    document.querySelector(".picture-three__button_one").classList.add("_lock");
                } else if (1 == randomNumber) {
                    document.querySelector(".picture-slot_roulet").classList.add("_active");
                    document.querySelector(".picture-three__button_two").classList.add("_lock");
                } else if (2 == randomNumber) {
                    document.querySelector(".picture-slot_slot").classList.add("_active");
                    document.querySelector(".picture-three__button_three").classList.add("_lock");
                }
                if (3 == timeArray.length) {
                    document.querySelector(".circle_zoom").classList.add("_lock");
                    setTimeout((() => {
                        document.querySelector(".play").classList.add("_active");
                    }), 2e3);
                }
            }
        }
        if (targetElement.closest(".main__item_one")) {
            document.querySelector(".main__item_one").classList.add("_active-one");
            setTimeout((() => {
                location.href = "page_one.html";
            }), 500);
        }
        if (targetElement.closest(".main__item_two")) {
            document.querySelector(".main__item_two").classList.add("_active-two");
            setTimeout((() => {
                location.href = "page_two.html";
            }), 500);
        }
        if (targetElement.closest(".main__item_three")) {
            document.querySelector(".main__item_three").classList.add("_active-three");
            setTimeout((() => {
                location.href = "page_three.html";
            }), 500);
        }
        if (targetElement.closest(".main__item_four")) {
            document.querySelector(".main__item_four").classList.add("_active-four");
            setTimeout((() => {
                location.href = "bonus.html";
            }), 500);
        }
        if (targetElement.closest(".circle_lobby")) {
            sessionStorage.setItem("complete-1", 0);
            sessionStorage.setItem("complete-2", 0);
            sessionStorage.setItem("complete-3", 0);
        }
        if (targetElement.closest(".picture-slot_one") || targetElement.closest(".picture-one__button_red")) {
            timeArray.push(0);
            document.querySelectorAll(".picture-slot_one").forEach((el => {
                el.classList.add("_active");
            }));
            document.querySelectorAll(".picture__button").forEach((el => {
                el.classList.add("_lock-all");
            }));
            document.querySelector(".picture-one__item").classList.add("_lock");
            setTimeout((() => {
                document.querySelector(".picture-one__item").classList.remove("_lock");
                document.querySelectorAll(".picture__button").forEach((el => {
                    el.classList.remove("_lock-all");
                }));
            }), 1300);
            points.innerHTML = +points.innerHTML + 20;
            points.classList.add("_anim");
            cristall.classList.add("_anim");
            setTimeout((() => {
                points.classList.remove("_anim");
                cristall.classList.remove("_anim");
            }), 1500);
            sessionStorage.setItem("points", +points.innerHTML);
            document.querySelector(".picture-one__button_red").classList.add("_lock");
            let a = +sessionStorage.getItem("complete-1");
            if (a < 5) {
                sessionStorage.setItem("complete-1", a + 1);
                if (+sessionStorage.getItem("complete-1") >= 4) sessionStorage.setItem("complete-1-all", true);
            }
            if (4 == timeArray.length) {
                document.querySelector(".circle_zoom").classList.add("_lock");
                setTimeout((() => {
                    document.querySelector(".play").classList.add("_active");
                }), 2e3);
            }
        } else if (targetElement.closest(".picture-slot_two") || targetElement.closest(".picture-one__button_yellow")) {
            timeArray.push(1);
            document.querySelector(".picture-slot_two").classList.add("_active");
            document.querySelector(".picture-one__button_yellow").classList.add("_lock");
            document.querySelectorAll(".picture__button").forEach((el => {
                el.classList.add("_lock-all");
            }));
            document.querySelector(".picture-one__item").classList.add("_lock");
            setTimeout((() => {
                document.querySelector(".picture-one__item").classList.remove("_lock");
                document.querySelectorAll(".picture__button").forEach((el => {
                    el.classList.remove("_lock-all");
                }));
            }), 1300);
            points.innerHTML = +points.innerHTML + 20;
            points.classList.add("_anim");
            cristall.classList.add("_anim");
            setTimeout((() => {
                points.classList.remove("_anim");
                cristall.classList.remove("_anim");
            }), 1500);
            sessionStorage.setItem("points", +points.innerHTML);
            let a = +sessionStorage.getItem("complete-1");
            if (a < 5) {
                sessionStorage.setItem("complete-1", a + 1);
                if (+sessionStorage.getItem("complete-1") >= 4) sessionStorage.setItem("complete-1-all", true);
            }
            if (4 == timeArray.length) {
                document.querySelector(".circle_zoom").classList.add("_lock");
                setTimeout((() => {
                    document.querySelector(".play").classList.add("_active");
                }), 2e3);
            }
        } else if (targetElement.closest(".picture-slot_three") || targetElement.closest(".picture-slot_three-target") || targetElement.closest(".picture-one__button_blue")) {
            timeArray.push(2);
            document.querySelector(".picture-slot_three").classList.add("_active");
            document.querySelector(".picture-one__button_blue").classList.add("_lock");
            document.querySelectorAll(".picture__button").forEach((el => {
                el.classList.add("_lock-all");
            }));
            document.querySelector(".picture-one__item").classList.add("_lock");
            setTimeout((() => {
                document.querySelector(".picture-one__item").classList.remove("_lock");
                document.querySelectorAll(".picture__button").forEach((el => {
                    el.classList.remove("_lock-all");
                }));
            }), 1300);
            points.innerHTML = +points.innerHTML + 20;
            points.classList.add("_anim");
            cristall.classList.add("_anim");
            setTimeout((() => {
                points.classList.remove("_anim");
                cristall.classList.remove("_anim");
            }), 1500);
            sessionStorage.setItem("points", +points.innerHTML);
            let a = +sessionStorage.getItem("complete-1");
            if (a < 5) {
                sessionStorage.setItem("complete-1", a + 1);
                if (+sessionStorage.getItem("complete-1") >= 4) sessionStorage.setItem("complete-1-all", true);
            }
            if (4 == timeArray.length) {
                document.querySelector(".circle_zoom").classList.add("_lock");
                setTimeout((() => {
                    document.querySelector(".play").classList.add("_active");
                }), 2e3);
            }
        } else if (targetElement.closest(".picture-slot_four") || targetElement.closest(".picture-one__button_corral")) {
            timeArray.push(3);
            document.querySelectorAll(".picture-slot_four").forEach((el => {
                el.classList.add("_active");
            }));
            document.querySelector(".picture-one__button_corral").classList.add("_lock");
            document.querySelectorAll(".picture__button").forEach((el => {
                el.classList.add("_lock-all");
            }));
            document.querySelector(".picture-one__item").classList.add("_lock");
            setTimeout((() => {
                document.querySelector(".picture-one__item").classList.remove("_lock");
                document.querySelectorAll(".picture__button").forEach((el => {
                    el.classList.remove("_lock-all");
                }));
            }), 1300);
            points.innerHTML = +points.innerHTML + 20;
            points.classList.add("_anim");
            cristall.classList.add("_anim");
            setTimeout((() => {
                points.classList.remove("_anim");
                cristall.classList.remove("_anim");
            }), 1500);
            sessionStorage.setItem("points", +points.innerHTML);
            let a = +sessionStorage.getItem("complete-1");
            if (a < 5) {
                sessionStorage.setItem("complete-1", a + 1);
                if (+sessionStorage.getItem("complete-1") >= 4) sessionStorage.setItem("complete-1-all", true);
            }
            if (4 == timeArray.length) {
                document.querySelector(".circle_zoom").classList.add("_lock");
                setTimeout((() => {
                    document.querySelector(".play").classList.add("_active");
                }), 2e3);
            }
        }
        if (targetElement.closest(".picture-slot_seven") || targetElement.closest(".picture-two__button_one")) {
            timeArray.push(0);
            document.querySelector(".picture-slot_seven").classList.add("_active");
            document.querySelector(".picture-two__button_one").classList.add("_lock");
            document.querySelectorAll(".picture__button").forEach((el => {
                el.classList.add("_lock-all");
            }));
            document.querySelector(".picture-two__item").classList.add("_lock");
            setTimeout((() => {
                document.querySelector(".picture-two__item").classList.remove("_lock");
                document.querySelectorAll(".picture__button").forEach((el => {
                    el.classList.remove("_lock-all");
                }));
            }), 1300);
            points.innerHTML = +points.innerHTML + 20;
            points.classList.add("_anim");
            cristall.classList.add("_anim");
            setTimeout((() => {
                points.classList.remove("_anim");
                cristall.classList.remove("_anim");
            }), 1500);
            sessionStorage.setItem("points", +points.innerHTML);
            let a = +sessionStorage.getItem("complete-2");
            if (a < 4) {
                sessionStorage.setItem("complete-2", a + 1);
                if (+sessionStorage.getItem("complete-2") >= 3) sessionStorage.setItem("complete-2-all", true);
            }
            if (3 == timeArray.length) {
                document.querySelector(".circle_zoom").classList.add("_lock");
                setTimeout((() => {
                    document.querySelector(".play").classList.add("_active");
                }), 2e3);
            }
        } else if (targetElement.closest(".picture-slot_watermelon") || targetElement.closest(".picture-two__button_two")) {
            timeArray.push(1);
            document.querySelector(".picture-slot_watermelon").classList.add("_active");
            document.querySelector(".picture-two__button_two").classList.add("_lock");
            document.querySelectorAll(".picture__button").forEach((el => {
                el.classList.add("_lock-all");
            }));
            document.querySelector(".picture-two__item").classList.add("_lock");
            setTimeout((() => {
                document.querySelector(".picture-two__item").classList.remove("_lock");
                document.querySelectorAll(".picture__button").forEach((el => {
                    el.classList.remove("_lock-all");
                }));
            }), 1300);
            points.innerHTML = +points.innerHTML + 20;
            points.classList.add("_anim");
            cristall.classList.add("_anim");
            setTimeout((() => {
                points.classList.remove("_anim");
                cristall.classList.remove("_anim");
            }), 1500);
            sessionStorage.setItem("points", +points.innerHTML);
            let a = +sessionStorage.getItem("complete-2");
            if (a < 4) {
                sessionStorage.setItem("complete-2", a + 1);
                if (+sessionStorage.getItem("complete-2") >= 3) sessionStorage.setItem("complete-2-all", true);
            }
            if (3 == timeArray.length) {
                document.querySelector(".circle_zoom").classList.add("_lock");
                setTimeout((() => {
                    document.querySelector(".play").classList.add("_active");
                }), 2e3);
            }
        } else if (targetElement.closest(".picture-slot_cherry") || targetElement.closest(".picture-two__button_three")) {
            timeArray.push(2);
            document.querySelector(".picture-slot_cherry").classList.add("_active");
            document.querySelector(".picture-two__button_three").classList.add("_lock");
            document.querySelectorAll(".picture__button").forEach((el => {
                el.classList.add("_lock-all");
            }));
            document.querySelector(".picture-two__item").classList.add("_lock");
            setTimeout((() => {
                document.querySelector(".picture-two__item").classList.remove("_lock");
                document.querySelectorAll(".picture__button").forEach((el => {
                    el.classList.remove("_lock-all");
                }));
            }), 1300);
            points.innerHTML = +points.innerHTML + 20;
            points.classList.add("_anim");
            cristall.classList.add("_anim");
            setTimeout((() => {
                points.classList.remove("_anim");
                cristall.classList.remove("_anim");
            }), 1500);
            sessionStorage.setItem("points", +points.innerHTML);
            let a = +sessionStorage.getItem("complete-2");
            if (a < 4) {
                sessionStorage.setItem("complete-2", a + 1);
                if (+sessionStorage.getItem("complete-2") >= 3) sessionStorage.setItem("complete-2-all", true);
            }
            if (3 == timeArray.length) {
                document.querySelector(".circle_zoom").classList.add("_lock");
                setTimeout((() => {
                    document.querySelector(".play").classList.add("_active");
                }), 2e3);
            }
        }
        if (targetElement.closest(".picture-slot_sky") || targetElement.closest(".picture-three__button_one")) {
            timeArray.push(0);
            document.querySelector(".picture-slot_sky").classList.add("_active");
            document.querySelector(".picture-three__button_one").classList.add("_lock");
            document.querySelectorAll(".picture__button").forEach((el => {
                el.classList.add("_lock-all");
            }));
            document.querySelector(".picture-three__item").classList.add("_lock");
            setTimeout((() => {
                document.querySelector(".picture-three__item").classList.remove("_lock");
                document.querySelectorAll(".picture__button").forEach((el => {
                    el.classList.remove("_lock-all");
                }));
            }), 1300);
            points.innerHTML = +points.innerHTML + 20;
            points.classList.add("_anim");
            cristall.classList.add("_anim");
            setTimeout((() => {
                points.classList.remove("_anim");
                cristall.classList.remove("_anim");
            }), 1500);
            sessionStorage.setItem("points", +points.innerHTML);
            let a = +sessionStorage.getItem("complete-3");
            if (a < 4) {
                sessionStorage.setItem("complete-3", a + 1);
                if (+sessionStorage.getItem("complete-3") >= 3) sessionStorage.setItem("complete-3-all", true);
            }
            if (3 == timeArray.length) {
                document.querySelector(".circle_zoom").classList.add("_lock");
                setTimeout((() => {
                    document.querySelector(".play").classList.add("_active");
                }), 2e3);
            }
        } else if (targetElement.closest(".picture-slot_roulet") || targetElement.closest(".picture-three__button_two")) {
            timeArray.push(1);
            document.querySelector(".picture-slot_roulet").classList.add("_active");
            document.querySelector(".picture-three__button_two").classList.add("_lock");
            document.querySelectorAll(".picture__button").forEach((el => {
                el.classList.add("_lock-all");
            }));
            document.querySelector(".picture-three__item").classList.add("_lock");
            setTimeout((() => {
                document.querySelector(".picture-three__item").classList.remove("_lock");
                document.querySelectorAll(".picture__button").forEach((el => {
                    el.classList.remove("_lock-all");
                }));
            }), 1300);
            points.innerHTML = +points.innerHTML + 20;
            points.classList.add("_anim");
            cristall.classList.add("_anim");
            setTimeout((() => {
                points.classList.remove("_anim");
                cristall.classList.remove("_anim");
            }), 1500);
            sessionStorage.setItem("points", +points.innerHTML);
            let a = +sessionStorage.getItem("complete-3");
            if (a < 4) {
                sessionStorage.setItem("complete-3", a + 1);
                if (+sessionStorage.getItem("complete-3") >= 3) sessionStorage.setItem("complete-3-all", true);
            }
            if (3 == timeArray.length) {
                document.querySelector(".circle_zoom").classList.add("_lock");
                setTimeout((() => {
                    document.querySelector(".play").classList.add("_active");
                }), 2e3);
            }
        } else if (targetElement.closest(".picture-slot_slot") || targetElement.closest(".picture-three__button_three")) {
            timeArray.push(2);
            document.querySelector(".picture-slot_slot").classList.add("_active");
            document.querySelector(".picture-three__button_three").classList.add("_lock");
            document.querySelectorAll(".picture__button").forEach((el => {
                el.classList.add("_lock-all");
            }));
            document.querySelector(".picture-three__item").classList.add("_lock");
            setTimeout((() => {
                document.querySelector(".picture-three__item").classList.remove("_lock");
                document.querySelectorAll(".picture__button").forEach((el => {
                    el.classList.remove("_lock-all");
                }));
            }), 1300);
            points.innerHTML = +points.innerHTML + 20;
            points.classList.add("_anim");
            cristall.classList.add("_anim");
            setTimeout((() => {
                points.classList.remove("_anim");
                cristall.classList.remove("_anim");
            }), 1500);
            sessionStorage.setItem("points", +points.innerHTML);
            let a = +sessionStorage.getItem("complete-3");
            if (a < 4) {
                sessionStorage.setItem("complete-3", a + 1);
                if (+sessionStorage.getItem("complete-3") >= 3) sessionStorage.setItem("complete-3-all", true);
            }
            if (3 == timeArray.length) {
                document.querySelector(".circle_zoom").classList.add("_lock");
                setTimeout((() => {
                    document.querySelector(".play").classList.add("_active");
                }), 2e3);
            }
        }
    }));
    var minTime = 500;
    var maxTime = 2e3;
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    var casino1 = document.querySelector("#slot1");
    var casino2 = document.querySelector("#slot2");
    var casino3 = document.querySelector("#slot3");
    if (casino1 && casino2 && casino3) {
        let a, b, c;
        var mcasino1 = new SlotMachine(casino1, {
            active: 0,
            delay: 300,
            onComplete: function(active) {
                a = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 500;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        var mcasino2 = new SlotMachine(casino2, {
            active: 2,
            delay: 300,
            onComplete: function(active) {
                b = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 500;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        var mcasino3 = new SlotMachine(casino3, {
            active: 1,
            delay: 300,
            onComplete: function(active) {
                c = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 500;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        function gameSlotTwo() {
            document.querySelector("#spin").classList.add("_hold");
            setTimeout((() => {
                document.querySelector("#spin").classList.remove("_hold");
            }), 2e3);
            mcasino1.shuffle(9999);
            mcasino2.shuffle(9999);
            mcasino3.shuffle(9999);
            setTimeout((() => mcasino1.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino2.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino3.stop()), getRandomArbitrary(minTime, maxTime));
        }
        var casinoAutoSpin;
        if (document.querySelector("#spin")) document.querySelector("#spin").addEventListener("click", (() => {
            a = 666;
            b = 666;
            c = 666;
            if (casino1 && casino2 && casino3) {
                clearInterval(casinoAutoSpin);
                gameSlotTwo();
            }
            document.querySelector(".bonus__button").classList.add("_hide");
            setTimeout((() => {
                document.querySelector(".bonus__button").classList.remove("_hide");
            }), 2e3);
        }));
    }
    window["FLS"] = true;
    isWebp();
})();