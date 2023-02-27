import React from 'react'
import { IconProps } from './interface'

export const ArrowIcon: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.1383 5.59255L2.94303 9.7879C2.4 10.3309 1.54496 10.404 0.917581 9.96122C0.115206 9.39478 0.0198307 8.24065 0.718431 7.55028L6.8982 1.44313C7.57983 0.769556 8.67673 0.769556 9.35835 1.44313L15.5381 7.55028C16.2367 8.24065 16.1414 9.39478 15.3389 9.96122C14.7116 10.404 13.8566 10.3309 13.3136 9.7879L9.11825 5.59255C8.57155 5.04585 7.685 5.04585 7.1383 5.59255Z"
        fill="white"
      />
    </svg>
  )
}
