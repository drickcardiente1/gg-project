"use strict";
! function () {
    var e, t; - 1 < navigator.platform.indexOf("Win") && (document.getElementsByClassName("main-content")[0] && (e = document.querySelector(".main-content"), new PerfectScrollbar(e)), document.getElementsByClassName("sidenav")[0] && (e = document.querySelector(".sidenav"), new PerfectScrollbar(e)), document.getElementsByClassName("navbar-collapse")[0] && (t = document.querySelector(".navbar:not(.navbar-expand-lg) .navbar-collapse"), new PerfectScrollbar(t)), document.getElementsByClassName("fixed-plugin")[0]) && (t = document.querySelector(".fixed-plugin"), new PerfectScrollbar(t))
}(), document.getElementById("navbarBlur") && navbarBlurOnScroll("navbarBlur");
var calendarEl, today, mYear, weekday, mDay, m, d, calendar, allInputs, fixedPlugin, fixedPluginButton, fixedPluginButtonNav, fixedPluginCard, fixedPluginCloseButton, navbar, buttonNavbarFixed, popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    , popoverList = popoverTriggerList.map(function (e) {
        return new bootstrap.Popover(e)
    })
    , tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    , tooltipList = tooltipTriggerList.map(function (e) {
        return new bootstrap.Tooltip(e)
    });

function focused(e) {
    e.parentElement.classList.contains("input-group") && e.parentElement.classList.add("focused")
}

function defocused(e) {
    e.parentElement.classList.contains("input-group") && e.parentElement.classList.remove("focused")
}

function setAttributes(t, a) {
    Object.keys(a)
        .forEach(function (e) {
            t.setAttribute(e, a[e])
        })
}

function dropDown(e) {
    if (!document.querySelector(".dropdown-hover")) {
        event.stopPropagation(), event.preventDefault();
        for (var t = e.parentElement.parentElement.children, a = 0; a < t.length; a++) t[a].lastElementChild != e.parentElement.lastElementChild && t[a].lastElementChild.classList.remove("show");
        e.nextElementSibling.classList.contains("show") ? e.nextElementSibling.classList.remove("show") : e.nextElementSibling.classList.add("show")
    }
}

function sidebarColor(e) {
    for (var t = e.parentElement.children, a = e.getAttribute("data-color"), n = 0; n < t.length; n++) t[n].classList.remove("active");
    e.classList.contains("active") ? e.classList.remove("active") : e.classList.add("active"), document.querySelector(".sidenav")
        .setAttribute("data-color", a), document.querySelector("#sidenavCardIcon") && (e = ["fas", "fa-file", "text-" + a], (a = document.querySelector("#sidenavCardIcon"))
            .className = "", a.classList.add(...e))
}

function sidebarType(e) {
    for (var t = e.parentElement.children, a = e.getAttribute("data-class"), n = document.querySelector("body:not(.dark-version)"), l = body.classList.contains("dark-version"), i = [], s = 0; s < t.length; s++) t[s].classList.remove("active"), i.push(t[s].getAttribute("data-class"));
    e.classList.contains("active") ? e.classList.remove("active") : e.classList.add("active");
    for (var o, r, c, d = document.querySelector(".sidenav"), s = 0; s < i.length; s++) d.classList.remove(i[s]);
    if (d.classList.add(a), "bg-white" == a) {
        var u = document.querySelectorAll(".sidenav .text-white");
        for (let e = 0; e < u.length; e++) u[e].classList.contains("active") || (u[e].classList.remove("text-white"), u[e].classList.add("text-dark"))
    } else {
        var m = document.querySelectorAll(".sidenav .text-dark");
        for (let e = 0; e < m.length; e++) m[e].classList.contains("active") || (m[e].classList.add("text-white"), m[e].classList.remove("text-dark"))
    }
    if ("bg-white" == a) {
        var g = document.querySelectorAll('.sidenav .navbar-brand [fill="white"]');
        for (let e = 0; e < g.length; e++) g[e].setAttribute("fill", "black")
    } else {
        var f = document.querySelectorAll('.sidenav .navbar-brand [fill="black"]');
        for (let e = 0; e < f.length; e++) f[e].setAttribute("fill", "white")
    }
    if ("bg-default" == a && l) {
        m = document.querySelectorAll(".navbar-brand .text-dark");
        for (let e = 0; e < m.length; e++) m[e].classList.add("text-white"), m[e].classList.remove("text-dark")
    }
    "bg-white" == a && n ? (r = (o = document.querySelector(".navbar-brand-img"))
            .src)
        .includes("logo-ct.png") && (c = r.replace("logo-ct", "logo-ct-dark"), o.src = c) : (r = (o = document.querySelector(".navbar-brand-img"))
            .src)
        .includes("logo-ct-dark.png") && (c = r.replace("logo-ct-dark", "logo-ct"), o.src = c), "bg-white" == a && l && (r = (o = document.querySelector(".navbar-brand-img"))
            .src)
        .includes("logo-ct.png") && (c = r.replace("logo-ct", "logo-ct-dark"), o.src = c)
}

function navbarFixed(e) {
    var t = ["position-sticky", "blur", "shadow-blur", "left-auto", "top-1", "z-index-sticky"]
        , a = document.getElementById("navbarBlur");
    e.getAttribute("checked") ? (toggleNavLinksColor("transparent"), a.classList.remove(...t), a.setAttribute("data-scroll", "false"), navbarBlurOnScroll("navbarBlur"), e.removeAttribute("checked")) : (toggleNavLinksColor("blur"), a.classList.add(...t), a.setAttribute("data-scroll", "true"), navbarBlurOnScroll("navbarBlur"), e.setAttribute("checked", "true"))
}

