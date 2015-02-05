var width = 1200, height = 800;

var circleWidth = 5;

var fontFamily = 'Bree Serif',
fontSizeHighlight = '1.5em',
fontSizeNormal = '1em';

var palette = {
    "lightgray": "#819090",
    "gray": "#708284",
    "mediumgray": "#536870",
    "darkgray": "#475B62",

    "darkblue": "#0A2933",
    "darkerblue": "#042029",

    "paleryellow": "#FCF4DC",
    "paleyellow": "#EAE3CB",
    "yellow": "#A57706",
    "orange": "#BD3613",
    "red": "#D11C24",
    "pink": "#C61C6F",
    "purple": "#595AB7",
    "blue": "#2176C7",
    "green": "#259286",
    "yellowgreen": "#738A05"
}

// var nodes = [
//     {"name": "Matteo" },
//     {"name": "Daniele"},
//     {"name": "Marco"},
//     {"name": "Lucio"},
//     {"name": "Davide" }
// ]

// var links = [
//     {source: nodes[0], target: nodes[1]},
//     {source: nodes[1], target: nodes[2]},
//     {source: nodes[0], target: nodes[3]},
//     {source: nodes[4], target: nodes[2]},
//     {source: nodes[2], target: nodes[3]}
// ]



var svg = d3.select("body")
    .append("svg:svg")
    .attr("class", "stage")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    // .nodes(nodes)
    // .links([])
    .gravity(0.1)
    .charge(-1000)
    .size([width, height]);

d3.json("data.json", function(error, graph) {

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke", "#CCC")
        .attr("fill", "none");

    var node = svg.selectAll("circle.node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")

    //MOUSEOVER
        .on("mouseover", function(d,i) {
            if (i>0) {
                //CIRCLE
                d3.select(this).selectAll("circle")
                    .transition()
                    .duration(250)
                    .style("cursor", "none")
                    .attr("r", circleWidth+3)
                    .attr("fill",palette.orange);

                //TEXT
                d3.select(this).select("text")
                    .transition()
                    .style("cursor", "none")
                    .duration(250)
                    .style("cursor", "none")
                    .attr("font-size","1.5em")
                    .attr("x", 15 )
                    .attr("y", 5 )
            } else {
                //CIRCLE
                d3.select(this).selectAll("circle")
                    .style("cursor", "none")

                //TEXT
                d3.select(this).select("text")
                    .style("cursor", "none")
            }
        })

    //MOUSEOUT
        .on("mouseout", function(d,i) {
            if (i>0) {
                //CIRCLE
                d3.select(this).selectAll("circle")
                    .transition()
                    .duration(250)
                    .attr("r", circleWidth)
                    .attr("fill",palette.pink);

                //TEXT
                d3.select(this).select("text")
                    .transition()
                    .duration(250)
                    .attr("font-size","1em")
                    .attr("x", 8 )
                    .attr("y", 4 )
            }
        })

        .call(force.drag);


    //CIRCLE
    node.append("svg:circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", circleWidth)
        .attr("fill", function(d, i) { if (i>0) { return  palette.pink; } else { return palette.paleryellow } } )

    //TEXT
    node.append("text")
        .text(function(d, i) { return d.name; })
        .attr("x",    function(d, i) { return circleWidth + 5; })
        .attr("y",            function(d, i) { if (i>0) { return circleWidth + 0 } else { return 8 } })
        .attr("font-family",  "Bree Serif")
        .attr("fill",         function(d, i) {  return  palette.paleryellow;  })
        .attr("font-size",    function(d, i) {  return  "1em"; })
        .attr("text-anchor",  function(d, i) { if (i>0) { return  "beginning"; } else { return "end" } })



    force.on("tick", function(e) {
        node.attr("transform", function(d, i) {
            return "translate(" + d.x + "," + d.y + ")";
        });

        link.attr("x1", function(d)   { return d.source.x; })
            .attr("y1", function(d)   { return d.source.y; })
            .attr("x2", function(d)   { return d.target.x; })
            .attr("y2", function(d)   { return d.target.y; })
    });

    force.nodes(graph.nodes)
        .links(graph.links)
        .linkDistance(300)
        .start();
    // force.start();
});
