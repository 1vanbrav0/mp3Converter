// check if the dom is accessible
function doc_ready(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

//function that validate url in client side
function yt_link_validate(url) {
  var pattern = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(pattern)) {
    return true;
  } else {
    return false;
  }
}

//function that hide the unnecesary sections but not the necessary (in this case)
function search_transition() {
  var secciones = document.getElementsByTagName("section");
  for (var i = 0; i < secciones.length; i++) {
    secciones[i].style.display = "none";
  }
  document.getElementById("video_section").style.display = "flex";
}

//function of the progress bar of the video preview
function progress_bar() {
  var i = 0;
  move();

  function move() {
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("progress_bar");
      var width = 1;
      var id = setInterval(frame, 15);

      function frame() {
        if (width >= 100) {
          clearInterval(id);
          document.getElementById("progress_bar_video_container").style.display = "none";
          document.getElementById("buttons_video_container").style.display = "flex";
          i = 0;
        } else {
          width++;
          elem.style.width = width + '%';
        }
      }
    }
  }

}

//function to format the duration of the video
var minTwoDigits = function (n) {
  return (n < 10 ? '0' : '') + n;
}

// function that get the video data and display it in the video preview
function video_process() {
  try {
    var video_link = document.getElementById("search_video_input").value;
    var video_url_data_request = {
      'video_link': video_link
    };
    var data_request = new XMLHttpRequest();
    data_request.onload = function () {

      if ((JSON.parse(data_request.response)).Exception == "VxdVGegV3eSeBiBmqGRLfM59XhF2fU") { // invalid link
        document.getElementById("search_video_input").style.borderTopColor = "#e00000";
        document.getElementById("search_video_input").style.borderLeftColor = "#e00000";
        document.getElementById("search_video_input").style.borderBottomColor = "#e00000";
        document.getElementById("search_button").style.borderLeftColor = "#e00000";
        document.getElementById("layout_search_section_container").classList.add('error_search');
        setTimeout(function () {
          document.getElementById("layout_search_section_container").classList.remove('error_search');
        }, 300);
      } else if ((JSON.parse(data_request.response)).Exception == "9LTTPPY96gA8WvCxjqqbda5DzkH837") { // video unavailable
        document.getElementById("search_video_input").style.borderTopColor = "#e00000";
        document.getElementById("search_video_input").style.borderLeftColor = "#e00000";
        document.getElementById("search_video_input").style.borderBottomColor = "#e00000";
        document.getElementById("search_button").style.borderLeftColor = "#e00000";
        document.getElementById("search_button").disabled = false;
        document.getElementById("search_button").style.opacity = 1;
        document.getElementById("search_button").style.cursor = "pointer";
        document.getElementById("layout_search_section_container").classList.add('error_search');
        setTimeout(function () {
          document.getElementById("layout_search_section_container").classList.remove('error_search');
        }, 300);
      } else {
        var json_recieved = JSON.parse(data_request.response);
        document.getElementById("btn_download_audio_file").addEventListener("click", function () {
          var video_url_download_request = "download?video_link=" + video_link + "&video_title=" + json_recieved.title;
          download(video_url_download_request);
        });
        document.getElementById("title_video_preview").textContent = json_recieved.title;
        document.getElementById("duration_video_preview").textContent += " " + minTwoDigits(Math.floor(json_recieved.length / 60 / 60)) + ":" + minTwoDigits(Math.floor(json_recieved.length / 60) % 60) + ":" + minTwoDigits(json_recieved.length % 60);
        document.getElementById("title_video_preview").style.visibility = "visible";
        document.getElementById("duration_video_preview").style.visibility = "visible";
        search_transition();
        progress_bar();
        setTimeout(function () {
          try {
            document.getElementById("img_video_preview").setAttribute("src", json_recieved.thumbnail.thumbnails[4].url);
          } catch (error) {
            document.getElementById("img_video_preview").setAttribute("src", json_recieved.thumbnail.thumbnails[3].url);
          }
        }, 500);
      }
    };
    data_request.open('POST', '/data');
    data_request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    data_request.send(JSON.stringify(video_url_data_request));
  } catch (error) {
    alert(error);
  }
}

//function to send the download to client side
function download(url) {
  window.location.href = url;
}

doc_ready(function () {

  document.getElementById("video_section").style.display = "none"; //hide video section
  icons_load();
  nav_ready(); //navigation ready
  txt_duration_video_preview = document.getElementById("duration_video_preview").innerHTML;

  document.getElementById("search_button").addEventListener("click", function () { //client side validation
    var input = document.getElementById("search_video_input");
    if (input.value != "") {
      if (yt_link_validate(input.value)) {
        document.getElementById("search_button").disabled = true;
        document.getElementById("search_button").style.opacity = 0.7;
        document.getElementById("search_button").style.cursor = "initial";
        video_process();
      } else {
        document.getElementById("search_video_input").style.borderTopColor = "#e00000";
        document.getElementById("search_video_input").style.borderLeftColor = "#e00000";
        document.getElementById("search_video_input").style.borderBottomColor = "#e00000";
        document.getElementById("search_button").style.borderLeftColor = "#e00000";
        document.getElementById("layout_search_section_container").classList.add('error_search');
        setTimeout(function () {
          document.getElementById("layout_search_section_container").classList.remove('error_search');
        }, 300);
      }
    } else {
      input.style.borderTopColor = "#cdcdce";
      input.style.borderLeftColor = "#cdcdce";
      input.style.borderBottomColor = "#cdcdce";
      document.getElementById("search_button").style.borderLeftColor = "#cdcdce";
    }
  });

  document.getElementById("search_video_input").addEventListener("change", function () { // another client side validation
    var input = document.getElementById("search_video_input");
    if (input.value != "") {
      if (yt_link_validate(input.value)) {

      } else {
        document.getElementById("search_video_input").style.borderTopColor = "#e00000";
        document.getElementById("search_video_input").style.borderLeftColor = "#e00000";
        document.getElementById("search_video_input").style.borderBottomColor = "#e00000";
        document.getElementById("search_button").style.borderLeftColor = "#e00000";
        document.getElementById("layout_search_section_container").classList.add('error_search');
        setTimeout(function () {
          document.getElementById("layout_search_section_container").classList.remove('error_search');
        }, 300);
      }
    } else {
      input.style.borderTopColor = "#cdcdce";
      input.style.borderLeftColor = "#cdcdce";
      input.style.borderBottomColor = "#cdcdce";
      document.getElementById("search_button").style.borderLeftColor = "#cdcdce";
    }
  });

  document.getElementById("search_video_input").addEventListener("keyup", function () { // another client side validation
    var input = document.getElementById("search_video_input");
    if (input.value.length >= 43) {
      input.style.borderTopColor = "#cdcdce";
      input.style.borderLeftColor = "#cdcdce";
      input.style.borderBottomColor = "#cdcdce";
      document.getElementById("search_button").style.borderLeftColor = "#cdcdce";
    } else {
      input.style.borderTopColor = "#cdcdce";
      input.style.borderLeftColor = "#cdcdce";
      input.style.borderBottomColor = "#cdcdce";
      document.getElementById("search_button").style.borderLeftColor = "#cdcdce";
    }
  });

  document.getElementById("btn_home").addEventListener("click", function () { //reload page
    window.location.replace("/");
  });

  //function that check if recize window
  // window.addEventListener("resize", () => {});
});