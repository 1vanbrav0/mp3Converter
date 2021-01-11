function close_nav() {
  document.getElementById("container_nav").classList.toggle("container_nav_active");
  document.getElementsByTagName("header")[0].classList.remove("active-content-transition");
  document.getElementsByTagName("main")[0].classList.remove("active-content-transition");
  document.getElementsByTagName("footer")[0].classList.remove("active-content-transition");
  document.getElementById("background_effect_menu").classList.remove("background_menu_active");
}

function display_nav_languages_dropdown() {
  var el = document.getElementById("container_languages_list");
  el.classList.toggle("lang_active");
}

function nav_mobile_prevent() {
  document.getElementById("container_nav").addEventListener("touchmove",function (e) {e.preventDefault();},false);
  document.getElementById("background_effect_menu").addEventListener("touchmove",function (e) {e.preventDefault();},false);
}

function nav_ready() {
  //navigation functions
  nav_mobile_prevent();
  document.getElementById("button_toggle_menu").addEventListener("click", function () {
    document.getElementById("container_nav").classList.toggle("container_nav_active");
    document.getElementsByTagName("header")[0].classList.add("active-content-transition");
    document.getElementsByTagName("main")[0].classList.add("active-content-transition");
    document.getElementsByTagName("footer")[0].classList.add("active-content-transition");
    document.getElementById("background_effect_menu").classList.add("background_menu_active");
  });

  document.getElementById("button_close_menu").addEventListener("click", function () {
    if (document.getElementById("container_languages_list").classList.contains("lang_active")) {
      document.getElementById("container_languages_list").classList.remove("lang_active");
      setTimeout(function () {
        close_nav();
      }, 500);
    } else {
      close_nav();
    }
  });

  document.getElementById("lang_es").addEventListener("click", function () {
    window.location.href = "/es";
  });

  document.getElementById("lang_en").addEventListener("click", function () {
    window.location.href = "/en";
  });

  document.getElementById("lang_pt").addEventListener("click", function () {
    window.location.href = "/pt";
  });

  document.getElementById("nav_container_languages_drop_down").addEventListener("click", function () {
    display_nav_languages_dropdown();
  });
}
