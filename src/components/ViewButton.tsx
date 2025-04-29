interface ViewButtonProps {
  setIsDualView: React.Dispatch<React.SetStateAction<boolean>>;
  isDualView: boolean;
}

const ViewButton: React.FC<ViewButtonProps> = ({
  setIsDualView,
  isDualView,
}) => {
  var buttonText = "Single view";
  if (!isDualView) {
    buttonText = "Dual view";
  }
  return (
    <div
      className="view-buttons"
      onClick={() => setIsDualView((prev: boolean) => !prev)}
    >
      <button>{buttonText}</button>
    </div>
  );
};
export default ViewButton;
