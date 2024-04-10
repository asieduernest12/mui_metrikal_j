import './BarChartWebGL.css';
import React from 'react';
import * as d3 from 'd3';

const config = {

    svg: {
        viewBox: "0 0 100 100"
    },
    title: {
        x: 0,
        y: 0,
        width: 100,
        height: 10,
        baseline: 5
    },
    labels: {
        x: 5,
        y: 95,
        width: 95,
        height: 5,
        baseline: 2,
        length: 0.5
    },
    values: {
        x: 0,
        y: 10,
        width: 5,
        height: 90,
        baseline: 4.5
    },
    lines: {
        margin: 1.5
    },
    bars: {
        x: 5,
        y: 10,
        width: 95,
        height: 85,
        ratio: 0.7
    },
    data: {
        min: 0,
        max: 7,
        step: 0.5
    }
};

function BarChart (props) {

    const containerRef = React.useRef();
    const svgRef = React.useRef();
    const canvasRef = React.useRef();

    const title = props.dataset.title;
    const data = props.dataset.data;

    React.useEffect(() => {

        if (svgRef.current === undefined)
        {   
            svgRef.current = 
                d3.select(containerRef.current)
                .append("svg")
                .attr("viewBox", config.svg.viewBox)
                .attr("preserveAspectRatio", "none")
                .style("border", "none");

            // Set the height of the canvas element
            d3.select(canvasRef.current)
                .attr("height", 1000)
                .attr("width", 1000)

            // -- Create the group wrappers

            // Title
            svgRef.current
                .append("g")
                .attr("id", "title");
            // Labels
            svgRef.current
                .append("g")
                .attr("id", "labels");
            // Values
            svgRef.current
                .append("g")
                .attr("id", "values");
        }

        // Helper functions and variables

        const max = Math.max(...data.map(d=>Math.ceil(d.population)));
        const dataRange = max - config.data.min;
        const lineCount = dataRange / config.data.step;

        const getLineX1Value = () => config.values.x + config.values.width;
        const getLineX2Value = () => config.values.x + config.values.width + config.bars.width - config.lines.margin;
        const getLineYValue = index => config.labels.y - index * config.bars.height / lineCount;

        const getTitleXValue = () => (config.title.x + config.title.width) / 2;
        const getTitleYValue = () => config.title.y + config.title.height - config.title.baseline;

        const getBarXValue = index => config.bars.x + (1 - config.bars.ratio + index) * config.bars.width / (data.length + 1 - config.bars.ratio);
        const getBarYValue = item => config.labels.y - (item.population - config.data.min) * config.bars.height / dataRange;
        const getBarWidth = () => config.bars.ratio * config.bars.width / (data.length + 1 - config.bars.ratio);
        // const getBarHeight = item => (Object.values(item)[1] - config.data.min) * config.bars.height / dataRange;

        const getLabelX = index => config.labels.x + (1 - config.bars.ratio + index + config.bars.ratio / 2) * config.bars.width / (data.length + 1 - config.bars.ratio);
        const getLabelY = () => config.labels.y + config.labels.height - config.labels.baseline;

        const getValuesX = () => config.values.x + config.values.width / 2;
        const getValuesY = index => config.values.y + config.values.height - config.values.baseline - index * config.bars.height / lineCount;

        function doWebGL()
        {
            // Create our canvas
            const canvasElement = canvasRef.current;
            // Get our canvas context
            const gl = canvasElement.getContext("webgl2") || canvasElement.getContext("webgl");

            // Note shaders in <head> of HTML doc

            // Other variables
            let barVerticesBuffer;
            let shaderProgram;
            let vertexPositionAttribute;
            let transform;
            let color;

            // -- Complete the following tasks in order
            // 1. Clear the background
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            // 2. Load and initialize the shaders
            initShaders();
            // 3. Set up frame buffers
            initBuffers();
            // 4. Draw/display/paint
            display();

            // -- Function implementations

            /*
            *  Initialize the GL buffer with vertex data
            */
            function initBuffers() {
                barVerticesBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, barVerticesBuffer);
                let barData = new Array(data.length * 8);
                let lineData = new Array(d3.range(lineCount).length * 4);

                // Draw bars
                let currentPoint = 0;
                for (const point of d3.range(lineCount)) {

                    const x1Coordinate = getLineX1Value();
                    const x2Coordinate = getLineX2Value();
                    const yCoordinate = getLineYValue(point);

                    lineData[4 * currentPoint + 0] = x1Coordinate;
                    lineData[4 * currentPoint + 1] = yCoordinate;
                    lineData[4 * currentPoint + 2] = x2Coordinate;
                    lineData[4 * currentPoint + 3] = yCoordinate;

                    currentPoint++;
                }
                

                // Draw Lines
                currentPoint = 0;
                for (const point of data) {

                    // Coordinates
                    // const xCoordinate = (currentPoint * 2 * barWidth);
                    // const yCoordinate = (100 - (point.population * 10)); // At the bottom of SVG
                    const xCoordinate = getBarXValue(currentPoint);
                    const yCoordinate = getBarYValue(point);
                    const barWidth = getBarWidth();

                    // Manually assign each vertex in SVG-esque coordinate system
                    // [(0,0), (width,height)] in TRIANGLE_FAN format
                    // See here for TRIANGLE_FAN: https://www.khronos.org/opengl/wiki/Primitive
                    barData[8 * currentPoint + 0] = xCoordinate;
                    barData[8 * currentPoint + 1] = yCoordinate;
                    barData[8 * currentPoint + 2] = xCoordinate;
                    barData[8 * currentPoint + 3] = config.labels.y;
                    barData[8 * currentPoint + 4] = xCoordinate + barWidth;
                    barData[8 * currentPoint + 5] = config.labels.y;
                    barData[8 * currentPoint + 6] = xCoordinate + barWidth;
                    barData[8 * currentPoint + 7] = yCoordinate;

                    currentPoint++;
                }

                let vertices = new Float32Array(lineData.concat(barData));
                gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
                gl.vertexAttribPointer(vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
            }

            // Display function
            function display() {
                // Clear the frame buffer (if change, none in this example)
                gl.clear(gl.COLOR_BUFFER_BIT);

                // WebGL Setup
                vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertexPosition");
                gl.enableVertexAttribArray(vertexPositionAttribute);
                transform = gl.getUniformLocation(shaderProgram, "transform");
                color = gl.getUniformLocation(shaderProgram, "color");

                // Transform from [(0,0), (width,height)] to [(-1,-1), (1,1)]
                gl.uniformMatrix4fv(transform, false, new Float32Array([
                    0.02,  0.00, 0.0, 0.0,
                    0.00,  -0.02, 0.0, 0.0,
                    0.00,  0.00, 1.0, 0.0,
                    -1.0,  1.00, 0.0, 1.0]));

                // Set the color of the thing you want to draw (RGBA)
                gl.uniform4f(color,  192/255, 192/255, 192/255, 1.0);
                // Draw vertices from the buffer as triangle fans
                for (let i = 0; i < d3.range(lineCount).length; i++) {
                    gl.drawArrays(gl.LINES, 2 * i, 2 );
                }

                // Set the color of the thing you want to draw (RGBA)
                gl.uniform4f(color,  30/255, 144/255, 255/255, 1.0);
                // Draw vertices from the buffer as triangle fans
                for (let i = 0; i < data.length; i++) {
                    gl.drawArrays(gl.TRIANGLE_FAN, 2 * lineCount + 4 * i, 4 );
                }
            }

            /*
            * DO NOT MODIFY
            * Utility function that can be used for any WebGL program.
            */
            function initShaders() {
                let fragmentShader = getShader(gl, "fragment-shader");
                let vertexShader = getShader(gl, "vertex-shader");
                shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, vertexShader);
                gl.attachShader(shaderProgram, fragmentShader);
                gl.linkProgram(shaderProgram);
                if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                    alert("Unable to initialize the shader program.");
                }
                gl.useProgram(shaderProgram);
            }

            /*
            * DO NOT MODIFY
            * Utility function that can be used for any WebGL program.
            */
            function getShader(gl, id) {
                let shaderScript = document.getElementById(id);
                if (!shaderScript) {
                    return null;
                }
                let theSource = "";
                let currentChild = shaderScript.firstChild;
                while(currentChild) {
                    if (currentChild.nodeType === 3) {
                        theSource += currentChild.textContent;
                    }
                    currentChild = currentChild.nextSibling;
                }
                let shader;
                if (shaderScript.type === "x-shader/x-fragment") {
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                } else if (shaderScript.type === "x-shader/x-vertex") {
                    shader = gl.createShader(gl.VERTEX_SHADER);
                } else {
                    return null;
                }
                gl.shaderSource(shader, theSource);
                gl.compileShader(shader);
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
                    return null;
                }
                return shader;
            }
        }

        // -- Painting
        // We need to paint all of our groups
        // E.g., lines, titles, bars

        svgRef.current.select("#title")
            .selectAll("text")
            .data([title])
            .join(
                enter => {
                    enter
                        .append("text")
                        .attr("x", getTitleXValue())
                        .attr("y", getTitleYValue())
                        .text(title);
                },
                update=>update.text(title),
                exit => exit.remove()
            )

        doWebGL();

        svgRef.current.select("#labels")
                .selectAll("text")
                .data(data)
                .join(
                    enter => {
                        enter
                        .append('text')
                        .attr('x', (item , index) => getLabelX(index))
                        .attr('y', getLabelY())
                        .text((item, index) => {
                            return item.year;
                        });

                    },
                    update => {
                        update
                            .transition(1000)
                            .attr('x', (item , index) => getLabelX(index))
                            .attr('y', getLabelY())
                            .text((item, index) => {
                                return item.year;
                            });
                    },
                    exit => exit.remove()
                )

        svgRef.current.select("#values")
            .selectAll("text")
            .data(d3.range(lineCount))
            .join(
                enter => {
                    enter
                    .append("text")
                    .attr("x", (item, index) => getValuesX())
                    .attr("y", (item, index) => getValuesY(index))
                    .text((item, index) => {
                        return (config.data.min + item * config.data.step).toFixed(1);
                    });

                },
                update=>{
                    update
                        .transition(1000)
                        .attr("y", (item, index) => getValuesY(index))
                        .text((item, index) => {
                            return (config.data.min + item * config.data.step).toFixed(1);
                        });
                },
                exit => exit.remove()
            );
        
    }, [svgRef, containerRef, data, title]);

    return(
        <div ref={containerRef} width="100%" height="100%">
            <canvas ref={canvasRef}></canvas>
        </div>
    );

}

export default BarChart;
