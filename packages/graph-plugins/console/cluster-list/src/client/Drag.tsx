import React from 'react';
import { uid } from '@formily/shared';
import { observer, useField, useFieldSchema } from '@formily/react';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { SchemaComponent, SchemaComponentProvider, createDesignable, useDesignable } from '@nocobase/client';

const useDragEnd = () => {
  const { refresh } = useDesignable();

  return ({ active, over }: DragEndEvent) => {
    const activeSchema = active?.data?.current?.schema;
    const overSchema = over?.data?.current?.schema;

    if (!activeSchema || !overSchema) {
      return;
    }

    const dn = createDesignable({
      current: overSchema,
    });

    dn.on('insertAdjacent', refresh);
    dn.insertBeforeBeginOrAfterEnd(activeSchema);
  };
};

export const Page = observer((props) => {
  return <DndContext onDragEnd={useDragEnd()}>{props.children}</DndContext>;
});

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: props.data,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: props.data,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export const Block = observer((props) => {
  const field = useField();
  const fieldSchema = useFieldSchema();
  return (
    <Droppable id={field.address.toString()} data={{ schema: fieldSchema }}>
      <div style={{ marginBottom: 20, padding: '20px', background: '#f1f1f1' }}>
        Block {fieldSchema.name}{' '}
        <Draggable id={field.address.toString()} data={{ schema: fieldSchema }}>
          Drag
        </Draggable>
      </div>
    </Droppable>
  );
});

export const dragSchema = {
  type: 'void',
          name: 'page',
          'x-component': 'Page',
          properties: {
            block1: {
              'x-component': 'Block',
            },
            block2: {
              'x-component': 'Block',
            },
            block3: {
              'x-component': 'Block',
            },
          },
}

// export default function App() {
//   return (
//     <SchemaComponentProvider components={{ Page, Block }}>
//       <SchemaComponent
//         schema={{
//           type: 'void',
//           name: 'page',
//           'x-component': 'Page',
//           properties: {
//             block1: {
//               'x-component': 'Block',
//             },
//             block2: {
//               'x-component': 'Block',
//             },
//             block3: {
//               'x-component': 'Block',
//             },
//           },
//         }}
//       />
//     </SchemaComponentProvider>
//   );
// }
