import { memo, useMemo } from 'react'
import { format, parseISO } from 'date-fns'

import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { GradientTealBlue } from '@visx/gradient'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom } from '@visx/axis'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { colors } from '@/styles/colorPalette'

interface IChartData {
  // x
  date: string
  //   y
  balance: number
}

interface IMonthlyChartProps {
  chartData: IChartData[]
  width: number
  height: number
}

const verticalMargin = 120

const getX = (d: IChartData) => d.date
const getY = (d: IChartData) => d.balance
const formatDate = (date: string) => format(parseISO(date), 'M월')

const MonthlyChart = ({ chartData, width, height }: IMonthlyChartProps) => {
  // bounds
  const xMax = width
  const yMax = height - verticalMargin

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: chartData.map(getX),
        padding: 0.4,
      }),
    [chartData, xMax],
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...chartData.map(getY))],
      }),
    [chartData, yMax],
  )

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {chartData.map((d) => {
          const date = getX(d)
          const barWidth = xScale.bandwidth()
          const barHeight = yMax - (yScale(getY(d)) ?? 0)
          const barX = xScale(date)
          const barY = yMax - barHeight
          return (
            <Bar
              key={date}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={colors.blue}
            />
          )
        })}
      </Group>
      <AxisBottom
        top={yMax + 60}
        scale={xScale}
        tickFormat={formatDate}
        stroke={colors.blue}
        tickStroke={colors.blue}
        tickLabelProps={{
          fill: colors.blue,
          fontSize: 12,
          textAnchor: 'middle',
        }}
      />
    </svg>
  )
}

interface ChartWrapperProps {
  height?: number
  chartData: IChartData[]
}

const ChartWrapper = ({ height = 200, chartData }: ChartWrapperProps) => {
  return (
    <ParentSize>
      {/* 현재 viewport의 width */}
      {({ width }) => (
        <MonthlyChart width={width} height={height} chartData={chartData} />
      )}
    </ParentSize>
  )
}

export default memo(ChartWrapper)
