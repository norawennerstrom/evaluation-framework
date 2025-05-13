import { DENOISERS } from "../constants.ts";
import { useRef } from "react";
interface DenoiserMenuProps {
  setSelectedDenoiser: (denoiser: string) => void;
  selectedDenoiser: string;
}

const DenoiserMenu: React.FC<DenoiserMenuProps> = ({
  setSelectedDenoiser,
  selectedDenoiser,
}) => {
  const select = useRef<HTMLSelectElement | null>(null);
  select.current?.addEventListener("keydown", function (event) {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      // prevent the arrow keys from being used to change the selected option
      event.preventDefault();
    }
  });
  return (
    <select
      className="denoiser-menu"
      ref={select}
      onChange={(e) => setSelectedDenoiser(e.target.value)}
    >
      <option value="" selected disabled hidden>
        {selectedDenoiser}
      </option>
      {DENOISERS.map((denoiser) => (
        <option key={denoiser} value={denoiser}>
          {denoiser}
        </option>
      ))}
    </select>
  );
};
export default DenoiserMenu;
