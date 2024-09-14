import { featuresList } from "@/constants";

function Features() {
  return (
    <section id="features" className="section-margin">
      <div className="space-y-8">
        {/* Features Header */}
        <div className="flex flex-col items-center justify-center space-y-2 text-center md:space-y-3">
          <h3 className="landing-section-title">Features</h3>
          <p className="landing-section-description max-w-[650px]">
            Discover the powerful tools and functionalities designed to
            streamline your inventory management and boost your efficiency.
          </p>
        </div>

        {/* Features List */}
        <div className="w-full">
          <div className="grid gap-x-3 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
            {featuresList.map((feature) => (
              <div
                key={feature.title}
                className="space-y-3 rounded-2xl bg-[#2e2e2e] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-accent-green flex size-12 items-center justify-center rounded-[9px] md:size-16">
                    {feature.icon}
                  </div>
                  <p className="text-base font-semibold md:text-lg lg:text-xl">
                    {feature.title}
                  </p>
                </div>
                <div className="text-sm text-desc md:text-base lg:text-lg">
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
