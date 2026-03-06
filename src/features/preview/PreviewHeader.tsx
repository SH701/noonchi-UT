import { HamburgerIcon } from "@/assets/svgr";
import { Header } from "@/components/common";

interface PreviewHeaderProps {
  handleMoveAuth: () => void;
}
export default function PreviewHeader({ handleMoveAuth }: PreviewHeaderProps) {
  return (
    <Header
      leftIcon={<HamburgerIcon />}
      center="RolePlay Preview"
      rightIcon="Skip"
      className="font-medium"
      onRightClick={handleMoveAuth}
    />
  );
}
