import React, { useState } from 'react';
import '../Styles/Accordion.css';

function AccordionItem({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

  return (

    <div className="accordion-item">
      <button className="accordion-title" onClick={toggleAccordion}>
        {title} <span className="accordion-icon">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  //   <div className="accordion-item">
  //   <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
  //     {title}
  //     <span className="arrow">{isOpen ? '▲' : '▼'}</span>
  //   </button>
  //   {isOpen && <div className="accordion-body">{children}</div>}
  // </div>
);
}


export default AccordionItem