function navbarMinimize(e) {
    var t = document.getElementsByClassName("g-sidenav-show")[0];
    e.getAttribute("checked") ? (t.classList.remove("g-sidenav-hidden"), t.classList.add("g-sidenav-pinned"), e.removeAttribute("checked")) : (t.classList.remove("g-sidenav-pinned"), t.classList.add("g-sidenav-hidden"), e.setAttribute("checked", "true"))
}

function toggleNavLinksColor(e) {
    var t = document.querySelectorAll(".navbar-main .nav-link")
        , a = document.querySelectorAll(".navbar-main .breadcrumb-text")
        , n = document.querySelectorAll(".navbar-main .sidenav-toggler-line");
    document.querySelector("nav.navbar-main")
        .classList.contains("navbar-on-header") && ("blur" === e ? (t.forEach(e => {
            e.classList.add("text-body"), e.classList.remove("text-white")
        }), a.forEach(e => {
            e.classList.add("text-body"), e.classList.remove("text-white")
        }), n.forEach(e => {
            e.classList.add("bg-dark")
        })) : "transparent" === e && (t.forEach(e => {
            e.classList.remove("text-body"), e.classList.add("text-white")
        }), a.forEach(e => {
            e.classList.remove("text-body"), e.classList.add("text-white")
        }), n.forEach(e => {
            e.classList.remove("bg-dark")
        })))
}

function navbarBlurOnScroll(e) {
    const t = document.getElementById(e);
    var a, e = !!t && t.getAttribute("data-scroll");
    let n = ["blur", "shadow-blur", "left-auto"]
        , l = ["shadow-none"];
    
    function i() {
        t.classList.add(...n), t.classList.remove(...l), toggleNavLinksColor("blur")
    }
    
    function s() {
        t.classList.remove(...n), t.classList.add(...l), toggleNavLinksColor("transparent")
    }(5 < window.scrollY ? i : s)(), window.onscroll = debounce("true" == e ? function () {
        (5 < window.scrollY ? i : s)()
    } : function () {
        s()
    }, 10), -1 < navigator.platform.indexOf("Win") && (a = document.querySelector(".main-content"), "true" == e ? a.addEventListener("ps-scroll-y", debounce(function () {
        (5 < a.scrollTop ? i : s)()
    }, 10)) : a.addEventListener("ps-scroll-y", debounce(function () {
        s()
    }, 10)))
}

function debounce(n, l, i) {
    var s;
    return function () {
        var e = this
            , t = arguments
            , a = i && !s;
        clearTimeout(s), s = setTimeout(function () {
            s = null, i || n.apply(e, t)
        }, l), a && n.apply(e, t)
    }
}
document.addEventListener("DOMContentLoaded", function () {
        [].slice.call(document.querySelectorAll(".toast"))
            .map(function (e) {
                return new bootstrap.Toast(e)
            });
        [].slice.call(document.querySelectorAll(".toast-btn"))
            .map(function (t) {
                t.addEventListener("click", function () {
                    var e = document.getElementById(t.dataset.target);
                    e && bootstrap.Toast.getInstance(e)
                        .show()
                })
            })
    }), document.querySelector('[data-toggle="widget-calendar"]') && (calendarEl = document.querySelector('[data-toggle="widget-calendar"]'), mYear = (today = new Date)
        .getFullYear(), mDay = (weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])[today.getDay()], m = today.getMonth(), d = today.getDate(), document.getElementsByClassName("widget-calendar-year")[0].innerHTML = mYear, document.getElementsByClassName("widget-calendar-day")[0].innerHTML = mDay, (calendar = new FullCalendar.Calendar(calendarEl, {
            contentHeight: "auto"
            , initialView: "dayGridMonth"
            , selectable: !0
            , initialDate: "2020-12-01"
            , editable: !0
            , headerToolbar: !1
            , events: [{
                title: "Call with Dave"
                , start: "2020-11-18"
                , end: "2020-11-18"
                , className: "bg-danger"
            }, {
                title: "Lunch meeting"
                , start: "2020-11-21"
                , end: "2020-11-22"
                , className: "bg-warning"
            }, {
                title: "All day conference"
                , start: "2020-11-29"
                , end: "2020-11-29"
                , className: "bg-success"
            }, {
                title: "Meeting with Mary"
                , start: "2020-12-01"
                , end: "2020-12-01"
                , className: "bg-info"
            }, {
                title: "Winter Hackaton"
                , start: "2020-12-03"
                , end: "2020-12-03"
                , className: "bg-danger"
            }, {
                title: "Digital event"
                , start: "2020-12-07"
                , end: "2020-12-09"
                , className: "bg-warning"
            }, {
                title: "Marketing event"
                , start: "2020-12-10"
                , end: "2020-12-10"
                , className: "bg-primary"
            }, {
                title: "Dinner with Family"
                , start: "2020-12-19"
                , end: "2020-12-19"
                , className: "bg-danger"
            }, {
                title: "Black Friday"
                , start: "2020-12-23"
                , end: "2020-12-23"
                , className: "bg-info"
            }, {
                title: "Cyber Week"
                , start: "2020-12-02"
                , end: "2020-12-02"
                , className: "bg-warning"
            }]
        }))
        .render()), 0 != document.querySelectorAll(".input-group")
    .length && (allInputs = document.querySelectorAll("input.form-control"))
    .forEach(e => setAttributes(e, {
        onfocus: "focused(this)"
        , onfocusout: "defocused(this)"
    })), document.querySelector(".fixed-plugin") && (fixedPlugin = document.querySelector(".fixed-plugin"), fixedPluginButton = document.querySelector(".fixed-plugin-button"), fixedPluginButtonNav = document.querySelector(".fixed-plugin-button-nav"), fixedPluginCard = document.querySelector(".fixed-plugin .card"), fixedPluginCloseButton = document.querySelectorAll(".fixed-plugin-close-button"), navbar = document.getElementById("navbarBlur"), buttonNavbarFixed = document.getElementById("navbarFixed"), fixedPluginButton && (fixedPluginButton.onclick = function () {
            fixedPlugin.classList.contains("show") ? fixedPlugin.classList.remove("show") : fixedPlugin.classList.add("show")
        }), fixedPluginButtonNav && (fixedPluginButtonNav.onclick = function () {
            fixedPlugin.classList.contains("show") ? fixedPlugin.classList.remove("show") : fixedPlugin.classList.add("show")
        }), fixedPluginCloseButton.forEach(function (e) {
            e.onclick = function () {
                fixedPlugin.classList.remove("show")
            }
        }), document.querySelector("body")
        .onclick = function (e) {
            e.target != fixedPluginButton && e.target != fixedPluginButtonNav && e.target.closest(".fixed-plugin .card") != fixedPluginCard && fixedPlugin.classList.remove("show")
        }, navbar) && "true" == navbar.getAttribute("data-scroll") && buttonNavbarFixed && buttonNavbarFixed.setAttribute("checked", "true");
