import LightFieldViewer from "./LightFieldViewer";

interface BodyProps {
  selectedImage: string;
  selectedDenoiser: string;
  secondSelectedDenoiser: string;
  setSecondSelectedDenoiser: (denoiser: string) => void;
  denoisers: string[];
  setSelectedDenoiser: (denoiser: string) => void;
  isDualView: boolean;
}

const Body: React.FC<BodyProps> = ({
  selectedImage,
  selectedDenoiser,
  secondSelectedDenoiser,
  denoisers,
  setSelectedDenoiser,
  setSecondSelectedDenoiser,
  isDualView
}) => {
  return (
    <div className="body">
      <LightFieldViewer
        selectedImage={selectedImage}
        selectedDenoiser={selectedDenoiser}
        denoisers={denoisers}
        setSelectedDenoiser={setSelectedDenoiser}
      />
      {isDualView && (
        <LightFieldViewer
        selectedImage={selectedImage}
        selectedDenoiser={secondSelectedDenoiser}
        denoisers={denoisers}
        setSelectedDenoiser={setSecondSelectedDenoiser}
        />
      )}
    </div>
  );
};
export default Body;
