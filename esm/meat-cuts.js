require('./jquery.js');

import * as echarts from 'echarts';

function initGo(myData, sliceId, firstColor, secondColor, thirdColor, titleName, titleText) {
  let myDiagram;
  var dom = document.getElementById("myDiagramDiv" + sliceId);
  echarts.dispose(dom);
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};
  var ROOT_PATH = '';
  var option;
  let path;

  if (!is_one_category(myData)) {
    path = '/static/assets/images/meat-cut/theend.svg';
  } else {
    path = get_image_path(myData); //'/static/assets/images/meat-cut/Beef_cuts_France.svg';
  }

  console.log('path', path);
  let nodeDataArray = getNodeDataArray(myData); //console.log('myData', myData);

  let maxval = Math.max(...myData.map(o => o.value));
  let minval = Math.min(...myData.map(o => o.value));

  if (minval == maxval) {
    minval = 0;
  }

  $.get(ROOT_PATH + path, function (svg) {
    echarts.registerMap('Beef_cuts_France', {
      svg: svg
    });
    option = {
      tooltip: {},
      visualMap: {
        left: 'center',
        bottom: '10%',
        min: minval,
        max: maxval,
        orient: 'horizontal',
        text: titleText.split(","),
        realtime: true,
        calculable: true,
        inRange: {
          color: [firstColor, secondColor, thirdColor]
        }
      },
      series: [{
        name: titleName,
        type: 'map',
        map: 'Beef_cuts_France',
        roam: true,
        emphasis: {
          label: {
            show: false
          }
        },
        selectedMode: false,
        data: nodeDataArray
      }]
    };
    myChart.setOption(option);
  });

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
  return myDiagram;
}

function getNodeDataArray(myData) {
  let nodeDataArray = [];
  let tempNodeObj;

  for (var key in myData) {
    tempNodeObj = new Object();
    tempNodeObj.name = myData[key].name;
    tempNodeObj.value = myData[key].value;
    tempNodeObj.id = myData[key].id; //Object.keys(myData[key])[0]
    //Object.values(myData[key])[0]

    nodeDataArray.push(tempNodeObj);
  }

  return nodeDataArray;
}

function check_count_category(myData) {
  console.log(myData.filter((item, pos, self) => self.findIndex(v => v.category === item.category) === pos));
}

function setSize(width, height, sliceId) {
  var myDiagramDiv = document.getElementById('myDiagramDiv' + sliceId);
  myDiagramDiv.style.width = width - 60 + 'px';
  myDiagramDiv.style.height = height - 70 + 'px';
}

function updateChart(myData, sliceId, firstColor, secondColor, thirdColor, titleName, titleText) {
  //let nodeDataArray = getNodeDataArray(myData);
  //myDiagramTest.model = new go.GraphLinksModel(nodeDataArray, linkDataArray); // Construct a model.
  myDiagramTest[sliceId] = initGo(myData, sliceId, firstColor, secondColor, thirdColor, titleName, titleText);
}

let myDiagramTest = [];

function meat_cuts(data, firstColor, secondColor, thirdColor, titleName, titleText, width, height, sliceId) {
  if (!width && !height) {
    //		updateChart(data, myDiagramTest[sliceId], sliceId) ;
    updateChart(data, sliceId, firstColor, secondColor, thirdColor, titleName, titleText);
    return true;
  }

  setSize(width, height, sliceId);
  myDiagramTest[sliceId] = initGo(data, sliceId, firstColor, secondColor, thirdColor, titleName, titleText);
}

function is_one_category(myData) {
  var a = new Array();

  for (var key in myData) {
    a.push(myData[key].category);
  }

  if (array_unique(a).length == 1) {
    return true;
  }

  return false;
}

function array_unique(inArr) {
  var uniHash = {},
      outArr = [],
      i = inArr.length;

  while (i--) uniHash[inArr[i]] = i;

  for (i in uniHash) outArr.push(i);

  return outArr;
}

function get_image_path(myData) {
  for (var key in myData) {
    if (myData[key].img_url != '') {
      return myData[key].img_url;
    }
  }

  return false;
}

export { meat_cuts };