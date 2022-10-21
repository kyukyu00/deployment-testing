"use strict";

const URL = 'https://teachablemachine.withgoogle.com/models/caXe1yJv9/';
let model, maxPredictions, 
resultTitle, resultExplain, resultComment,
title, explain, comm;

//function init() initializes the image model 
async function init() {

  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses(); //number of classes trained 
}

//function predict() predicts matching image result up to # of maxPredictions
async function predict() {
  let image = document.getElementById('face-image');
  const prediction = await model.predict(image, false);
  console.log(prediction);

  //The following code sorts objects from highest probability to lowest
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sorting_array_of_objects
  prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
  console.log(prediction[0].className);

  switch (prediction[0].className) {  
    case 'oval':
        resultTitle = parseInt(prediction[0].probability.toFixed(2) * 100) + '% OVAL FACE';
        resultExplain = '<div>Your have an oval face shape</div>';
        resultComment = 'Oval face is blah blah ....';
        break;

    case 'round':
      resultTitle = parseInt(prediction[0].probability.toFixed(2) * 100) + '% ROUND FACE';
      resultExplain = '<div>Your have a round face shape</div>';
      resultComment = 'Round face is blah blah ....';
      break;

    case 'long':
      resultTitle = parseInt(prediction[0].probability.toFixed(2) * 100) + '% LONG FACE';
      resultExplain = '<div>Your have a long face shape</div>';
      resultComment = 'Long face is blah blah ....';
      break;
  
    case 'square':
      resultTitle = parseInt(prediction[0].probability.toFixed(2) * 100) + '% SQUARE FACE';
      resultExplain = '<div>Your have a square face shape</div>';
      resultComment = 'Square face is blah blah ....';
      break;  
  
    case 'triangle':
      resultTitle = parseInt(prediction[0].probability.toFixed(2) * 100) + '% TRIANGLE FACE';
      resultExplain = '<div>Your have a triangle face shape</div>';
      resultComment = '(Inverted) Triangle face is blah blah ....';
      break; 
      
    default:
      resultTitle = '🤔unknown🤔 Please try again';
      resultExplain = '';
      resultComment = '';
  }

  //prepare the final result in text
  title ="<div class='" + prediction[0].className + "-result-title'>" + resultTitle + '</div>';
  explain = "<div class='result-explain pt-2'>" + resultExplain + '</div>';
  comm ="<div class='" + prediction[0].className + "-result-comment pt-2 pb-2'>" + resultComment + '</div>';
  $('.result-message1').html(title);

  //google chart
  google.load('visualization', '1', { packages: ['corechart'] });
  google.setOnLoadCallback(initChart);
  
  // $(window).resize(function(){
  //   initChart();
  // });

  function initChart() {
 
    var data, options;
    data = google.visualization.arrayToDataTable([
        ['MostMatch', 'Percentages'],
        [prediction[0].className, parseFloat(prediction[0].probability.toFixed(2) * 100)],
        [prediction[1].className, parseFloat(prediction[1].probability.toFixed(2) * 100)],
        [prediction[2].className, parseFloat(prediction[2].probability.toFixed(2) * 100)],
        [prediction[3].className, parseFloat(prediction[3].probability.toFixed(2) * 100)],
        [prediction[4].className, parseFloat(prediction[4].probability.toFixed(2) * 100)],
    ]);
  
    options = {
        is3D: true,  
        width: '100%',
        height: '100%',
        colors: ['#0598d8', '#f97263', '#ffc900', '#adaeae', '#c3dff5'], 
        backgroundColor: '#f9f9f9',
        chartArea: {
            left: '25%',
            top: '5%',
            height: '90%',
            width: '95%',
        },
    };
    
    drawChart(data, options);
  }

  async function drawChart(data, options) {
			
    let chart = await new google.visualization.PieChart(document.getElementById('chart_container'));
    chart.draw(data, options); 
    document.getElementById('chart_body').style.display = 'block';    
  }
  
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  sleep(1500).then(() => {
    $('.result-message2').html(explain + comm);
  });
  
  sleep(2000).then(() => {
      document.getElementById('itw').style.display = 'block';
  });

}



