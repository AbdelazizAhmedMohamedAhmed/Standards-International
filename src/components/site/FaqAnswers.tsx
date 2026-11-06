import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/site-content";

export function FaqAnswers() {
  return (
    <Accordion type="single" collapsible className="min-w-0 border-t border-border">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-border">
          <AccordionTrigger className="gap-4 py-6 text-base font-semibold text-navy hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 motion-reduce:[&>svg]:transition-none">
            <span className="flex items-start gap-4"><span aria-hidden="true" className="pt-0.5 text-xs font-normal text-muted-foreground">{String(index + 1).padStart(2, "0")}</span><span>{faq.question}</span></span>
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 pl-8 text-base leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}