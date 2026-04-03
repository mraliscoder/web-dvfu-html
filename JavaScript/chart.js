function createArrGraph(data, key) {
  const groupObj = d3.group(data, d => d[key]);
  const arrGraph = [];

  for (const entry of groupObj) {
    const heights = entry[1].map(d => d['Высота']);
    const minMax = d3.extent(heights);
    arrGraph.push({ labelX: entry[0], values: minMax });
  }

  arrGraph.sort((a, b) => {
    if (typeof a.labelX === 'number') return a.labelX - b.labelX;
    return String(a.labelX).localeCompare(String(b.labelX), 'ru');
  });

  return arrGraph;
}

function createAxis(svg, data, attr, showMin, showMax) {
  const allVals = [];
  data.forEach(d => {
    if (showMin) allVals.push(d.values[0]);
    if (showMax) allVals.push(d.values[1]);
  });

  const [globalMin, globalMax] = d3.extent(allVals);
  const yMin = globalMin * 0.85;
  const yMax = globalMax * 1.1;

  const scaleX = d3.scaleBand()
    .domain(data.map(d => d.labelX))
    .range([0, attr.width - 2 * attr.marginX])
    .padding(0.2);

  const scaleY = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([attr.height - 2 * attr.marginY, 0]);

  const axisX = d3.axisBottom(scaleX);
  const axisY = d3.axisLeft(scaleY).ticks(6);

  svg.append("g")
    .attr("class", "axis-x")
    .attr("transform", `translate(${attr.marginX}, ${attr.height - attr.marginY})`)
    .call(axisX)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-0.6em")
    .attr("dy", "0.15em")
    .attr("transform", "rotate(-40)");

  svg.append("g")
    .attr("class", "axis-y")
    .attr("transform", `translate(${attr.marginX}, ${attr.marginY})`)
    .call(axisY);

  svg.append("text")
    .attr("transform", `rotate(-90)`)
    .attr("x", -(attr.height / 2))
    .attr("y", 14)
    .attr("text-anchor", "middle")
    .style("font-size", "11px")
    .style("fill", "#555")
    .text("Высота (м)");

  return [scaleX, scaleY];
}

function drawScatter(svg, data, scaleX, scaleY, attr, showMin, showMax) {
  const r = 5;
  const cx = d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + attr.marginX;

  if (showMax) {
    svg.selectAll(".dot-max")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot dot-max")
      .attr("r", r)
      .attr("cx", cx)
      .attr("cy", d => scaleY(d.values[1]) + attr.marginY)
      .style("fill", "steelblue");
  }

  if (showMin) {
    svg.selectAll(".dot-min")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot dot-min")
      .attr("r", r)
      .attr("cx", cx)
      .attr("cy", d => scaleY(d.values[0]) + attr.marginY)
      .style("fill", "tomato");
  }
}

function drawBar(svg, data, scaleX, scaleY, attr, showMin, showMax) {
  const both = showMin && showMax;
  const bw = both ? scaleX.bandwidth() / 2 : scaleX.bandwidth();
  const baseY = attr.height - attr.marginY;

  const barY = (val) => scaleY(val) + attr.marginY;
  const barH = (val) => baseY - barY(val);

  data.forEach(d => {
    const x0 = scaleX(d.labelX) + attr.marginX;

    if (showMax) {
      svg.append("rect")
        .attr("class", "bar bar-max")
        .attr("x", both ? x0 : x0)
        .attr("y", barY(d.values[1]))
        .attr("width", bw)
        .attr("height", barH(d.values[1]))
        .style("fill", "blue");
    }

    if (showMin) {
      svg.append("rect")
        .attr("class", "bar bar-min")
        .attr("x", both ? x0 + bw : x0)
        .attr("y", barY(d.values[0]))
        .attr("width", bw)
        .attr("height", barH(d.values[0]))
        .style("fill", "red");
    }
  });
}

function drawLegend(svg, attr, showMin, showMax) {
  const items = [];
  if (showMax) items.push({ label: "Максимальная высота", color: "steelblue" });
  if (showMin) items.push({ label: "Минимальная высота", color: "tomato" });

  const legendX = attr.width - attr.marginX - 180;
  const legendY = attr.marginY + 10;

  items.forEach((item, i) => {
    svg.append("rect")
      .attr("x", legendX)
      .attr("y", legendY + i * 20)
      .attr("width", 14)
      .attr("height", 14)
      .style("fill", item.color)
      .style("opacity", 0.8);

    svg.append("text")
      .attr("class", "legend-item")
      .attr("x", legendX + 20)
      .attr("y", legendY + i * 20 + 11)
      .text(item.label);
  });
}

function drawLine(svg, data, scaleX, scaleY, attr, showMin, showMax) {
  const cx = d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + attr.marginX;

  const lineGen = (valFn) => d3.line()
    .x(cx)
    .y(d => scaleY(valFn(d)) + attr.marginY);

  if (showMax) {
    svg.append("path")
      .datum(data)
      .attr("class", "line line-max")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", lineGen(d => d.values[1]));

    svg.selectAll(".dot-line-max")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", cx)
      .attr("cy", d => scaleY(d.values[1]) + attr.marginY)
      .style("fill", "steelblue");
  }

  if (showMin) {
    svg.append("path")
      .datum(data)
      .attr("class", "line line-min")
      .attr("fill", "none")
      .attr("stroke", "tomato")
      .attr("stroke-width", 2)
      .attr("d", lineGen(d => d.values[0]));

    svg.selectAll(".dot-line-min")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", cx)
      .attr("cy", d => scaleY(d.values[0]) + attr.marginY)
      .style("fill", "tomato");
  }
}

function drawGraph(data, keyX, showMin, showMax, chartType) {
  const arrGraph = createArrGraph(data, keyX);

  const svg = d3.select("svg#mainChart");
  svg.selectAll("*").remove();

  const bbox = svg.node().getBoundingClientRect();
  const attr = {
    width: bbox.width,
    height: bbox.height,
    marginX: 60,
    marginY: 50
  };

  const [scX, scY] = createAxis(svg, arrGraph, attr, showMin, showMax);

  if (chartType === "scatter") {
    drawScatter(svg, arrGraph, scX, scY, attr, showMin, showMax);
  } else if (chartType === "line") {
    drawLine(svg, arrGraph, scX, scY, attr, showMin, showMax);
  } else {
    drawBar(svg, arrGraph, scX, scY, attr, showMin, showMax);
  }

  drawLegend(svg, attr, showMin, showMax);
}
