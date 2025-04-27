// import { DragEndEvent } from "@dnd-kit/core";

// export const handleDragEnd =
//   ((event: DragEndEvent) => {
//     const { active, over } = event;
//     if (over && active.id !== over.id) {
//       setOrderedColumns((items) => {
//         const oldIndex = items.findIndex((col) => col.id === active.id);
//         const newIndex = items.findIndex((col) => col.id === over.id);
//         if (oldIndex === -1 || newIndex === -1) return items;
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   },
//  );