var sidenavToggler, sidenavShow, toggleNavbarMinimize, total = document.querySelectorAll(".nav-pills");

function initNavs() {
    total.forEach(function (i, e) {
        var s = document.createElement("div")
            , t = i.querySelector("li:first-child .nav-link")
            .cloneNode();
        t.innerHTML = "-", s.classList.add("moving-tab", "position-absolute", "nav-link"), s.appendChild(t), i.appendChild(s), i.getElementsByTagName("li")
            .length;
        s.style.padding = "0px", s.style.width = i.querySelector("li:nth-child(1)")
            .offsetWidth + "px", s.style.transform = "translate3d(0px, 0px, 0px)", s.style.transition = ".5s ease", i.onmouseover = function (e) {
                let l = getEventTarget(e)
                    .closest("li");
                if (l) {
                    let a = Array.from(l.closest("ul")
                            .children)
                        , n = a.indexOf(l) + 1;
                    i.querySelector("li:nth-child(" + n + ") .nav-link")
                        .onclick = function () {
                            s = i.querySelector(".moving-tab");
                            let e = 0;
                            if (i.classList.contains("flex-column")) {
                                for (var t = 1; t <= a.indexOf(l); t++) e += i.querySelector("li:nth-child(" + t + ")")
                                    .offsetHeight;
                                s.style.transform = "translate3d(0px," + e + "px, 0px)", s.style.height = i.querySelector("li:nth-child(" + t + ")")
                                    .offsetHeight
                            } else {
                                for (t = 1; t <= a.indexOf(l); t++) e += i.querySelector("li:nth-child(" + t + ")")
                                    .offsetWidth;
                                s.style.transform = "translate3d(" + e + "px, 0px, 0px)", s.style.width = i.querySelector("li:nth-child(" + n + ")")
                                    .offsetWidth + "px"
                            }
                        }
                }
            }, window.innerWidth < 991 && total.forEach(function (t, e) {
                if (!t.classList.contains("flex-column")) {
                    t.classList.remove("flex-row"), t.classList.add("flex-column", "on-resize");
                    var a = t.querySelector(".nav-link.active")
                        .parentElement
                        , n = Array.from(a.closest("ul")
                            .children);
                    n.indexOf(a);
                    let e = 0;
                    for (var l = 1; l <= n.indexOf(a); l++) e += t.querySelector("li:nth-child(" + l + ")")
                        .offsetHeight;
                    var i = document.querySelector(".moving-tab");
                    i.style.width = t.querySelector("li:nth-child(1)")
                        .offsetWidth + "px", i.style.transform = "translate3d(0px," + e + "px, 0px)"
                }
            })
    })
}

