const d3 = require('d3');

module.exports = (data, config, svg) => {
    // set the ranges
    const x = d3.scale.ordinal().rangeRoundBands([0, config.width], .05);
    const y = d3.scale.linear().range([config.height, 0]);

    // define the axis
    const xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")


    const yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    data.forEach((d) => {
        d.Letter = d.Letter;
        d.Freq = +d.Freq;
    });

    // scale the range of the data
    x.domain(data.map((d) => {
        return d.Letter;
    }));
    y.domain([0, d3.max(data, (d) => {
        return d.Freq;
    })]);

    // add axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + config.height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");


    // Add bar chart
    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => {
            return x(d.Letter);
        })
        .attr("width", x.rangeBand())
        .attr("y", (d) => {
            return y(d.Freq);
        })
        .attr("height", (d) => {
            return config.height - y(d.Freq);
        });
}