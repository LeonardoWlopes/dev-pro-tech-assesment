import type { Meta, StoryObj } from '@storybook/react-vite'
import { Loading } from '.'

const meta: Meta<typeof Loading> = {
	title: 'Components/Loading',
	component: Loading,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'The Loading component is used to display a loading state.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof Loading>

export const Default: Story = {
	args: {},
}

export const CustomSize: Story = {
	args: {
		className: 'h-12 w-12',
	},
}

export const CustomColor: Story = {
	args: {
		className: 'text-blue-500',
	},
}

export const Large: Story = {
	args: {
		className: 'h-16 w-16',
	},
}
