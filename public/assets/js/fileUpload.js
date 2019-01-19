function fileUpload(imgFrame, imgInput) {
  $(imgInput).on("change", e => {
    let file = e.target.files[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    // Display file URL only
    fileReader.onload = e => {
      // $(imgFrame).css("background-image", `url(${e.target.result})`);
      $(imgFrame).attr("src", e.target.result);
    };
    // Display file Properties
  });
}

// Add Snapshot1
fileUpload("#app_snapshot1_img", "#app_snapshot1");

// Add Snapshot2
fileUpload("#app_snapshot2_img", "#app_snapshot2");

// Add Snapshot3
fileUpload("#app_snapshot3_img", "#app_snapshot3");

// Add Snapshot4
fileUpload("#app_snapshot4_img", "#app_snapshot4");

// App Icon
fileUpload("#app_icon_img", "#app_icon");

// Add Promo Graphic
fileUpload("#app_promo_img", "#app_promo");
