require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
  console.log(err);
});