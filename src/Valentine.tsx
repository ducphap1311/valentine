import { useState, useRef } from "react";

export default function ValentineCard() {
  const buttonAreaRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [noPos, setNoPos] = useState({ x: 130, y: 5 });
  const [accepted, setAccepted] = useState(false);

  const moveNoButton = (e: React.MouseEvent) => {
    const area = buttonAreaRef.current;
    const noButton = noButtonRef.current;
    if (!area || !noButton) return;

    const areaRect = area.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();

    // Vị trí chuột so với container
    const mouseX = e.clientX - areaRect.left;
    const mouseY = e.clientY - areaRect.top;

    // Vị trí hiện tại của button (tâm button)
    const buttonCenterX = noPos.x + buttonRect.width / 2;
    const buttonCenterY = noPos.y + buttonRect.height / 2;

    const distX = mouseX - buttonCenterX;
    const distY = mouseY - buttonCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    const triggerDistance = 200;
    if (distance < triggerDistance) {
      const angle = Math.atan2(distY, distX);
      const escapeAngle = angle + Math.PI; // Đi ngược hướng

      const randomAngle = (Math.random() - 0.5) * 0.5;
      const finalAngle = escapeAngle + randomAngle;

      const moveDistance = 150 + Math.random() * 100;

      let newX =
        buttonCenterX +
        Math.cos(finalAngle) * moveDistance -
        buttonRect.width / 2;
      let newY =
        buttonCenterY +
        Math.sin(finalAngle) * moveDistance -
        buttonRect.height / 2;

      const padding = 10;
      const maxX = areaRect.width - buttonRect.width - padding;
      const maxY = areaRect.height - buttonRect.height - padding;

      newX = Math.max(padding, Math.min(newX, maxX));
      newY = Math.max(padding, Math.min(newY, maxY));

      setNoPos({ x: newX, y: newY });
    }
  };

  return (
    <div className="bg-[#fff5f9] h-[100vh] w-[100vw] flex items-center justify-center px-4 overflow-hidden">
      <div className="bg-white h-[500px]  rounded-3xl shadow-xl p-10 max-w-xl w-full text-center">
        {!accepted ? (
          <>
            <div className="flex justify-center gap-3 text-2xl mb-4">
              <span>💖</span>
              <span>💘</span>
              <span>💝</span>
            </div>

            <h1 className="text-4xl font-bold text-pink-500 mb-3">
              Happy Valentine's Day
            </h1>

            <h2 className="text-2xl font-semibold text-rose-500 mb-8">
              Will you be my Valentine?
            </h2>

            <div
              ref={buttonAreaRef}
              onMouseMove={moveNoButton}
              className="relative h-72 w-full"
            >
              {/* YES */}
              <div className="flex justify-center">
                <button
                  onClick={() => setAccepted(true)}
                  className="px-8 py-3 rounded-full cursor-pointer font-medium ml-[100px] bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md hover:scale-110 transition duration-200 relative z-10"
                >
                  💘 Yes
                </button>
              </div>

              {/* NO - giảm transition time để nhanh hơn */}
              <button
                ref={noButtonRef}
                onMouseEnter={moveNoButton}
                style={{
                  position: "absolute",
                  left: `${noPos.x}px`,
                  top: `${noPos.y}px`,
                  transition: "all 0.15s cubic-bezier(0.4, 0, 1, 1)",
                }}
                className="px-6 py-2 rounded-full border border-pink-400 text-pink-500 font-medium bg-white select-none"
              >
                😢 No
              </button>
            </div>
          </>
        ) : (
          <div className="py-10">
            <div className="text-6xl mb-6 animate-bounce">🥰💖💘💝</div>
            <h2 className="text-2xl font-bold text-pink-500 mb-4">
              Ỏoooo, anh yêu bé nhiềuuuuu 💖
            </h2>
            <div className="h-[250px] rounded-xl overflow-hidden shadow-lg flex justify-center">
              <img
                src="image.jpg"
                alt="Valentine"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
