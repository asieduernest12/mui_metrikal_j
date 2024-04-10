This office deliverable is based/built on the previous graph task and involves the use of Coordinated Multiple Views and Web storage. The GUI consist of a menu bar and three GUI components, Editor, BarChart and another visualization of your choice besides the BarChart. For example, you could implement a ScatterPlot or PieChart component that provides another view of the same data. It should also immediately and correctly reflect updates/changes to data in real time, just like the BarChart. Please refer to the BarChart expectations for this additional view component, it should pretty much be the same. Examples of 2 additional views one could implement are attached, so long as it accurately presents the up-to-date data. 

The Editor component allows the user to edit data to be displayed in the Chart component. The changes in the Editor component are immediately reflected in the BarChart components. The user can add, modify and delete data points. The menubar includes a title and a File menu:

File menu (e..g, supported using the Web Storage API https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API ):
- Load
- Save
- Save **As**
Any change of data is immediately reflected in the BarChart component. This includes changes to the title and any datapoints (x or y values.) Additionally, any points added or removed should be updated in the BarChart.

Overall specs/tips:
-x Develop a React application using MUI library.
-x Use Chrome browser for viewing.
-x The file format is JSON. An example file is population.json.
-x Header: use a MUI AppBar for the header bar, a MUI Menu with MenuItems for the Save & Load Menu, and use Typography for the title.
-x Editor: use MUI TextField, in displaying the data table see MUI Table, TableHead, TableBody, TableRow, TableCell and the axes (e.g., year, population) will be displayed as read only above the
datapoints. Provides the ability to add and remove datapoints: Adding - add a button to append data point to the end. Removing - add a trash/x icon next to a row, click to delete
- BarChart/Other visualizations: Dynamic axes (donâ€™t hardcode year/population), implement update lifecycle phase for SVG elements.
- Create your 3 components (you already have BarChart, you need
Editor and Header) - start with a static layout (header 100% width, editor/barchart/third visualization 50% width)
-x Use population.json for debugging, implement it as a state in the App component and send as prop to child components.
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






............................


Starting with this dataset, dynamically loaded into your application in a json file (population.json), directly into .js file, or however you decide to load the set. An App.js file should also be used for this project.
{
    "title": "World Population",
    "data": [
        { "year" : "1950", "population" : 2.525 },

        { "year" : "1960", "population" : 3.018 },

        { "year" : "1970", "population" : 3.682 },

        { "year" : "1980", "population" : 4.440 },

        { "year" : "1990", "population" : 5.310 },

        { "year" : "2000", "population" : 6.127 },

        { "year" : "2010", "population" : 6.930 }
      ]
}

You should create a component called BarChart that creates the attached graphic. The BarChart should take the dataset as a prop. To make it clear, name the prop used for the dataset "dataset" for testing. The dataset will include title and data attributes. The data attribute is an array of data points. Each data point has 2 properties: year (string) and population (number.)

As you can see, the attached graphic has relatively sized bars. This is done by finding the maximum population size and using that as the maximal height. You should also use steps of 0.5 to provide visual aid for finding the value of a particular bar. You must also draw the lines. 

You will be supplied with a template code to start with for the D3/SVG BarChart component, with some functions and setup configurations/To Dos. However, you will need to implement the WebGL canvas (though you can use elements from the D3/SVG BarChart.) Attached will also be an HTML file of a similar WebGL component. 
**Make sure you include the shaders in the WebGL demo file. Copy them to the index.html file in the public folder in the React project.

Graphic should contain all of the following elements:

- Bars (representing data points (populations))
- Labels (representing the data labels (year))
- Lines, as described above, depicting values in a step of 0.5. You don't need the ticks above the labels.
- Associated values (numbers) of the lines described above. 
- A title (the title of the dataset)

Deliverables: BarChartSVG.js and BarChartWebGL.js
BarChartSVG.js: The goal is to create a BarChart component using only React D3 and SVG.
The svg element should cover the whole page.
All the elements described above should be implemented with D3 and SVG

BarChartWebGL.js: The goal is to create a BarChart React component using WebGL, D3 and SVG.
The canvas element should cover the whole component (full width.)
The canvas should only be used to render the bars and lines. Keep in mind the render order.
The same D3/SVG can be used from the D3/SVG for the title, labels, and values. 


Layout:
- Title
- Grid Lines
- Bars (exist, colors)
- Labels
Styling:
- Font family for everything is Arial
- Bars are colored "dodgerblue"
- Lines are silver, stroke width is 0.1pt
- Values and labels are grey, font size is 1pt
- Title is black, font size is 3pt
- Both the SVG and WebGL should take up 100% of the component/screen width
Data representation:
- Correct bar size/height
- Correct Number of bars
Axes representation:
- Correctly labeled (X and Y)
- Correctly scaled (dynamically, based on data, up to max with event steps)