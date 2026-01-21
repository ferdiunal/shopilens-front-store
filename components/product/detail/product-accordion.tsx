/**
 * ProductAccordion Component
 * Description, Shipping & Returns, Materials & Care
 */

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface AccordionSection {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface ProductAccordionProps {
    sections: AccordionSection[];
    defaultOpen?: string;
    className?: string;
}

export function ProductAccordion({
    sections,
    defaultOpen,
    className,
}: ProductAccordionProps) {
    return (
        <Accordion
            type="single"
            collapsible
            defaultValue={defaultOpen}
            className={cn("w-full", className)}
        >
            {sections.map((section) => (
                <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger>{section.title}</AccordionTrigger>
                    <AccordionContent>
                        <div className="text-muted-foreground leading-relaxed">
                            {section.content}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
