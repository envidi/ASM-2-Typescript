import  { useState } from 'react';

const ImageWithSpinner = ({ src }:{src:any}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <div
          style={{
          
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height:"130px"
          }}
        >
          <div className="spinner" ></div>
        </div>
      )}
      <img
        src={src}
        onLoad={handleImageLoad}
        style={{ display: isLoading ? 'none' : 'block', width: '100%', height: '100%' }}
        alt="Image"
      />
    </div>
  );
};

export default ImageWithSpinner;