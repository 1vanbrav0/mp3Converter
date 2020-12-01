 function nav_ready(){ //navigation functions
  document.getElementById("button_toggle_menu").addEventListener("click", function(){
    document.getElementById("container_nav").classList.toggle("container_nav_active");
    document.getElementsByTagName("header")[0].classList.add("active-content-transition");
    document.getElementsByTagName("main")[0].classList.add("active-content-transition");
    document.getElementsByTagName("footer")[0].classList.add("active-content-transition");
    document.getElementById("background_effect_menu").classList.add("background_menu_active");
  });

  document.getElementById("button_close_menu").addEventListener("click", function(){
    document.getElementById("container_languages_list").classList.remove("lang_active");
    document.getElementById("container_nav").classList.toggle("container_nav_active");
    document.getElementsByTagName("header")[0].classList.remove("active-content-transition");
    document.getElementsByTagName("main")[0].classList.remove("active-content-transition");
    document.getElementsByTagName("footer")[0].classList.remove("active-content-transition");
    document.getElementById("background_effect_menu").classList.remove("background_menu_active");
  });

  document.getElementById("lang_es").addEventListener("click", function(){
    window.location.href = "/es";
  });

  document.getElementById("lang_en").addEventListener("click", function(){
    window.location.href = "/en";
  });

  document.getElementById("lang_pt").addEventListener("click", function(){
    window.location.href = "/pt";
  });

  document.getElementById("nav_container_languages_drop_down").addEventListener("click", function(){
    document.getElementById("container_languages_list").classList.toggle("lang_active");
  });
}