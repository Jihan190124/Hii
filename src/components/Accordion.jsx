import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function Accordion({ items }) {
  return (
    <div className="vel-accordion">
      {items.map((item, i) => (
        <AccordionItem key={item.title} {...item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}

function AccordionItem({ title, children, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`vel-accordion__item ${open ? 'is-open' : ''}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          <span>{title}</span>
          <Plus size={18} aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            className="vel-accordion__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="vel-accordion__inner">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
