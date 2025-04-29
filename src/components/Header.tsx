import ImageMenu from "./ImageMenu";
import ViewButton from "./ViewButton";

interface HeaderProps {
  lightFields: string[];
  setSelectedLightField: (image: string) => void;
  setIsDualView: React.Dispatch<React.SetStateAction<boolean>>;
  isDualView: boolean;
}

const Header: React.FC<HeaderProps> = ({
  lightFields,
  setSelectedLightField,
  setIsDualView,
  isDualView,
}) => {
  return (
    <div className="header">
      <div className="header-side-div">
        <ImageMenu
          lightFields={lightFields}
          setSelectedLightField={setSelectedLightField}
        />
      </div>

      <div className="title">
        <h1>Light Field Comparison Tool</h1>
        <p>
          Interact using the arrow keys.
          <br />
          Double-click to reset the view.
        </p>
      </div>
      <div className="header-side-div">
        <ViewButton setIsDualView={setIsDualView} isDualView={isDualView} />
      </div>
    </div>
  );
};
export default Header;
