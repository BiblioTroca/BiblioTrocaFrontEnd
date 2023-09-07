import { VariantProps, tv } from 'tailwind-variants'
import { BookmarkSimple } from '@phosphor-icons/react'
import * as RadioGroup from '@radix-ui/react-radio-group'

const item = tv({
  base: 'text-left w-full h-full flex justify-between items-center p-4 gap-1 border-[1px] border-gray-300 rounded-md data-[state="checked"]:bg-primary-100 data-[state="checked"]:border-primary-500 data-[state="checked"]:border-2',
  variants: {
    danger: {
      true: 'data-[state="checked"]:bg-red-100 data-[state="checked"]:border-red-500 data-[state="checked"]:border-2',
    },
  },
})

const indicator = tv({
  base: 'block bg-primary-500 w-3 h-3 rounded-full',
  variants: {
    danger: {
      true: 'bg-red-500',
    },
  },
})

const containerIndicator = tv({
  base: 'flex-none w-6 h-6 border-2 border-primary-500 flex items-center justify-center rounded-full',
  variants: {
    danger: {
      true: 'border-red-500',
    },
  },
})

type InputRadioProps = RadioGroup.RadioGroupItemProps &
  VariantProps<typeof item> & {
    title: string
    text: string
  }

export function InputRadio({
  id,
  title,
  value,
  text,
  danger,
}: InputRadioProps) {
  return (
    <RadioGroup.Item className={item({ danger })} value={value} id={id}>
      <BookmarkSimple className="flex-none place-self-start mt-1 w-4 h-4 md:[w-6 h-6]" />
      <label htmlFor={id} className="flex-1">
        <p className="text-base-140-md mb-3">{title}</p>
        <p className="text-base-160">{text}</p>
      </label>
      <div className={containerIndicator({ danger })}>
        <RadioGroup.Indicator className={indicator({ danger })} />
      </div>
    </RadioGroup.Item>
  )
}