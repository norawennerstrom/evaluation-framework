import LightFieldViewer from "./LightFieldViewer";

interface BodyProps {
  selectedLightField: string;
  selectedDenoiser: string;
  secondSelectedDenoiser: string;
  setSecondSelectedDenoiser: (denoiser: string) => void;
  denoisers: string[];
  setSelectedDenoiser: (denoiser: string) => void;
  isDualView: boolean;
}

const Body: React.FC<BodyProps> = ({
  selectedLightField,
  selectedDenoiser,
  secondSelectedDenoiser,
  denoisers,
  setSelectedDenoiser,
  setSecondSelectedDenoiser,
  isDualView,
}) => {
  return (
    <div className="body">
      <LightFieldViewer
        selectedLightField={selectedLightField}
        selectedDenoiser={selectedDenoiser}
        denoisers={denoisers}
        setSelectedDenoiser={setSelectedDenoiser}
      />
      {isDualView && (
        <LightFieldViewer
          selectedLightField={selectedLightField}
          selectedDenoiser={secondSelectedDenoiser}
          denoisers={denoisers}
          setSelectedDenoiser={setSecondSelectedDenoiser}
        />
      )}
    </div>
  );
};
export default Body;
