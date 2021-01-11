const express = require("express");
const router = express.Router();
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const contentDisposition = require("content-disposition");

//Constants to try avoid be blocked
const video_cookie =
  "YSC=hl5h7w5lbuY; VISITOR_INFO1_LIVE=sIkJ7yPp_ig; PREF=f4=4000000; SID=2wfT171lINBu3nkYWXNjn9v8n34fX6MwUlBI1krX5liYi2lzaOZesy82q86cMwI0n-2HwQ.; __Secure-3PSID=2wfT171lINBu3nkYWXNjn9v8n34fX6MwUlBI1krX5liYi2lzPJWMjc2N9cfmlrXAz0zMHA.; HSID=AcyQH2lwio5ml9UTp; SSID=A8SwA8MGwohNqzBBu; APISID=YxwE7bHAl4vVUvL_/AWPwxxNA7W8frFTnb; SAPISID=_n8Txt95OhnLMHnt/AO-sztkFV-ZfRng-w; __Secure-3PAPISID=_n8Txt95OhnLMHnt/AO-sztkFV-ZfRng-w; CONSENT=YES+MX.es-419+20171029-08-0; LOGIN_INFO=AFmmF2swRAIgRaPTUimBPu1Gee9YQ8p0hD_8h9zFxWfhQv1PRhf63U0CICzQWSljSoyWCjn9JM1j1hUGxe372RrIbmPFqo_QJvv5:QUQ3MjNmd0JMWkRaRDVlNHNUdkI3YmpMZzhZUnBwOUxWb0pGSVlfbDJWUEotX21lbnM5bWtzc2VqbXBUNmVFVnpQd2tIVWE2UFNxSUtVRlpQR2tCUy1EMW85VHNENDFZNUdMMXN3VGY3enNGV3RxMWFlOGFMT1dNaWJSSlhwcmRlaHg3cDNaYUdBcFA0WHpTQnhJYmZMZDdXRkxUbUllV3N1aXZmdHB6c1Q3aTI4MG9GOExRNE8w; SIDCC=AJi4QfHOpapkk3_f7baxSHxptGuW6EXymZF9G33-TMQRGUrCISVByRIuF57vv1HGVvXjtDZzN9E; __Secure-3PSIDCC=AJi4QfE5M4tom0WPkOuLoe01rp3XK6hqFW7e97cF2DcCvmsVneAAu-KlP9Ng4u1pVjmAVVbgLws";
const youtube_id_token = "QUFFLUhqa3Y2X0x5M3NqaDdXRGp4dTBMNkpZcTY1N0lzQXw=";

//Routes of languages
router.get("/es", (req, res) => {
  res.cookie("locale", "es", {
    maxAge: 900000,
    httpOnly: true,
  });
  res.redirect("back");
});

router.get("/en", (req, res) => {
  res.cookie("locale", "en", {
    maxAge: 900000,
    httpOnly: true,
  });
  res.redirect("back");
});

router.get("/pt", (req, res) => {
  res.cookie("locale", "pt", {
    maxAge: 900000,
    httpOnly: true,
  });
  res.redirect("back");
});

//Route to render page
router.get("/", (req, res) => {
  res.render("pages/index");
});

//Function to validate url
let validate_link = (url) => {
  if (ytdl.validateURL(url)) {
    return true;
  } else {
    return false;
  }
};

//Function to get data of video
router.post("/data", (req, res) => {
  let link = req.body.video_link;
  if (validate_link(link)) {
    const video = ytdl(link, {
      requestOptions: {
        headers: {
          cookie: video_cookie,
          "x-youtube-identity-token": youtube_id_token,
        },
      },
    });
    video.on("info", (info) => {
      res.json({
        author: info.videoDetails.author,
        title: info.videoDetails.title,
        length: info.videoDetails.lengthSeconds,
        thumbnail: info.videoDetails.thumbnail,
      });
    });
    video.on("error", () => {
      res.json({
        Exception: "9LTTPPY96gA8WvCxjqqbda5DzkH837",
      }); // Video unavailable
    });
  } else {
    res.json({
      Exception: "VxdVGegV3eSeBiBmqGRLfM59XhF2fU",
    }); // Invalid link
  }
});

//Function to get mp3 of video, process it and return it to a client side download
router.get("/download", async (req, res) => {
  let link = req.query.video_link;
  let title = req.query.video_title;
  let stream = ytdl(link, {
    requestOptions: {
      quality: "highestaudio",
      headers: {
        cookie: video_cookie,
        "x-youtube-identity-token": youtube_id_token,
      },
    },
  });

  res.setHeader("Content-Type", "audio/mpeg");
  try {
    res.setHeader("Content-Disposition", contentDisposition(title + ".mp3"));
    ffmpeg(stream).audioBitrate(128).toFormat("mp3").pipe(res);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
