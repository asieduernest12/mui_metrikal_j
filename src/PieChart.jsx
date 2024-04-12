import './BarChartSVG.css';
import React from 'react';
import * as d3 from 'd3';

const config = {
	svg: {
		viewBox: '0 0 100 100',
	},
	title: {
		x: 0,
		y: 0,
		width: 100,
		height: 10,
		baseline: 5,
	},
	labels: {
		x: 5,
		y: 95,
		width: 95,
		height: 5,
		baseline: 2,
		length: 0.5,
	},
	values: {
		x: 0,
		y: 10,
		width: 5,
		height: 90,
		baseline: 4.5,
	},
	lines: {
		margin: 1.5,
	},
	bars: {
		x: 5,
		y: 10,
		width: 95,
		height: 85,
		ratio: 0.7,
	},
	data: {
		min: 0,
		max: 7,
		step: 0.5,
	},
};

function PieChart(props) {
	const containerRef = React.useRef();
	const svgRef = React.useRef();

	const title = props.dataset.title;

	/** @type {[{year,population:number}]} */
	const data = props.dataset.data;

	React.useEffect(() => {
		const width = containerRef.current.clientWidth;
		const height = Math.min(width, containerRef.current.clientHeight);
		const radius = Math.min(width, height) / 2;

		if (!svgRef.current) {
			return;
		}
		svgRef.current = d3
			.select(containerRef.current)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('transform', `translate(${width / 2}, ${height / 2})`);

		// Specify the chart’s dimensions.
		const color = d3.scaleOrdinal(d3.schemeCategory10);

		/** @type {d3['selection']} */
		const svg = svgRef.current;

		const pie = d3.pie().value((d) => d.population);
		const arc = d3.arc().innerRadius(0).outerRadius(radius);

		const arcs = svg
			.selectAll('.arc')
			.data(pie(data))
			.enter()
			.append('g')
			.attr('class', 'arc')
			.attr('transform', `translate(${width / 2}, ${height / 2})`);

		arcs
			.append('path')
			.attr('d', arc)
			.attr('fill', (d, i) => color(i));

		arcs
			.append('text')
			.attr('transform', (d) => `translate(${arc.centroid(d)})`)
			.attr('text-anchor', 'middle')
			.text((d) => `${d.data.year}/${d.data.population}`);
	}, [svgRef, containerRef, data, title]);

	return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}

export default PieChart;
