// aHR0cHM6Ly9naXRodWIuY29tL2x1b3N0MjYvYWNhZGVtaWMtaG9tZXBhZ2U=
$(function () {
    lazyLoadOptions = {
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 300,
        placeholder: "",
        onError: function(element) {
            console.log('[lazyload] Error loading ' + element.data('src'));
        },
        afterLoad: function(element) {
            if (element.is('img')) {
                // remove background-image style
                element.css('background-image', 'none');
                element.css('min-height', '0');
            } else if (element.is('div')) {
                // set the style to background-size: cover; 
                element.css('background-size', 'cover');
                element.css('background-position', 'center');
            }
        }
    }

    $('img.lazy, div.lazy:not(.always-load)').Lazy({visibleOnly: true, ...lazyLoadOptions});
    $('div.lazy.always-load').Lazy({visibleOnly: false, ...lazyLoadOptions});

    $('[data-toggle="tooltip"]').tooltip()

    var $grid = $('.grid').masonry({
        "percentPosition": true,
        "itemSelector": ".grid-item",
        "columnWidth": ".grid-sizer"
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });

    $(".lazy").on("load", function () {
        $grid.masonry('layout');
    });
})

document.addEventListener("DOMContentLoaded", function () {
    var themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    var themeIcon = themeToggle.querySelector("i");

    function applyTheme(theme, persist) {
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            themeToggle.setAttribute("aria-label", "Switch to light mode");
            themeToggle.setAttribute("title", "Switch to light mode");
        } else {
            document.documentElement.removeAttribute("data-theme");
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            themeToggle.setAttribute("aria-label", "Switch to dark mode");
            themeToggle.setAttribute("title", "Switch to dark mode");
        }

        if (persist) {
            try {
                localStorage.setItem("academic-homepage-theme", theme);
            } catch (error) {
                // The current page theme still changes when storage is unavailable.
            }
        }
    }

    var savedTheme = null;
    try {
        savedTheme = localStorage.getItem("academic-homepage-theme");
    } catch (error) {
        savedTheme = null;
    }
    applyTheme(savedTheme === "dark" ? "dark" : "light", false);

    themeToggle.addEventListener("click", function () {
        var isDark = document.documentElement.getAttribute("data-theme") === "dark";
        applyTheme(isDark ? "light" : "dark", true);
    });
});
