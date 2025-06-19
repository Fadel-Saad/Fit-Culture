import Image from "next/image";
import loader from "@/assets/loader.gif";

function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <Image src={loader} alt="Loading..." height={150} width={150} />
    </div>
  );
}

export default LoadingPage;
