import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Slider } from "./Slider";

export default {
  title: "Components/Slider",
  component: Slider,
  args: {
    slides: [
      {
        label: "Label 1",
        paragraph: "Paragraph 1",
        image:
          "https://wegotthiscovered.com/wp-content/uploads/2022/11/himeno.jpg",
      },
      {
        label: "Label 2",
        paragraph: "Paragraph 2",
        image:
          "https://api.duniagames.co.id/api/content/upload/file/6563548601677501657.jpg",
      },
    ],
  },
  argTypes: {},
} as Meta<typeof Slider>;

export const Default: StoryObj<typeof Slider> = {
  render: (args) => <Slider slides={args.slides} />,
};
