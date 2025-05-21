import { LIGHT_FIELDS } from "../constants";
import { useRef } from "react";
interface ImageMenuProps {
  setSelectedLightField: (image: string) => void;
}

const ImageMenu: React.FC<ImageMenuProps> = ({ setSelectedLightField }) => {
  // component containing a menu for selecting the displayed light field

  // ref to the HTML select element (for adding event listener)
  const select = useRef<HTMLSelectElement | null>(null);
  select.current?.addEventListener("keydown", function (event) {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      // prevent the arrow keys from being used to change the selected option
      // (will otherwise interfere with navigation in light field)
      event.preventDefault();
    }
  });
  return (
    // use the setter for state variable selectedLightField on change
    // options taken from LIGHT_FIELDS array in constants.ts
    <>
      <p>Select the scene:</p>
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
    </>
  );
};
export default ImageMenu;
