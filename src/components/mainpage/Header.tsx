import { Menu, SquarePen } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const askRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const getActiveStyles = () => {
    const activeRef = toggle ? roleRef : askRef;
    if (!activeRef.current) return { width: 0, x: 0 };
    return {
      width: activeRef.current.offsetWidth,
      x: activeRef.current.offsetLeft - 4,
    };
  };

  return (
    <div className="w-full py-6 px-7  flex justify-between cursor-pointer">
      <Menu onClick={handleOpen} />
      {open && <div>1</div>}

      <div
        className="relative flex items-center bg-gray-100 rounded-full cursor-pointer"
        onClick={() => setToggle((prev) => !prev)}
      >
        <motion.div
          className="absolute bg-white rounded-full h-6"
          initial={false}
          animate={getActiveStyles()}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{ left: 4 }}
        />
        <span
          ref={askRef}
          className={`relative z-10 px-3 py-1 text-sm font-medium transition-colors ${
            !toggle ? "text-gray-800" : "text-gray-400"
          }`}
        >
          Ask
        </span>
        <span
          ref={roleRef}
          className={`relative z-10 px-3 py-1 text-sm font-medium transition-colors ${
            toggle ? "text-gray-800" : "text-gray-400"
          }`}
        >
          Role playing
        </span>
      </div>
      <SquarePen />
    </div>
  );
}
