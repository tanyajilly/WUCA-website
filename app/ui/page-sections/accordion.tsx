'use client';
import { useState } from 'react';
import { AccordionData } from "@/app/lib/definitions";

type AccordionProps = {
    items: AccordionData[]
}
export default function Accordion({ items }: AccordionProps) {
    return (
      <div className="mb-4">
        {items.map((item) => (
          <AccordionItem title={item.attributes.question} key={item.id}>
            {item.attributes.answer}
          </AccordionItem>
        ))}
      </div>
    );
  };

  function AccordionItem({
    title,
    children
}: {
    title: string,
    children: string
}) {
    const [ isOpen, setIsOpen ] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="accordion-item">
          <button className="bg-neutral-200 text-neutral-700 cursor-pointer p-4 pr-[30px] -mb-px w-full border border-black hover:bg-neutral-300 text-left relative" onClick={toggleOpen}>
            {title}
            <span className="absolute right-[10px]">{isOpen ? '-' : '+'}</span>
          </button>
          {isOpen && <div className="p-4 " dangerouslySetInnerHTML={{ __html: children }}></div>}
        </div>
      );
  }