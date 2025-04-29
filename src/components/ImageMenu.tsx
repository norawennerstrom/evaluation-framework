interface ImageMenuProps {
  lightFields: string[];
  setSelectedLightField: (image: string) => void;
}

const ImageMenu: React.FC<ImageMenuProps> = ({
  lightFields,
  setSelectedLightField,
}) => {
  return (
    <select
      className="image-menu"
      onChange={(e) => setSelectedLightField(e.target.value)}
    >
      <option value="" selected disabled hidden>
        Bikes
      </option>
      {lightFields.map((lightField) => (
        <option key={lightField} value={lightField}>
          {lightField}
        </option>
      ))}
    </select>
  );
};
export default ImageMenu;
