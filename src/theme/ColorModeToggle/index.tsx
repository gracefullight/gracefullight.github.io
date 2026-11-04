import type { WrapperProps } from "@docusaurus/types";
import type ColorModeToggleType from "@theme-original/ColorModeToggle";

import ColorModeToggle from "@theme-original/ColorModeToggle";

type Props = WrapperProps<typeof ColorModeToggleType>;

export default function ColorModeToggleWrapper(props: Props) {
  return (
    <ColorModeToggle
      {...props}
      className={`touch-color-mode-toggle ${props.className ?? ""}`}
    />
  );
}
