import { manrope, quicksand } from "@/app/utils/fonts";
import { FC } from "react";

export const IntroInfo: FC = () => {
  return (
    <div
      className={`${manrope.className} p-8 max-w-sm flex-col gap-4 flex text-center`}
    >
      <h1 className={`${quicksand.className} font-bold text-3xl`}>
        Welcome to Doggo&apos;s Delight!
      </h1>
      <h2 className="font-semibold" key="Intro">
        To match with some doggos, select a breed on the left!
      </h2>
      <p>
        After selecting your breeds and other filters, you&apos;ll be able to
        favorite any doggos that catch your eye. When you&apos;re satisfied with
        your selections, click the &quot;Get Match&quot; button underneath the
        filter options to find your perfect pet!
      </p>
    </div>
  );
};
