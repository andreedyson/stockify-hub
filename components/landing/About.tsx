import { aboutWalkthrough } from "@/constants";
import Image from "next/image";

function About() {
  return (
    <section id="about" className="section-margin">
      <div className="grid place-items-center gap-6 lg:grid-cols-2">
        {/* About Image */}
        <div className="order-2 lg:order-1">
          <Image
            src={"/assets/about-image.svg"}
            width={500}
            height={500}
            alt="About Image"
            className="md:size-500px] lg:size-[600px]"
          />
        </div>

        {/* About Description */}
        <div className="order-1 flex flex-col gap-6 max-lg:items-center max-lg:text-center lg:order-2">
          <div className="space-y-2 md:space-y-3">
            <h3 className="text-2xl font-bold md:text-4xl lg:text-5xl">
              About
            </h3>
            <p className="text-center text-sm font-medium text-desc max-lg:max-w-[600px] md:text-base lg:text-justify lg:text-lg">
              StockifyHub is an inventory management web app to streamlines your
              stock tracking process, ensuring you have complete control over
              your inventory with ease and efficiency.
            </p>
          </div>

          {/* About Walkthrough */}
          <div>
            <div className="flex flex-col gap-4 md:gap-8">
              {aboutWalkthrough.map((about) => (
                <div
                  key={about.title}
                  className="flex flex-col items-center gap-3 lg:flex-row"
                >
                  <div className="bg-accent-orange flex size-14 items-center justify-center rounded-lg lg:size-20">
                    {about.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold md:text-2xl">{about.title}</h4>
                    <p className="max-w-[400px] text-sm text-desc md:text-base lg:text-lg/none">
                      {about.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
