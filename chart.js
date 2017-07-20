const d3 = require('d3');

module.exports = (data, config, svg) => {
    // set the ranges
    const x = d3.scale.linear()
        .range([config.barWidth / 2, config.width - config.barWidth / 2]);

    const y = d3.scale.linear()
        .range([config.height, 0]);

    // define the axis
    const yAxis = d3.svg.axis()
        .scale(y)
        .orient("right")
        .tickSize(-config.width)
        .tickFormat((d) => {
            return Math.round(d / 1e6) + "M";
        });

    // A sliding container to hold the bars by birthyear.
    const birthyears = svg.append("g")
        .attr("class", "birthyears");

    // A label for the current year.
    const title = svg.append("text")
        .attr("class", "title")
        .attr("dy", ".71em")
        .text(2000);

    // Compute the extent of the data set in age and years.
    const age1 = d3.max(data, (d) => {
            return d.age;
        }),
        year0 = d3.min(data, (d) => {
            return d.year;
        }),
        year1 = d3.max(data, (d) => {
            return d.year;
        }),
        year = year1;

    // Update the scale domains.
    x.domain([year1 - age1, year1]);
    y.domain([0, d3.max(data, (d) => {
        return d.people;
    })]);

    // Produce a map from year and birthyear to [male, female].
    data = d3.nest()
        .key((d) => {
            return d.year;
        })
        .key((d) => {
            return d.year - d.age;
        })
        .rollup((v) => {
            return v.map((d) => {
                return d.people;
            });
        })
        .map(data);

    // Add an axis to show the population values.
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + config.width + ",0)")
        .call(yAxis)
        .selectAll("g")
        .filter((value) => {
            return !value;
        })
        .classed("zero", true);

    // Add labeled rects for each birthyear (so that no enter or exit is required).
    const birthyear = birthyears.selectAll(".birthyear")
        .data(d3.range(year0 - age1, year1 + 1, 5))
        .enter().append("g")
        .attr("class", "birthyear")
        .attr("transform", (birthyear) => {
            return "translate(" + x(birthyear) + ",0)";
        });

    birthyear.selectAll("rect")
        .data((birthyear) => {
            return data[year][birthyear] || [0, 0];
        })
        .enter().append("rect")
        .attr("x", -config.barWidth / 2)
        .attr("width", config.barWidth)
        .attr("y", y)
        .attr("height", (value) => {
            return config.height - y(value);
        });

    // Add labels to show birthyear.
    birthyear.append("text")
        .attr("y", config.height - 4)
        .text((birthyear) => {
            return birthyear;
        });

    // Add labels to show age (separate; not animated).
    svg.selectAll(".age")
        .data(d3.range(0, age1 + 1, 5))
        .enter().append("text")
        .attr("class", "age")
        .attr("x", (age) => {
            return x(year - age);
        })
        .attr("y", config.height + 4)
        .attr("dy", ".71em")
        .text((age) => {
            return age;
        });

    // // Allow the arrow keys to change the displayed year.
    // window.focus();
    // d3.select(window).on("keydown", () {
    // =>     switch (d3.event.keyCode) {
    //         case 37:
    //             year = Math.max(year0, year - 10);
    //             break;
    //         case 39:
    //             year = Math.min(year1, year + 10);
    //             break;
    //     }
    //     update();
    // });

    // update() { =>     //     if (!(year in data)) return;
    //     title.text(year);

    //     birthyears.transition()
    //         .duration(750)
    //         .attr("transform", "translate(" + (x(year1) - x(year)) + ",0)");

    //     birthyear.selectAll("rect")
    //         .data((birthyear) => {
    //             return data[year][birthyear] || [0, 0];
    //         })
    //         .transition()
    //         .duration(750)
    //         .attr("y", y)
    //         .attr("height", (value) => {
    //             return height - y(value);
    //         });
    // }
}