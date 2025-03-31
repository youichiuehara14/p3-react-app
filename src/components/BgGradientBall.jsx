const BgGradientBall = () => {
  return (
    <div className=" overflow-hidden">
      <div className=" w-screen h-screen overflow-x-hidden border-1 ">
        {/* Top Left Gradient Ball */}
        <img
          src="/GradientBall.png"
          alt="Gradient Glow"
          className="absolute min-w-[800px] h-[800px] object-cover "
        />

        {/* Bottom Right Gradient Ball */}
        <img
          src="/GradientBall.png"
          alt="Gradient Glow"
          className="relative bottom-[-550px] right-[-700px] min-w-[800px] h-[800px] object-cover"
        />
      </div>
    </div>
  );
};

export default BgGradientBall;
