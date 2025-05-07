import React from 'react'
import AccordionItem from './AccordionItem'; // importa el componente que creaste
import '../Styles/Accordion.css';

function AccordionSection({ sections }) {
  return (

    <div className="accordion">
    {sections.map((section, index) => (
      <AccordionItem key={index} title={section.title}>
        {section.content}
      </AccordionItem>
    ))}
  </div>

    // <div className="accordion">
    //   {sections.map((section, index) => (
    //     <div key={index} className="accordion-item">
    //       <button className="accordion-title">{section.title}</button>
    //       <div className="accordion-content">{section.content}</div>
    //     </div>
    //   ))}
    // </div>
    // <div className="accordion-container">
    //   <AccordionItem title="Cliente">
    //     <p>Aquí irá la información del cliente consultado.</p>
    //   </AccordionItem>
    //   <AccordionItem title="Despacho">
    //     <p>Detalles del despacho aparecerán aquí.</p>
    //   </AccordionItem>
    //   <AccordionItem title="Productos">
    //     <p>Listado de productos relacionados con la factura.</p>
    //   </AccordionItem>
    //   <AccordionItem title="Listados">
    //     <p>Información agrupada o listada con base en los filtros.</p>
    //   </AccordionItem>
    // </div>
  )
}

export default AccordionSection

