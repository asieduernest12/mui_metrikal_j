import './BarChartSVG.css';
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

            // -- Create the group wrappers

            // Lines
            svgRef.current
                .append("g")
                .attr("id", "lines");
            // Title
            svgRef.current
                .append("g")
                .attr("id", "title");
            // Bars
            svgRef.current
                .append("g")
                .attr("id", "bars");
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
        const getBarHeight = item => (item.population - config.data.min) * config.bars.height / dataRange;

        const getLabelX = index => config.labels.x + (1 - config.bars.ratio + index + config.bars.ratio / 2) * config.bars.width / (data.length + 1 - config.bars.ratio);
        const getLabelY = () => config.labels.y + config.labels.height - config.labels.baseline;

        const getValuesX = () => config.values.x + config.values.width / 2;
        const getValuesY = index => config.values.y + config.values.height - config.values.baseline - index * config.bars.height / lineCount;
        // -- Painting
        // We need to paint all of our groups
        // E.g., lines, titles, bars
    
        svgRef.current.select("#lines")
            .selectAll("line")
            .data(d3.range(lineCount))
            .join(
                enter => {
                    enter
                        .append("line")
                        .attr("x1", getLineX1Value())
                        .attr("x2", getLineX2Value())
                        .attr("y1", (item, index) => getLineYValue(index))
                        .attr("y2", (item, index) => getLineYValue(index))

                },
                update =>{
                    update
                        .attr("x1", getLineX1Value())
                        .attr("x2", getLineX2Value())
                        .attr("y1", (item, index) => getLineYValue(index))
                        .attr("y2", (item, index) => getLineYValue(index))
                },
                exit => exit.remove()
            );

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

        svgRef.current.select("#bars")
            .selectAll("rect")
            .data(data)
            .join(
                enter => {
                    enter
                        .append("rect")
                        .attr("x", (item , index) => getBarXValue(index))
                        .attr("y", (item , index) => getBarYValue(item))
                        .attr("width", getBarWidth())
                        .attr("height", (item, index) => getBarHeight(item))                    
                },
                update=> {
                    update
                        .transition(1000)
                        .attr("x", (item , index) => getBarXValue(index))
                        .attr("y", (item , index) => getBarYValue(item))
                        .attr("width", getBarWidth())
                        .attr("height", (item, index) => getBarHeight(item))    
                },
                exit => exit.remove()
            );

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
        <div ref={containerRef} width="100%" height="100%" />
    );

}

export default BarChart;
