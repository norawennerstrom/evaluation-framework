import { LIGHT_FIELDS } from "../constants";
import { useRef } from "react";
interface ImageMenuProps {
  setSelectedLightField: (image: string) => void;
}

const ImageMenu: React.FC<ImageMenuProps> = ({ setSelectedLightField }) => {
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
      className="image-menu"
      ref={select}
      onChange={(e) => setSelectedLightField(e.target.value)}
    >
      <option value="" selected disabled hidden>
        Bikes
      </option>
      {LIGHT_FIELDS.map((lightField) => (
        <option key={lightField} value={lightField}>
          {lightField}
        </option>
      ))}
    </select>
  );
};
export default ImageMenu;
