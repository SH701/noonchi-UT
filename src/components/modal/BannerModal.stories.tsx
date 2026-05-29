import {Meta,StoryObj} from "@storybook/nextjs-vite"
import BannerModal from "./BannerModal"

const meta:Meta<typeof BannerModal>={
    title:"UI/BannerModal",
    component:BannerModal,
    parameters:{
        layout:'center'
    },
    tags:["autodocs"]
}
export default meta;

type Story = StoryObj<typeof BannerModal>;

export const Default:Story ={
     args: { forceOpen: true, },
}