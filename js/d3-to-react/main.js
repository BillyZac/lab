/* global React, d3, _ */

// BASIC GRAPH
var Graph = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.number)
  },
  render: function () {
    var chart = d3.select(document.createElement('div'))

    chart
      .selectAll('.bar')
      .data(this.props.data)
      .enter().append('div')
      .prop({
        className: 'bar',
        key: function (d, i) {
          return i
        },
        style: function (d, i) {
          return {
            width: d * 10
          }
        }
      })
      .text(function (d) {
        return d
      })

    return chart.toReact()
  }
})

var data = [4, 8, 15, 16, 23, 42]

React.render(
  React.createElement(Graph, {data: data}),
  document.getElementById('mount-chart')
)

// PARTICLES
var width = 1024
var height = 500

var circles = []
var i = 0

var Particles = React.createClass({
  propTypes: {
    circles: React.PropTypes.array
  },
  render: function () {
    var svg = d3.select(document.createElement('svg'))
      .prop('width', width)
      .prop('height', height)

    svg.selectAll('.particle').data(this.props.circles).enter()
      .append('circle')
      .prop('className', 'particle')
      .prop('key', function (d) { return d.i })
      .prop('cx', function (d) { return d.x })
      .prop('cy', function (d) { return d.y })
      .prop('r', function (d) { return d.r })
      .prop('stroke', function (d) { return d3.hsl(d.i % 360, 1, 0.5) })
      .prop('strokeOpacity', function (d) { return d.o })

    svg.append('rect')
      .prop('className', 'cover')
      .prop('width', width)
      .prop('height', height)
      .prop('key', 'cover')
      .prop('onMouseMove', function () { return addParticle })

    function addParticle (e) {
      var circle = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
        i: i++,
        o: 1,
        r: 1e-6
      }

      setTimeout(function () {
        _.remove(circles, circle)
      }, 1200)

      circles.push(circle)
      renderParticles()
    }

    return svg.toReact()
  }
})

function animloop () {
  _.each(circles, function (c) {
    c.o -= 0.02
    c.r += 1.1
  })
  renderParticles()
  window.requestAnimationFrame(animloop)
}
animloop()

function renderParticles () {
  React.render(React.createElement(Particles, {
    circles: circles
  }), document.getElementById('mount-particles'))
}

renderParticles()
