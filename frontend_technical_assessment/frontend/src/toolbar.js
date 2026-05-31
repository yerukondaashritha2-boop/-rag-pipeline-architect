import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => (
  <div style={{ padding: '10px' }}>
    <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      <DraggableNode type='customInput' label='Input' />
      <DraggableNode type='llm' label='LLM' />
      <DraggableNode type='customOutput' label='Output' />
      <DraggableNode type='text' label='Text' />
      <DraggableNode type='condition' label='Condition' />
      <DraggableNode type='database' label='Database' />
      <DraggableNode type='webhook' label='Webhook' />
      <DraggableNode type='transform' label='Transform' />
      <DraggableNode type='delay' label='Delay' />
    </div>
  </div>
);