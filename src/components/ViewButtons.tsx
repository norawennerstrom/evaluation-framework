interface ViewButtonsProps {
  setIsDualView: React.Dispatch<React.SetStateAction<boolean>>;
  isDualView: boolean;
}

const ViewButtons: React.FC<ViewButtonsProps> = ({setIsDualView, isDualView}) => {
  var buttonText = "Single view";
  if(!isDualView) {
    buttonText = "Dual view";
  }
  return (
    <div className="view-buttons" onClick={() => setIsDualView((prev: boolean) => !prev)}>
      <button>{buttonText}</button>
    </div>
  );
}
export default ViewButtons;
