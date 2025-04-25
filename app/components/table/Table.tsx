import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  SortableContainer,
  SortableItem,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useSensors } from "@dnd-kit/core";

export const Table = () => {
  // DND logic
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      //   onDragEnd={handleDragEnd}
    ></DndContext>
  );
};
