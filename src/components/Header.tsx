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
        <p>Select the applied denoiser from the menu below a light field.</p>
        <p>Shift the perspective of a displayed image using the arrow keys.</p>
      </div>
      <div className="header-side-div">
        <ViewButton setIsDualView={setIsDualView} isDualView={isDualView} />
      </div>
    </div>
  );
};
export default Header;
