import * as React from 'react'
import { useState, useRef } from 'react'
import Slider, { SliderValue } from 'react-input-slider'

type Style = { [key: string]: any }

interface Props {
  value: number
  min: number
  max: number
  styles?: {
    active?: Style
    thumb?: Style
    track?: Style
  }
  onChange?: (value: number) => void
  onDragEnd?: (value: number) => void
}

function UiInputSlider(props: Props) {
  const [slackX, setSlackX] = useState<number>(() => props.value)
  const slackXRef = useRef(slackX)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  function onChange({ x }: SliderValue) {
    setIsDragging(true)
    setSlackX(x)
    slackXRef.current = x
    props.onChange && props.onChange(x)
  }

  function onDragEnd() {
    props.onDragEnd && props.onDragEnd(slackXRef.current)
    setIsDragging(false)
  }

  return (
    <Slider
      axis="x"
      x={isDragging ? slackX : props.value}
      xmin={props.min}
      xmax={props.max}
      onChange={onChange}
      onDragEnd={onDragEnd}
      styles={props.styles}
    />
  )
}

export default UiInputSlider