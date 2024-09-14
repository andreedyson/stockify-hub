import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqList } from "@/constants";

function FAQ() {
  return (
    <section id="faq" className="section-margin">
      <div className="space-y-8">
        {/* FAQ Header */}
        <div className="flex flex-col items-center justify-center space-y-2 text-center md:space-y-3">
          <h3 className="landing-section-title">
            Questions? We got you covered!
          </h3>
          <p className="landing-section-description max-w-[650px]">
            Explore the answers to common questions and get the most out of our
            inventory management app.
          </p>
        </div>

        {/* FAQ Questions */}
        <div className="grid gap-x-12 gap-y-4 md:grid-cols-2 md:gap-y-8">
          {faqList.map((faq) => (
            <Accordion type="single" collapsible key={faq.id}>
              <AccordionItem value={faq.id}>
                <AccordionTrigger className="text-start">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
