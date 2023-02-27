import React from 'react'
import { IconProps } from './interface'

export const EditIcon: React.FC<IconProps> = ({
  fill = 'none',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} ${fill} ${stroke} ${className}`}
    >
      <path
        d="M15 10.5V14.25C15 14.6642 14.6642 15 14.25 15H3.75C3.33579 15 3 14.6642 3 14.25V3.75C3 3.33579 3.33579 3 3.75 3H7.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10.5H9.75L16.5 3.75L14.25 1.5L7.5 8.25V10.5Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3.75L14.25 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
