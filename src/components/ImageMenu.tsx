interface ImageMenuProps {
  lightFields: string[];
  setSelectedImage: (image: string) => void;
}

const ImageMenu: React.FC<ImageMenuProps> = ({
  lightFields,
  setSelectedImage,
}) => {
  return (
    <select
      className="image-menu"
      onChange={(e) => setSelectedImage(e.target.value)}
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
