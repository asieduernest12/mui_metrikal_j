This office deliverable is based/built on the previous graph task and involves the use of Coordinated Multiple Views and Web storage. The GUI consist of a menu bar and three GUI components, Editor, BarChart and another visualization of your choice besides the BarChart. For example, you could implement a ScatterPlot or PieChart component that provides another view of the same data. It should also immediately and correctly reflect updates/changes to data in real time, just like the BarChart. Please refer to the BarChart expectations for this additional view component, it should pretty much be the same. Examples of 2 additional views one could implement are attached, so long as it accurately presents the up-to-date data. 

The Editor component allows the user to edit data to be displayed in the Chart component. The changes in the Editor component are immediately reflected in the BarChart components. The user can add, modify and delete data points. The menubar includes a title and a File menu:

File menu (e..g, supported using the Web Storage API https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API ):
- Load
- Save
- Save As
Any change of data is immediately reflected in the BarChart component. This includes changes to the title and any datapoints (x or y values.) Additionally, any points added or removed should be updated in the BarChart.

Overall specs/tips:
- Develop a React application using MUI library.
- Use Chrome browser for viewing.
- The file format is JSON. An example file is population.json.
- Header: use a MUI AppBar for the header bar, a MUI Menu with MenuItems for the Save & Load Menu, and use Typography for the title.
- Editor: use MUI TextField, in displaying the data table see MUI Table, TableHead, TableBody, TableRow, TableCell and the axes (e.g., year, population) will be displayed as read only above the
datapoints. Provides the ability to add and remove datapoints: Adding - add a button to append data point to the end. Removing - add a trash/x icon next to a row, click to delete
- BarChart/Other visualizations: Dynamic axes (donâ€™t hardcode year/population), implement update lifecycle phase for SVG elements.
- Create your 3 components (you already have BarChart, you need
Editor and Header) - start with a static layout (header 100% width, editor/barchart/third visualization 50% width)
- Use population.json for debugging, implement it as a state in the App component and send as prop to child components.
- Load: Load a dataset via localStorage. Have the user prompted to select filenames (e.g., population.json) that are in local storage. No text entry!
- Save as: Save the current datasetâ€™s state to localStorage. Prompt the user to enter a fileName to save it as. Overwrite the fileName field in the dataset, and store the dataset to localStorage. You can overwrite a dataset with the same name
- Save: Save as, but no prompts. Just update the current dataset in
localStorage
- Your App should initially load in the following 2 datasets to local storage, and initialize with population.json:
population.json

{

    "fileName": "population.json",

    "axes": {

      "x": "year", 

      "y": "population"

    },

    "title": "World population",

    "data": [

      { "year": "1950", "population": 2.525 },

      { "year": "1960", "population": 3.018 },

      { "year": "1970", "population": 3.682 },

      { "year": "1980", "population": 4.440 },

      { "year": "1990", "population": 5.310 },

      { "year": "2000", "population": 6.127 },

      { "year": "2010", "population": 6.930 }

    ]

  }
grades.json

{

    "title":"Grade Distribution",

    "fileName":"grades.json",

    "axes":{

        "x":"grade",

        "y":"count"

    },

    "data":[

        {"grade":"A","count":5},

        {"grade":"A-","count":10},

        {"grade":"B+","count":12},

        {"grade":"B","count":23},

        {"grade":"B-","count":7},

        {"grade":"C+","count":9},

        {"grade":"C","count":16},

        {"grade":"C","count":3},

        {"grade":"D+","count":8},

        {"grade":"D","count":11},

        {"grade":"D-","count":13},

        {"grade":"F","count":2}

    ]

}

Your final upload to the department folder must contain ONLY the following files:

public/index.html: HTML5 source code from React project public folder
src/App.js: App component JavaScript source code from React project src folder
src/App.css: App component CSS source code from React project src folder
src/Editor.js: Editor component JavaScript source code from React project src folder
src/Editor.css: Editor component CSS source code from React project src folder
src/BarChart.js: BarChart component JavaScript source code from React project src folder
src/BarChart.css: BarChart component CSS source code from React project src folder
src/Header.js: Header component JavaScript source code from React project src folder
src/Header.css: Header component CSS source code from React project src folder
Additional .js and .css files in the src/ directory for additionally created React components/visualizations