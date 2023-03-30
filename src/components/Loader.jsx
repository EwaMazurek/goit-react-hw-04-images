import { Circles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="Loader">
      <Circles
        height="80"
        width="80"
        radius="9"
        color="black"
        ariaLabel="loading"
        wrapperStyle
      />
    </div>
  );
};
