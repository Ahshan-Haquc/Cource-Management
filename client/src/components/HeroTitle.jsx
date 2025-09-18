import { ReactTyped } from "react-typed";

export default function HeroTitle() {
  return (
    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg">
      Stack up your skills like a{" "} <br />
      <span className="text-[#76ABAE]">
        <ReactTyped
          strings={["developer", "programmer", "engineer", "creator"]}
          typeSpeed={80}
          backSpeed={50}
          loop
        />
      </span>
      .
    </h1>
  );
}