function getEventTarget(e) {
    return (e = e || window.event)
        .target || e.srcElement
}
setTimeout(function () {
    initNavs()
}, 100), window.addEventListener("resize", function (e) {
    total.forEach(function (t, e) {
        t.querySelector(".moving-tab")
            .remove();
        var a = document.createElement("div")
            , n = t.querySelector(".nav-link.active")
            .cloneNode()
            , l = (n.innerHTML = "-", a.classList.add("moving-tab", "position-absolute", "nav-link"), a.appendChild(n), t.appendChild(a), a.style.padding = "0px", a.style.transition = ".5s ease", t.querySelector(".nav-link.active")
                .parentElement);
        if (l) {
            var i = Array.from(l.closest("ul")
                    .children)
                , n = i.indexOf(l) + 1;
            let e = 0;
            if (t.classList.contains("flex-column")) {
                for (var s = 1; s <= i.indexOf(l); s++) e += t.querySelector("li:nth-child(" + s + ")")
                    .offsetHeight;
                a.style.transform = "translate3d(0px," + e + "px, 0px)", a.style.width = t.querySelector("li:nth-child(" + n + ")")
                    .offsetWidth + "px", a.style.height = t.querySelector("li:nth-child(" + s + ")")
                    .offsetHeight
            } else {
                for (s = 1; s <= i.indexOf(l); s++) e += t.querySelector("li:nth-child(" + s + ")")
                    .offsetWidth;
                a.style.transform = "translate3d(" + e + "px, 0px, 0px)", a.style.width = t.querySelector("li:nth-child(" + n + ")")
                    .offsetWidth + "px"
            }
        }
    }), window.innerWidth < 991 ? total.forEach(function (t, e) {
        if (!t.classList.contains("flex-column")) {
            t.classList.remove("flex-row"), t.classList.add("flex-column", "on-resize");
            var a = t.querySelector(".nav-link.active")
                .parentElement
                , n = Array.from(a.closest("ul")
                    .children);
            n.indexOf(a);
            let e = 0;
            for (var l = 1; l <= n.indexOf(a); l++) e += t.querySelector("li:nth-child(" + l + ")")
                .offsetHeight;
            var i = document.querySelector(".moving-tab");
            i.style.width = t.querySelector("li:nth-child(1)")
                .offsetWidth + "px", i.style.transform = "translate3d(0px," + e + "px, 0px)"
        }
    }) : total.forEach(function (t, e) {
        if (t.classList.contains("on-resize")) {
            t.classList.remove("flex-column", "on-resize"), t.classList.add("flex-row");
            var a = t.querySelector(".nav-link.active")
                .parentElement
                , n = Array.from(a.closest("ul")
                    .children)
                , l = n.indexOf(a) + 1;
            let e = 0;
            for (var i = 1; i <= n.indexOf(a); i++) e += t.querySelector("li:nth-child(" + i + ")")
                .offsetWidth;
            var s = document.querySelector(".moving-tab");
            s.style.transform = "translate3d(" + e + "px, 0px, 0px)", s.style.width = t.querySelector("li:nth-child(" + l + ")")
                .offsetWidth + "px"
        }
    })
}), window.innerWidth < 991 && total.forEach(function (e, t) {
    e.classList.contains("flex-row") && (e.classList.remove("flex-row"), e.classList.add("flex-column", "on-resize"))
}), document.querySelector(".sidenav-toggler") && (sidenavToggler = document.getElementsByClassName("sidenav-toggler")[0], sidenavShow = document.getElementsByClassName("g-sidenav-show")[0], toggleNavbarMinimize = document.getElementById("navbarMinimize"), sidenavShow) && (sidenavToggler.onclick = function () {
    sidenavShow.classList.contains("g-sidenav-hidden") ? (sidenavShow.classList.remove("g-sidenav-hidden"), sidenavShow.classList.add("g-sidenav-pinned"), toggleNavbarMinimize && (toggleNavbarMinimize.click(), toggleNavbarMinimize.removeAttribute("checked"))) : (sidenavShow.classList.remove("g-sidenav-pinned"), sidenavShow.classList.add("g-sidenav-hidden"), toggleNavbarMinimize && (toggleNavbarMinimize.click(), toggleNavbarMinimize.setAttribute("checked", "true")))
});
const iconNavbarSidenav = document.getElementById("iconNavbarSidenav")
    , iconSidenav = document.getElementById("iconSidenav")
    , sidenav = document.getElementById("sidenav-main");
let body = document.getElementsByTagName("body")[0]
    , className = "g-sidenav-pinned";

function toggleSidenav() {
    body.classList.contains(className) ? body.classList.remove(className) : body.classList.add(className)
}

function sidenavTypeOnResize() {
    var e = document.querySelectorAll('[onclick="sidebarType(this)"]');
    window.innerWidth < 1200 ? e.forEach(function (e) {
        e.classList.add("disabled")
    }) : e.forEach(function (e) {
        e.classList.remove("disabled")
    })
}

function notify(e) {
    var t = document.querySelector("body")
        , a = document.createElement("div");
    a.classList.add("alert", "position-absolute", "top-0", "border-0", "text-white", "w-50", "end-0", "start-0", "mt-2", "mx-auto", "py-2"), a.classList.add("alert-" + e.getAttribute("data-type")), a.style.transform = "translate3d(0px, 0px, 0px)", a.style.opacity = "0", a.style.transition = ".35s ease", setTimeout(function () {
        a.style.transform = "translate3d(0px, 20px, 0px)", a.style.setProperty("opacity", "1", "important")
    }, 100), a.innerHTML = '<div class="d-flex mb-1"><div class="alert-icon me-1"><i class="' + e.getAttribute("data-icon") + ' mt-1"></i></div><span class="alert-text"><strong>' + e.getAttribute("data-title") + '</strong></span></div><span class="text-sm">' + e.getAttribute("data-content") + "</span>", t.appendChild(a), setTimeout(function () {
        a.style.transform = "translate3d(0px, 0px, 0px)", a.style.setProperty("opacity", "0", "important")
    }, 4e3), setTimeout(function () {
        e.parentElement.querySelector(".alert")
            .remove()
    }, 4500)
}

