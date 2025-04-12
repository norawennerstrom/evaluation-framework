import ImageMenu from "./ImageMenu";
import ViewButtons from "./ViewButtons";

interface HeaderProps {
  lightFields: string[];
  setSelectedImage: (image: string) => void;
  setIsDualView: React.Dispatch<React.SetStateAction<boolean>>;
  isDualView: boolean;
}

const Header: React.FC<HeaderProps> = ({ lightFields, setSelectedImage, setIsDualView, isDualView }) => {
  return (
    <div className="header">
      <div className="header-side-div">
        <ImageMenu
          lightFields={lightFields}
          setSelectedImage={setSelectedImage}
        />
      </div>

      <div className="title">
        <h1>Light Field Comparison Tool</h1>
        <p>
          Interact using the arrow keys.
          <br />
          Click an image to toggle focus.
          <br />
          Double-click to reset the view.
        </p>
      </div>
      <div className="header-side-div">
        <ViewButtons setIsDualView={setIsDualView} isDualView={isDualView} />
      </div>
    </div>
  );
};
export default Header;
