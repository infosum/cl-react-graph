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
