'use client';
import { useState } from 'react';
import { AccordionData } from "@/app/lib/definitions";

type AccordionProps = {
  items: AccordionData[]
}
export default function Accordion({ items }: AccordionProps) {
  return (
    <div className="mb-6">
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
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="accordion-item">
      <button className="text-neutral-700 cursor-pointer p-4 pr-[30px] -mb-px w-full border border-gray-200 hover:bg-neutral-100 text-left relative" onClick={toggleOpen}>
        {title}
        <span className="absolute right-[10px]">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <div className="p-4 border-x border-gray-200" dangerouslySetInnerHTML={{ __html: children }}></div>}
    </div>
  );
}