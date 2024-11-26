import LoadQuizSet from "../components/LoadQuizSet";
import Marquee from "../components/misc/Marquee";
import logo from "../assets/logo.webp";

interface OpenQuizSetViewProps {
  setReviewState: (state: "preview") => void;
}

export default function OpenQuizSetView({
  setReviewState,
}: OpenQuizSetViewProps) {
  return (
    <>
      <div className="w-screen h-screen flex flex-row justify-center">
        <div className="flex flex-col justify-center">
          <div className="mx-auto relative mb-6 select-none">
            <Marquee
              text="Remon"
              className="top-[20px] logo-font text-yellow-300"
            />
            <Marquee
              text="Remon"
              reversed
              className="top-[70px] logo-font text-lime-600"
            />
            <Marquee
              text="Remon"
              className="top-[120px] logo-font text-yellow-300"
            />
            <Marquee
              text="Remon"
              reversed
              className="top-[170px] logo-font text-lime-600"
            />
            <img src={logo} className="relative z-10 h-48" alt="Remon logo" />
          </div>
          <p className="regular-text-xl text-center w-full">
            打开题库，开始你的学习之旅
          </p>
          <div className="mt-6 mx-auto w-64">
            <LoadQuizSet setReviewState={setReviewState} />
          </div>
        </div>
      </div>
    </>
  );
}
