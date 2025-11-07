import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid with default configuration
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose', // This is fine for static diagrams
});

interface MermaidDiagramProps {
  diagram: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ diagram }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current) {
        // Clear the container first
        containerRef.current.innerHTML = '';
        
        try {
          // Generate a unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          
          // Get the SVG code for the diagram
          const { svg } = await mermaid.render(id, diagram);
          
          // Insert the SVG
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Failed to render mermaid diagram:', error);
          containerRef.current.innerHTML = 'Failed to render diagram';
        }
      }
    };

    renderDiagram();
  }, [diagram]);

  return <div ref={containerRef} />;
};