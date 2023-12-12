[4.4.3]
  * Fix: y-axis labels not wrapping to fit inside y axis width.
[4.4.2]
  * Fix: BarChar xaxis - tick values not applied
[4.4.1]
  * Fix grid: visible not used, y axis styling not applied.     
[4.4.0]
  * Add Linear Gradients to bar/areas
[4.2.0]   
  * <PieChart> & <Ring> - add labelFormat prop.
[4.1.0]
  * Added <Map />.
[4.0.0]
  * Convert Pie Chart to use React rather than D3 for rendering
  * Rename types/interfaces
  * Remove Map which was never fully implemented
[3.6.2]
  * Update dependencies and add snyk ignores
[3.6.0]
  * Updated dependencies and pruned unused dependencies for Snyk
[3.4.1]
  * Changed ISVGLineStyle from snake-case props to camelCase
[3.3.5]
  * Add `tickValues` prop to Bar chart to specify numeric scales ticks.
[3.3.4]
  * Add title prop to all charts
[3.3.0]
  * Added <RadarChart />
  * Added <Web />, <Point /> <Path /> as sub components for use in RadarChart
  * Changed X & Y Axis use a helper function to create the scale.
[3.2.0]
  * Added <ScatterPlot />.
  * Added PointComponent prop to Points to enable custom point rendering (available in LineChart and ScatterPlot)
[3.1.15]
  * Add `colorScheme` to Tornado.
[3.1.14]
  * Fixed rendering of new tornado chart.
  * Fixed duplicate keys
  * Added radius options for bars
  * Added bar padding props to tornado chart.
[3.1.13]
  * Add: Points add showTitle prop.
  * Add: LineChart add clampToZero prop. If true then adds a 0 to the data domain. Useful if you don't want your lowest value to appear on top of the x axis
  * Add: time handling to XAxis
  * Change: LineChart passes on axis scale types correctly to x & y axis.
  * Change: LineChart make grid prop optional
  * Change: refactored tick generator into is own function to be used across X & Y Axis
  * Change: use scaleSymlog over scaleLog as this handles 0 values
[3.1.12]
  * Change: Bars: overlaid layout. Ensure that smaller bar widths don't disappear on smaller sizes.
  * Change: IHistogramBar.overlayMargin takes a fraction value to provide a percentage width of overlaid layouts.