function darkMode(e) {
    var t, a = document.getElementsByTagName("body")[0]
        , n = document.querySelectorAll("div:not(.sidenav) > hr")
        , l = document.querySelector(".sidenav")
        , i = document.querySelectorAll(".sidenav.bg-white")
        , s = document.querySelectorAll("div:not(.bg-gradient-dark) hr")
        , o = document.querySelectorAll("button:not(.btn) > .text-dark")
        , r = document.querySelectorAll("span.text-dark, .breadcrumb .text-dark")
        , c = document.querySelectorAll("span.text-white, .breadcrumb .text-white")
        , d = document.querySelectorAll("strong.text-dark")
        , u = document.querySelectorAll("strong.text-white")
        , m = document.querySelectorAll("a.nav-link.text-dark")
        , g = document.querySelectorAll(".text-secondary")
        , f = document.querySelectorAll(".text-white")
        , v = document.querySelectorAll(".bg-gray-100")
        , h = document.querySelectorAll(".bg-gray-600")
        , b = document.querySelectorAll(".btn.btn-link.text-dark, .btn .ni.text-dark")
        , y = document.querySelectorAll(".btn.btn-link.text-white, .btn .ni.text-white")
        , p = document.querySelectorAll(".card.border")
        , x = document.querySelectorAll(".card.border.border-dark")
        , w = document.querySelectorAll(".navbar g")
        , L = document.querySelector(".navbar-brand-img")
        , S = L.src
        , k = document.querySelectorAll(".navbar-main .nav-link, .navbar-main .breadcrumb-item, .navbar-main .breadcrumb-item a")
        , q = document.querySelectorAll(".card .nav .nav-link i")
        , A = document.querySelectorAll(".card .nav .nav-link span")
        , C = document.querySelectorAll(".fixed-plugin > .card")
        , E = document.querySelectorAll(".main-content .container-fluid .card");
    if (e.getAttribute("checked")) {
        a.classList.remove("dark-version"), l.classList.add("bg-white"), S.includes("logo-ct.png") && (t = S.replace("logo-ct", "logo-ct-dark"), L.src = t);
        for (B = 0; B < k.length; B++) k[B].classList.contains("text-dark") && (k[B].classList.add("text-white"), k[B].classList.remove("text-dark"));
        for (B = 0; B < q.length; B++) q[B].classList.contains("text-white") && (q[B].classList.remove("text-white"), q[B].classList.add("text-dark"));
        for (B = 0; B < A.length; B++) A[B].classList.contains("text-white") && A[B].classList.remove("text-white");
        for (B = 0; B < E.length; B++) E[B].classList.add("blur", "shadow-blur");
        for (B = 0; B < C.length; B++) C[B].classList.add("blur");
        for (B = 0; B < n.length; B++) n[B].classList.contains("light") && (n[B].classList.add("dark"), n[B].classList.remove("light"));
        for (B = 0; B < s.length; B++) s[B].classList.contains("light") && (s[B].classList.add("dark"), s[B].classList.remove("light"));
        for (B = 0; B < o.length; B++) o[B].classList.contains("text-white") && (o[B].classList.remove("text-white"), o[B].classList.add("text-dark"));
        for (B = 0; B < c.length; B++) !c[B].classList.contains("text-white") || c[B].closest(".sidenav") || c[B].closest(".card.bg-gradient-dark") || (c[B].classList.remove("text-white"), c[B].classList.add("text-dark"));
        for (B = 0; B < u.length; B++) u[B].classList.contains("text-white") && (u[B].classList.remove("text-white"), u[B].classList.add("text-dark"));
        for (B = 0; B < f.length; B++) f[B].classList.contains("text-white") && (f[B].classList.remove("text-white"), f[B].classList.remove("opacity-8"), f[B].classList.add("text-secondary"));
        for (B = 0; B < h.length; B++) h[B].classList.contains("bg-gray-600") && (h[B].classList.remove("bg-gray-600"), h[B].classList.add("bg-gray-100"));
        for (B = 0; B < w.length; B++) w[B].hasAttribute("fill") && w[B].setAttribute("fill", "#6c757d");
        for (B = 0; B < y.length; B++) y[B].closest(".card.bg-gradient-dark") || (y[B].classList.remove("text-white"), y[B].classList.add("text-dark"));
        for (B = 0; B < x.length; B++) x[B].classList.remove("border-dark");
        e.removeAttribute("checked")
    } else {
        a.classList.add("dark-version"), S.includes("logo-ct-dark.png") && (t = S.replace("logo-ct-dark", "logo-ct"), L.src = t);
        for (var B = 0; B < E.length; B++) E[B].classList.contains("blur") && E[B].classList.remove("blur", "shadow-blur");
        for (var B = 0; B < k.length; B++) k[B].classList.contains("text-white") && k[B].classList.remove("text-white");
        for (var B = 0; B < C.length; B++) C[B].classList.contains("blur") && C[B].classList.remove("blur");
        for (var B = 0; B < q.length; B++) q[B].classList.contains("text-dark") && (q[B].classList.remove("text-dark"), q[B].classList.add("text-white"));
        for (var B = 0; B < A.length; B++) A[B].classList.contains("text-sm") && A[B].classList.add("text-white");
        for (var B = 0; B < n.length; B++) n[B].classList.contains("dark") && (n[B].classList.remove("dark"), n[B].classList.add("light"));
        for (var B = 0; B < s.length; B++) s[B].classList.contains("dark") && (s[B].classList.remove("dark"), s[B].classList.add("light"));
        for (var B = 0; B < o.length; B++) o[B].classList.contains("text-dark") && (o[B].classList.remove("text-dark"), o[B].classList.add("text-white"));
        for (var B = 0; B < r.length; B++) r[B].classList.contains("text-dark") && (r[B].classList.remove("text-dark"), r[B].classList.add("text-white"));
        for (var B = 0; B < d.length; B++) d[B].classList.contains("text-dark") && (d[B].classList.remove("text-dark"), d[B].classList.add("text-white"));
        for (var B = 0; B < m.length; B++) m[B].classList.contains("text-dark") && (m[B].classList.remove("text-dark"), m[B].classList.add("text-white"));
        for (var B = 0; B < g.length; B++) g[B].classList.contains("text-secondary") && (g[B].classList.remove("text-secondary"), g[B].classList.add("text-white"), g[B].classList.add("opacity-8"));
        for (var B = 0; B < v.length; B++) v[B].classList.contains("bg-gray-100") && (v[B].classList.remove("bg-gray-100"), v[B].classList.add("bg-gray-600"));
        for (var B = 0; B < b.length; B++) b[B].classList.remove("text-dark"), b[B].classList.add("text-white");
        for (var B = 0; B < i.length; B++) i[B].classList.remove("bg-white");
        for (var B = 0; B < w.length; B++) w[B].hasAttribute("fill") && w[B].setAttribute("fill", "#fff");
        for (B = 0; B < p.length; B++) p[B].classList.add("border-dark");
        e.setAttribute("checked", "true")
    }
}
iconNavbarSidenav && iconNavbarSidenav.addEventListener("click", toggleSidenav), iconSidenav && iconSidenav.addEventListener("click", toggleSidenav), window.addEventListener("resize", sidenavTypeOnResize), window.addEventListener("load", sidenavTypeOnResize);
var soft = {
    initFullCalendar: function () {
        document.addEventListener("DOMContentLoaded", function () {
            var e = document.getElementById("fullCalendar")
                , t = new Date
                , a = t.getFullYear()
                , n = t.getMonth()
                , t = t.getDate()
                , l = new FullCalendar.Calendar(e, {
                    initialView: "dayGridMonth"
                    , selectable: !0
                    , headerToolbar: {
                        left: "title"
                        , center: "dayGridMonth,timeGridWeek,timeGridDay"
                        , right: "prev,next today"
                    }
                    , select: function (a) {
                        Swal.fire({
                                title: "Create an Event"
                                , html: '<div class="form-group"><input class="form-control text-default" placeholder="Event Title" id="input-field"></div>'
                                , showCancelButton: !0
                                , customClass: {
                                    confirmButton: "btn btn-primary"
                                    , cancelButton: "btn btn-danger"
                                }
                                , buttonsStyling: !1
                            })
                            .then(function (e) {
                                var t = document.getElementById("input-field")
                                    .value;
                                t && (t = {
                                    title: t
                                    , start: a.startStr
                                    , end: a.endStr
                                }, l.addEvent(t))
                            })
                    }
                    , editable: !0
                    , events: [{
                        title: "All Day Event"
                        , start: new Date(a, n, 1)
                        , className: "event-default"
                    }, {
                        id: 999
                        , title: "Repeating Event"
                        , start: new Date(a, n, t - 4, 6, 0)
                        , allDay: !1
                        , className: "event-rose"
                    }, {
                        id: 999
                        , title: "Repeating Event"
                        , start: new Date(a, n, t + 3, 6, 0)
                        , allDay: !1
                        , className: "event-rose"
                    }, {
                        title: "Meeting"
                        , start: new Date(a, n, t - 1, 10, 30)
                        , allDay: !1
                        , className: "event-green"
                    }, {
                        title: "Lunch"
                        , start: new Date(a, n, t + 7, 12, 0)
                        , end: new Date(a, n, t + 7, 14, 0)
                        , allDay: !1
                        , className: "event-red"
                    }, {
                        title: "Md-pro Launch"
                        , start: new Date(a, n, t - 2, 12, 0)
                        , allDay: !0
                        , className: "event-azure"
                    }, {
                        title: "Birthday Party"
                        , start: new Date(a, n, t + 1, 19, 0)
                        , end: new Date(a, n, t + 1, 22, 30)
                        , allDay: !1
                        , className: "event-azure"
                    }, {
                        title: "Click for Creative Tim"
                        , start: new Date(a, n, 21)
                        , end: new Date(a, n, 22)
                        , url: "http://www.creative-tim.com/"
                        , className: "event-orange"
                    }, {
                        title: "Click for Google"
                        , start: new Date(a, n, 23)
                        , end: new Date(a, n, 23)
                        , url: "http://www.creative-tim.com/"
                        , className: "event-orange"
                    }]
                });
            l.render()
        })
    }
    , datatableSimple: function () {
        var t = {
            columnDefs: [{
                field: "athlete"
                , minWidth: 150
                , sortable: !0
                , filter: !0
            }, {
                field: "age"
                , maxWidth: 90
                , sortable: !0
                , filter: !0
            }, {
                field: "country"
                , minWidth: 150
                , sortable: !0
                , filter: !0
            }, {
                field: "year"
                , maxWidth: 90
                , sortable: !0
                , filter: !0
            }, {
                field: "date"
                , minWidth: 150
                , sortable: !0
                , filter: !0
            }, {
                field: "sport"
                , minWidth: 150
                , sortable: !0
                , filter: !0
            }, {
                field: "gold"
            }, {
                field: "silver"
            }, {
                field: "bronze"
            }, {
                field: "total"
            }]
            , rowSelection: "multiple"
            , rowMultiSelectWithClick: !0
            , rowData: [{
                athlete: "Ronald Valencia"
                , age: 23
                , country: "United States"
                , year: 2008
                , date: "24/08/2008"
                , sport: "Swimming"
                , gold: 8
                , silver: 0
                , bronze: 0
                , total: 8
            }, {
                athlete: "Lorand Frentz"
                , age: 19
                , country: "United States"
                , year: 2004
                , date: "29/08/2004"
                , sport: "Swimming"
                , gold: 6
                , silver: 0
                , bronze: 2
                , total: 8
            }, {
                athlete: "Michael Phelps"
                , age: 27
                , country: "United States"
                , year: 2012
                , date: "12/08/2012"
                , sport: "Swimming"
                , gold: 4
                , silver: 2
                , bronze: 0
                , total: 6
            }, {
                athlete: "Natalie Coughlin"
                , age: 25
                , country: "United States"
                , year: 2008
                , date: "24/08/2008"
                , sport: "Swimming"
                , gold: 1
                , silver: 2
                , bronze: 3
                , total: 6
            }, {
                athlete: "Aleksey Nemov"
                , age: 24
                , country: "Russia"
                , year: 2e3
                , date: "01/10/2000"
                , sport: "Gymnastics"
                , gold: 2
                , silver: 1
                , bronze: 3
                , total: 6
            }, {
                athlete: "Alicia Coutts"
                , age: 24
                , country: "Australia"
                , year: 2012
                , date: "12/08/2012"
                , sport: "Swimming"
                , gold: 1
                , silver: 3
                , bronze: 1
                , total: 5
            }, {
                athlete: "Missy Franklin"
                , age: 17
                , country: "United States"
                , year: 2012
                , date: "12/08/2012"
                , sport: "Swimming"
                , gold: 4
                , silver: 0
                , bronze: 1
                , total: 5
            }, {
                athlete: "Ryan Lochte"
                , age: 27
                , country: "United States"
                , year: 2012
                , date: "12/08/2012"
                , sport: "Swimming"
                , gold: 2
                , silver: 2
                , bronze: 1
                , total: 5
            }, {
                athlete: "Allison Schmitt"
                , age: 22
                , country: "United States"
                , year: 2012
                , date: "12/08/2012"
                , sport: "Swimming"
                , gold: 3
                , silver: 1
                , bronze: 1
                , total: 5
            }, {
                athlete: "Natalie Coughlin"
                , age: 21
                , country: "United States"
                , year: 2004
                , date: "29/08/2004"
                , sport: "Swimming"
                , gold: 2
                , silver: 2
                , bronze: 1
                , total: 5
            }, {
                athlete: "Ian Thorpe"
                , age: 17
                , country: "Australia"
                , year: 2e3
                , date: "01/10/2000"
                , sport: "Swimming"
                , gold: 3
                , silver: 2
                , bronze: 0
                , total: 5
            }, {
                athlete: "Dara Torres"
                , age: 33
                , country: "United States"
                , year: 2e3
                , date: "01/10/2000"
                , sport: "Swimming"
                , gold: 2
                , silver: 0
                , bronze: 3
                , total: 5
            }, {
                athlete: "Cindy Klassen"
                , age: 26
                , country: "Canada"
                , year: 2006
                , date: "26/02/2006"
                , sport: "Speed Skating"
                , gold: 1
                , silver: 2
                , bronze: 2
                , total: 5
            }, {
                athlete: "Nastia Liukin"
                , age: 18
                , country: "United States"
                , year: 2008
                , date: "24/08/2008"
                , sport: "Gymnastics"
                , gold: 1
                , silver: 3
                , bronze: 1
                , total: 5
            }, {
                athlete: "Marit Bjørgen"
                , age: 29
                , country: "Norway"
                , year: 2010
                , date: "28/02/2010"
                , sport: "Cross Country Skiing"
                , gold: 3
                , silver: 1
                , bronze: 1
                , total: 5
            }, {
                athlete: "Sun Yang"
                , age: 20
                , country: "China"
                , year: 2012
                , date: "12/08/2012"
                , sport: "Swimming"
                , gold: 2
                , silver: 1
                , bronze: 1
                , total: 4
            }]
        };
        document.addEventListener("DOMContentLoaded", function () {
            var e = document.querySelector("#datatableSimple");
            new agGrid.Grid(e, t)
        })
    }
    , initVectorMap: function () {
        am4core.ready(function () {
            am4core.useTheme(am4themes_animated);
            var e = am4core.create("chartdiv", am4maps.MapChart)
                , t = (e.geodata = am4geodata_worldLow, e.projection = new am4maps.projections.Miller, e.series.push(new am4maps.MapPolygonSeries))
                , t = (t.exclude = ["AQ"], t.useGeodata = !0, t.mapPolygons.template);
            t.tooltipText = "{name}", t.polygon.fillOpacity = .6;
            t.states.create("hover")
                .properties.fill = e.colors.getIndex(0);
            t = e.series.push(new am4maps.MapImageSeries), t.mapImages.template.propertyFields.longitude = "longitude", t.mapImages.template.propertyFields.latitude = "latitude", t.mapImages.template.tooltipText = "{title}", t.mapImages.template.propertyFields.url = "url", e = t.mapImages.template.createChild(am4core.Circle), e.radius = 3, e.propertyFields.fill = "color", e = t.mapImages.template.createChild(am4core.Circle);
            e.radius = 3, e.propertyFields.fill = "color", e.events.on("inited", function (e) {
                ! function t(e) {
                    e = e.animate([{
                        property: "scale"
                        , from: 1
                        , to: 5
                    }, {
                        property: "opacity"
                        , from: 1
                        , to: 0
                    }], 1e3, am4core.ease.circleOut);
                    e.events.on("animationended", function (e) {
                        t(e.target.object)
                    })
                }(e.target)
            });
            e = new am4core.ColorSet;
            t.data = [{
                title: "Brussels"
                , latitude: 50.8371
                , longitude: 4.3676
                , color: e.next()
            }, {
                title: "Copenhagen"
                , latitude: 55.6763
                , longitude: 12.5681
                , color: e.next()
            }, {
                title: "Paris"
                , latitude: 48.8567
                , longitude: 2.351
                , color: e.next()
            }, {
                title: "Reykjavik"
                , latitude: 64.1353
                , longitude: -21.8952
                , color: e.next()
            }, {
                title: "Moscow"
                , latitude: 55.7558
                , longitude: 37.6176
                , color: e.next()
            }, {
                title: "Madrid"
                , latitude: 40.4167
                , longitude: -3.7033
                , color: e.next()
            }, {
                title: "London"
                , latitude: 51.5002
                , longitude: -.1262
                , url: "http://www.google.co.uk"
                , color: e.next()
            }, {
                title: "Peking"
                , latitude: 39.9056
                , longitude: 116.3958
                , color: e.next()
            }, {
                title: "New Delhi"
                , latitude: 28.6353
                , longitude: 77.225
                , color: e.next()
            }, {
                title: "Tokyo"
                , latitude: 35.6785
                , longitude: 139.6823
                , url: "http://www.google.co.jp"
                , color: e.next()
            }, {
                title: "Ankara"
                , latitude: 39.9439
                , longitude: 32.856
                , color: e.next()
            }, {
                title: "Buenos Aires"
                , latitude: -34.6118
                , longitude: -58.4173
                , color: e.next()
            }, {
                title: "Brasilia"
                , latitude: -15.7801
                , longitude: -47.9292
                , color: e.next()
            }, {
                title: "Ottawa"
                , latitude: 45.4235
                , longitude: -75.6979
                , color: e.next()
            }, {
                title: "Washington"
                , latitude: 38.8921
                , longitude: -77.0241
                , color: e.next()
            }, {
                title: "Kinshasa"
                , latitude: -4.3369
                , longitude: 15.3271
                , color: e.next()
            }, {
                title: "Cairo"
                , latitude: 30.0571
                , longitude: 31.2272
                , color: e.next()
            }, {
                title: "Pretoria"
                , latitude: -25.7463
                , longitude: 28.1876
                , color: e.next()
            }]
        })
    }
    , showSwal: function (e) {
        if ("basic" == e) Swal.fire("Any fool can use a computer");
        else if ("title-and-text" == e) Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success mx-2"
                    , cancelButton: "btn btn-danger"
                }
            })
            .fire({
                title: "Sweet!"
                , text: "Modal with a custom image."
                , imageUrl: "https://unsplash.it/400/200"
                , imageWidth: 400
                , imageAlt: "Custom image"
            });
        else if ("success-message" == e) Swal.fire("Good job!", "You clicked the button!", "success");
        else if ("warning-message-and-confirmation" == e) {
            const t = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success mx-2"
                    , cancelButton: "btn btn-danger"
                }
                , buttonsStyling: !1
            });
            t.fire({
                    title: "Are you sure?"
                    , text: "You won't be able to revert this!"
                    , type: "warning"
                    , showCancelButton: !0
                    , confirmButtonText: "Yes, delete it!"
                    , cancelButtonText: "No, cancel!"
                    , reverseButtons: !0
                })
                .then(e => {
                    e.value ? t.fire("Deleted!", "Your file has been deleted.", "success") : e.dismiss === Swal.DismissReason.cancel && t.fire("Cancelled", "Your imaginary file is safe :)", "error")
                })
        } else if ("warning-message-and-cancel" == e) Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success mx-2"
                    , cancelButton: "btn btn-danger"
                }
                , buttonsStyling: !1
            })
            .fire({
                title: "Are you sure?"
                , text: "You won't be able to revert this!"
                , icon: "warning"
                , showCancelButton: !0
                , confirmButtonText: "Yes, delete it!"
            })
            .then(e => {
                e.isConfirmed && Swal.fire("Deleted!", "Your file has been deleted.", "success")
            });
        else if ("custom-html" == e) Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success mx-2"
                    , cancelButton: "btn btn-danger"
                }
                , buttonsStyling: !1
            })
            .fire({
                title: "<strong>HTML <u>example</u></strong>"
                , icon: "info"
                , html: 'You can use <b>bold text</b>, <a href="//sweetalert2.github.io">links</a> and other HTML tags'
                , showCloseButton: !0
                , showCancelButton: !0
                , focusConfirm: !1
                , confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!'
                , confirmButtonAriaLabel: "Thumbs up, great!"
                , cancelButtonText: '<i class="fa fa-thumbs-down"></i>'
                , cancelButtonAriaLabel: "Thumbs down"
            });
        else if ("rtl-language" == e) Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success mx-2"
                    , cancelButton: "btn btn-danger"
                }
                , buttonsStyling: !1
            })
            .fire({
                title: "هل تريد الاستمرار؟"
                , icon: "question"
                , iconHtml: "؟"
                , confirmButtonText: "نعم"
                , cancelButtonText: "لا"
                , showCancelButton: !0
                , showCloseButton: !0
            });
        else if ("auto-close" == e) {
            let e;
            Swal.fire({
                    title: "Auto close alert!"
                    , html: "I will close in <b></b> milliseconds."
                    , timer: 2e3
                    , timerProgressBar: !0
                    , didOpen: () => {
                        Swal.showLoading(), e = setInterval(() => {
                            var e = Swal.getHtmlContainer();
                            e && (e = e.querySelector("b")) && (e.textContent = Swal.getTimerLeft())
                        }, 100)
                    }
                    , willClose: () => {
                        clearInterval(e)
                    }
                })
                .then(e => {
                    e.dismiss, Swal.DismissReason.timer
                })
        } else "input-field" == e && Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success mx-2"
                    , cancelButton: "btn btn-danger"
                }
                , buttonsStyling: !1
            })
            .fire({
                title: "Submit your Github username"
                , input: "text"
                , inputAttributes: {
                    autocapitalize: "off"
                }
                , showCancelButton: !0
                , confirmButtonText: "Look up"
                , showLoaderOnConfirm: !0
                , preConfirm: e => fetch("//api.github.com/users/" + e)
                    .then(e => {
                        if (e.ok) return e.json();
                        throw new Error(e.statusText)
                    })
                    .catch(e => {
                        Swal.showValidationMessage("Request failed: " + e)
                    })
                , allowOutsideClick: () => !Swal.isLoading()
            })
            .then(e => {
                e.isConfirmed && Swal.fire({
                    title: e.value.login + "'s avatar"
                    , imageUrl: e.value.avatar_url
                })
            })
    }
};