import ImageMenu from "./ImageMenu";
import ViewButton from "./ViewButton";

interface HeaderProps {
  setSelectedLightField: (image: string) => void;
  setIsDualView: React.Dispatch<React.SetStateAction<boolean>>;
  isDualView: boolean;
}

const Header: React.FC<HeaderProps> = ({
  setSelectedLightField,
  setIsDualView,
  isDualView,
}) => {
  // component containing the header portion of the app
  return (
    <div className="header">
      <div className="header-side-div">
        <ImageMenu setSelectedLightField={setSelectedLightField} />
      </div>

      <div className="title">
        <h1>Light Field Denoising Comparison Tool</h1>
        <p className="instructions">
          Shift the perspective of a displayed image using the arrow keys
          <img
            src="/~nowe2200/kandidatarbete/on_demand/dist/arrow_keys.png"
            width="35"
            className="arrows"
          ></img>
          .
        </p>
      </div>
      <div className="header-side-div">
        <ViewButton setIsDualView={setIsDualView} isDualView={isDualView} />
      </div>
    </div>
  );
};
export default Header;
