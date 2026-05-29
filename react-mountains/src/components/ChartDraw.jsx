import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const margin = { top: 10, bottom: 90, left: 50, right: 10 };

export default function ChartDraw({ data, series, type }) {
    const wrapRef = useRef(null);
    const svgRef = useRef(null);
    const [width, setWidth] = useState(0);
    const height = 420;

    useEffect(() => {
        const measure = () => setWidth(wrapRef.current ? wrapRef.current.clientWidth : 0);
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const boundsWidth = Math.max(0, width - margin.left - margin.right);
    const boundsHeight = height - margin.top - margin.bottom;

    const scaleX = useMemo(
        () => d3.scaleBand().domain(data.map(d => d.labelX)).range([0, boundsWidth]).padding(0.25),
        [data, boundsWidth]
    );

    const [min, max] = useMemo(() => {
        const vals = data.flatMap(d => series.map(s => d.values[s.key]));
        const ext = d3.extent(vals);
        return ext[0] === undefined ? [0, 1] : ext;
    }, [data, series]);

    const scaleY = useMemo(
        () => d3.scaleLinear().domain([Math.min(0, min * 0.85), max * 1.1]).nice().range([boundsHeight, 0]),
        [boundsHeight, min, max]
    );

    useEffect(() => {
        if (!width || series.length === 0 || data.length === 0) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(d3.axisBottom(scaleX))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-35)");

        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(d3.axisLeft(scaleY));

        const plot = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

        if (type === "Столбчатая диаграмма") {
            const barW = scaleX.bandwidth() / series.length;
            series.forEach((s, si) => {
                plot.selectAll(`.bar-${si}`)
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + si * barW)
                    .attr("y", d => scaleY(d.values[s.key]))
                    .attr("width", barW * 0.9)
                    .attr("height", d => boundsHeight - scaleY(d.values[s.key]))
                    .style("fill", s.color);
            });
        } else {
            series.forEach(s => {
                plot.selectAll(`.dot-${s.key}`)
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("r", 6)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[s.key]))
                    .style("fill", s.color)
                    .style("stroke", "#fff");
            });
        }
    }, [scaleX, scaleY, data, type, series, width, boundsHeight]);

    return (
        <div ref={wrapRef}>
            <svg ref={svgRef} width={width} height={height} />
            <div className="d-flex gap-3 flex-wrap mt-2">
                {series.map(s => (
                    <span key={s.key} className="d-inline-flex align-items-center gap-1">
                        <span style={{ width: 14, height: 14, background: s.color, display: "inline-block", borderRadius: 2 }} />
                        {s.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
