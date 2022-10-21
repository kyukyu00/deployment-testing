$(document).ready(function () {
  //change active link on click dynamically
  $(".navbar-nav a").on("click", function(){
    $(".navbar-nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });  
});

function readURL(input) {

  if (input.files && input.files[0]) {

    //declare and init reader
    let reader = new FileReader();
    
    reader.onload = function (e) {
			$('.image-upload-wrap').hide();
			$('#loading').show(); 
			$('.file-upload-content').show();
			$('.file-upload-image').attr('src', e.target.result);

      // The following code is not in use.
      // However, you can show the image name 
      // by creating an element in your html file
      $('.image-title').html(input.files[0].name); 
    };
    reader.readAsDataURL(input.files[0]);
    
    //call init() and then predict() in result.js
    init().then(function () {
      console.log('hello');
      predict();
      $('#loading').hide();
    });
  } 
}


/** 
File upload input
Copyright (c) 2022 by Aaron Vanston (https://codepen.io/aaronvanston/pen/yNYOXR)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/