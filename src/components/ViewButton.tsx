interface ViewButtonProps {
  setIsDualView: React.Dispatch<React.SetStateAction<boolean>>;
  isDualView: boolean;
}

const ViewButton: React.FC<ViewButtonProps> = ({
  setIsDualView,
  isDualView,
}) => {
  // component containing a button for toggling the value of isDualView

  // update button text when variable value changes
  var buttonText = "Single view";
  if (!isDualView) {
    buttonText = "Dual view";
  }
  return (
    // button inverting the value of isDualView when clicked
    <div
      className="view-buttons"
      onClick={() => setIsDualView((prev: boolean) => !prev)}
    >
      <button>{buttonText}</button>
    </div>
  );
};
export default ViewButton;
