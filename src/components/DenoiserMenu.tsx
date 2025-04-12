interface DenoiserMenuProps {
  denoisers: string[];
  setSelectedDenoiser: (denoiser: string) => void;
}

const DenoiserMenu: React.FC<DenoiserMenuProps> = ({
  denoisers,
  setSelectedDenoiser,
}) => {
  return (
    <select
      className="denoiser-menu"
      onChange={(e) => setSelectedDenoiser(e.target.value)}
    >
      <option value="" selected disabled hidden>
        Clean
      </option>
      {denoisers.map((denoiser) => (
        <option key={denoiser} value={denoiser}>
          {denoiser}
        </option>
      ))}
    </select>
  );
};
export default DenoiserMenu;
